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
  ['save'],
  ['print'],
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
  }
  .container .ql-editor {
    width: 100%;
    min-height: 11in;
    padding: 0.3in;
    margin: 1rem;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
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
