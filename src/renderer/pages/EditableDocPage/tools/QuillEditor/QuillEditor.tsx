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
const user = JSON.parse(localStorage.getItem('user'));
export default function QuillEditor({ id }) {
  const { isRouted, team, documentOnWork } = useContext(MainContext);
  console.log(documentOnWork);
  const documentId = id;
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();

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
      if (
        currentContrinutor?.role === 'READER' &&
        user.username != currentContrinutor.username
      ) {
        quill.disable(true);
      }
    });

    socket.emit('get-document', documentId);
  }, [socket, quill, documentId]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      socket.emit('save-document', quill.getContents());
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta) => {
      quill.updateContents(delta);
      const cursors = quill.getModule('cursors');
      console.log(cursors);
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      quill.on('selection-change', selectionChangeHandler(cursors));
    };
    socket.on('receive-changes', handler);
    socket.on('typing-changes', (data) => {
      console.log(data);
    });


    return () => {
      socket.off('receive-changes', handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta, olDelta, source) => {
      if (source !== 'user') return;
      socket.emit('send-changes', delta);
    };
    quill.on('text-change', handler);
    console.log(quill.getModule('cursors'));
    // quill.on('selection-change', selectionChangeHandler(cursorsOne));
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
      },
    });
    const cursor = q.getModule('cursors');
    cursor.createCursor(user.id, user.firstname, 'blue');
    q.disable(false);

    q.setText('Loading...');
    setQuill(q);
  }, []);

  const selectionChangeHandler = (cursors: {
    moveCursor: (arg0: string, arg1: any) => void;
  }) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const debouncedUpdate = debounce(updateCursor, 500);

    return (range: any, oldRange: any, source: string) => {
      if (source === 'user') {
        // If the user has manually updated their selection, send this change
        // immediately, because a user update is important, and should be
        // sent as soon as possible for a smooth experience.
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
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

    function updateCursor(range: any) {
      // Use a timeout to simulate a high latency connection.
      setTimeout(() => cursors.moveCursor('cursor', range), CURSOR_LATENCY);
    }
  };

  const debounce = (
    func: { (range: any): void; apply?: any },
    wait: number | undefined
  ) => {
    let timeout: NodeJS.Timeout | null;
    return (...args) => {
      const context = this;
      const later = function() {
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
