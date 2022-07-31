import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useState, useCallback, useContext, useEffect } from 'react';
import styled from 'styled-components';
import QuillCursors from 'quill-cursors';
import { MainContext } from 'renderer/contexts/MainContext';

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ size: ['small', false, 'large', 'huge'] }],
  [{ font: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
  ['bold', 'italic', 'underline'],
  [{ color: [] }, { background: [] }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ align: [] }],
  ['image', 'blockquote', 'code-block', 'link', 'formula'],
  // [
  //   'table',
  //   'column-left',
  //   'column-right',
  //   'row-above',
  //   'row-below',
  //   'row-remove',
  //   'column-remove',
  // ],
  // ['save'],
  // ['print'],
  ['clean'],
];
Quill.register('modules/cursors', QuillCursors);
const Editor = styled.div`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  .container {
    margin-top: 5.5%;
    display: flex;
    flex-flow: column;
    height: 100%;
  }
  .container .ql-editor {
    width: 100%;
    min-height: 11in;
    background-color: #fff;
  }

  .container .ql-container.ql-snow {
    border: none;
  }

  .container .ql-toolbar.ql-snow {
    position: sticky;
    top: 0;
    z-index: 1;
    border: none;
    background-color: #fff;
    padding: 5% 8% 25px;
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

// eslint-disable-next-line import/prefer-default-export
export const TemplateEditor = ({quill, setQuill}) => {
  const { currentTemplate, defineCurrentTemplate } = useContext(MainContext);

  useEffect(() => {
    if (quill == null) return;

    // console.log(quill.getModule('cursors'));
    // quill.getContents();
    console.log(quill.getContents());

    // defineCurrentTemplate({
    //   id: currentTemplate.id,
    //   category: currentTemplate.category,
    //   createdAt: currentTemplate.createdAt,
    //   name: currentTemplate.name,
    //   price: currentTemplate.price,
    //   content: JSON.stringify(quill.getContents()),
    // });

    // eslint-disable-next-line consistent-return
    // return () => {
    //   clearInterval(interval);
    // };
  }, [quill]);

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
    // console.log(JSON.parse(currentTemplate.content?.ops));
    q.setContents(JSON.parse(currentTemplate.content));
    // q.setText('teste');
    setQuill(q);
    // defineCurrentTemplate({
    //   id: currentTemplate.id,
    //   category: currentTemplate.category,
    //   createdAt: currentTemplate.createdAt,
    //   name: currentTemplate.name,
    //   price: currentTemplate.price,
    //   content: JSON.stringify(q.getContents()),
    // });
    q.on('editor-change', function (eventName, ...args) {
      if (eventName === 'text-change') {
        console.log(currentTemplate);
        // args[0] will be delta
        // console.log(eventName);
        console.log(q.getContents());
        // defineCurrentTemplate({
        //   id: currentTemplate.id,
        //   category: currentTemplate.category,
        //   createdAt: currentTemplate.createdAt,
        //   name: currentTemplate.name,
        //   price: currentTemplate.price,
        //   content: JSON.stringify(q.getContents()),
        // });
      }
    });
  }, []);

  return (
    <Editor>
      <div className="container" ref={wrapperRef}>
        TextEditor
      </div>
    </Editor>
  );
};
