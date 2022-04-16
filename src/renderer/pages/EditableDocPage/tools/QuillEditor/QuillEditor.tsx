import { useEffect, useCallback, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import styled from 'styled-components';
import { io } from 'socket.io-client';
import { MainContext } from 'renderer/contexts/MainContext';
import QuillCursors from 'quill-cursors';

Quill.register('modules/cursors', QuillCursors);

const Editor = styled.div`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  .container .ql-editor {
    width: 8.5in;
    min-height: 11in;
    padding: 1in;
    margin: 1rem;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
    background-color: #fff;
  }

  .container .ql-container.ql-snow {
    border: none;
    display: flex;
    justify-content: center;
  }

  .container .ql-toolbar.ql-snow {
    display: flex;
    justify-content: center;
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: #f3f3f3;
    // box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
  }

  @page {
    margin: 1in;
  }

  @media print {
    body {
      background-color: none;
    }

    .container .ql-editor {
      width: 6.5in;
      height: 9in;
      padding: 0;
      margin: 0;
      box-shadow: none;
      align-self: flex-start;
    }

    .container > .ql-toolbar.ql-snow {
      display: none;
    }
  }
`;

const CURSOR_LATENCY = 1000;
const TEXT_LATENCY = 500;
const random_rgba = () => {
  const o = Math.round;
  const r = Math.random;
  const s = 255;
  return `rgb(${o(r() * s)},${o(r() * s)},${o(r() * s)})`;
};

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ size: ['small', false, 'large', 'huge'] }],
  [{ font: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['bold', 'italic', 'underline'],
  [{ color: [] }, { background: [] }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ align: [] }],
  ['image', 'blockquote', 'code-block', 'link'],
  [
    'table',
    'column-left',
    'column-right',
    'row-above',
    'row-below',
    'row-remove',
    'column-remove',
  ],
  ['clean'],
];
const SAVE_INTERVAL_MS = 2000;
const user = JSON.parse(localStorage.getItem('user') || '{}');
export default function QuillEditor({ id }) {
  const { isRouted, team, documentOnWork } = useContext(MainContext);
  const documentId = id;
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const [userCursor, setUserCursor] = useState();
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  // userCursor?.createCursor(user?.id, user?.firstname, random_rgba());

  const isContributor = (arr: any[]) => {
    return arr.find((el: { username: any }) => el.username === user.username);
  };

  const currentContrinutor = isContributor(documentOnWork.contributors);

  useEffect(() => {
    const s = io('http://localhost:3001');
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null && quill == null) return;
    // console.log(quill);
    socket.once('load-document', (document) => {
      quill.setContents(document.data);
      quill.enable();

      // console.log(currentContrinutor);
      // console.log(documentOnWork);
      if (currentContrinutor) {
        if (currentContrinutor?.username !== documentOnWork.creator) {
          if (documentOnWork.type === 'PUBLIC') {
            quill.disable(false);
          } else if (currentContrinutor?.role !== 'WRITER') {
            quill.disable(true);
          }
        }
      } else {
        // console.log(documentOnWork?.creator === user?.username);
        if (documentOnWork?.creator === user?.username) {
          quill.enable();
        }
      }
    });

    socket.emit('get-document', documentId);
  }, [socket, quill, documentId]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      // console.log(quill.getModule('cursors'));
      // quill.getContents();
      socket.emit('save-document', quill.getContents());
    }, SAVE_INTERVAL_MS);

    // eslint-disable-next-line consistent-return
    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta: any) => {
      // setTimeout(() => quill.updateContents(delta), TEXT_LATENCY);
      quill.updateContents(delta);
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      const cursorsLocal = quill.getModule('cursors');
      // console.log(cursorsLocal);
      // quill.on('selection-change', selectionChangeHandler(cursorsLocal));
      // quill.on('selection-change', () => {
      //   documentOnWork.contributors.map((dc) => {
      //     const cursors = quill.getModule('cursors');
      //     console.log(cursors);
      //     console.log(dc);
      //   });
      // });
    };
    socket.on('receive-changes', handler);
    socket.on('typing-changes', (data) => {
      // console.log(data);
    });
    socket.on('cursor-activity', (data) => {
      // console.log(data.cursors);
      const cursors = quill.getModule('cursors');
      // Object.setPrototypeOf(data.cursors, cursors._cursors[user?.id])
      // cursors._cursors[data.cursors.id] = data.cursors;
      // cursors._cursors[data.cursors.id]._caretEl = cursors._cursors[user?.id]._caretEl
      // cursors._cursors[data.cursors.id]._el = cursors._cursors[user?.id]._el
      // cursors._cursors[data.cursors.id]._flagEl = cursors._cursors[user?.id]._flagEl

      cursors.createCursor(data.cursors.id, data.cursors.name, random_rgba())
      quill.on('selection-change', selectionChangeHandler(cursors));
      // cursor.createCursor(user?.id, user?.firstname, random_rgba());
    });

    // eslint-disable-next-line consistent-return
    return () => {
      socket.off('receive-changes', handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;
    const cursors = quill.getModule('cursors');
    // console.log(cursors);
    const handler = (delta: any, olDelta: any, source: string) => {
      if (source !== 'user') return;
      socket.emit('send-changes', delta);
      socket.emit('send-cursor-changes', userCursor);
      // console.log(userCursor);
    };

    quill.on('text-change', handler);

    quill.on('selection-change', selectionChangeHandler(cursors));

    // quill.on('text-change', cursorHandler);
    // console.log(quill.getModule('cursors'));

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    // if (userCursor)
    //   quill.on('selection-change', selectionChangeHandler(userCursor));
    // eslint-disable-next-line consistent-return
    return () => {
      quill.off('text-change', handler);
    };
  }, [socket, quill]);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapper.innerHTML = '';
    const editor = document.createElement('div');
    wrapper.append(editor);

    const q = new Quill(editor, {
      theme: 'snow',
      modules: {
        toolbar: TOOLBAR_OPTIONS,
        cursors: {
          transformOnTextChange: true,
        },
        history: {
          userOnly: true,
        },
      },
    });

    // const cursor = q.getModule('cursors');

    q.disable(false);
    q.setText('Loading...');
    setQuill(q);
    q.on('editor-change', function (eventName, ...args) {
      if (eventName === 'text-change') {
        // args[0] will be delta
        // console.log(eventName);
      } else if (eventName === 'selection-change') {
        // args[0] will be old range
        const cursor = q.getModule('cursors');
        cursor.createCursor(user?.id, user?.firstname, random_rgba());
        // console.log(cursor.createCursor(user?.id, user?.firstname, random_rgba()))
        setUserCursor(
          cursor.createCursor(user?.id, user?.firstname, random_rgba())
        );
        // socket?.emit('send-cursor-changes', userCursor);
      }
    });
  }, []);

  function selectionChangeHandler(cursors) {
    if (!cursors) return;
    const debouncedUpdate = debounce(updateCursor, 500);

    return function (range, oldRange, source) {
      if (source === 'user') {
        // If the user has manually updated their selection, send this change
        // immediately, because a user update is important, and should be
        // sent as soon as possible for a smooth experience.
        updateCursor(range);
      } else {
        // Otherwise, it's a text change update or similar. These changes will
        // automatically get transformed by the receiving client without latency.
        // If we try to keep sending updates, then this will undo the low-latency
        // transformation already performed, which we don't want to do. Instead,
        // add a debounce so that we only send the update once the user has stopped
        // typing, which ensures we send the most up-to-date position (which should
        // hopefully match what the receiving client already thinks is the cursor
        // position anyway).
        debouncedUpdate(range);
      }
    };

    function updateCursor(range) {
      // Use a timeout to simulate a high latency connection.
      // console.log(cursors._cursors)
      // eslint-disable-next-line no-restricted-syntax
      // eslint-disable-next-line guard-for-in
      for (const key in cursors._cursors) {
        // console.log(`${key}: ${user[key]}`);
        // console.log(key)
        if(Number(key) !== user?.id) {

          cursors.moveCursor(key, range);
        }else {
          // cursors.moveCursor(key, range);
        }
      }
      cursors.moveCursor(user?.id, range);
      // setTimeout(() =>
      // , CURSOR_LATENCY);
    }
  }

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      const later = function () {
        timeout = null;
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  return (
    <Editor>
      <div className="container" ref={wrapperRef}>
        TextEditor
      </div>
    </Editor>
  );
}
