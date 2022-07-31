import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useState, useCallback, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { MainContext } from 'renderer/contexts/MainContext';


const Editor = styled.div`
  position: relative;
  height: 100%;
  overflow-y: scroll;
  .container {
    position: relative;
    height: 100%;
    backgrounf: yellow;
  }
  .container .ql-editor {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    backgrounf: red;
  }

  .container .ql-container.ql-snow {
    border: none;
    display: flex;
    justify-content: center;
  }
`;

// eslint-disable-next-line import/prefer-default-export
export const QuillVisualizer = ({quill}) => {
// console.log(JSON.parse(quill))
  useEffect(() => {
    if (quill == null) return;
  }, [quill]);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapper.innerHTML = '';
    const editor = document.createElement('div');
    wrapper.append(editor);

    const q = new Quill(editor, {
      theme: 'snow',
      modules: {
        toolbar: false,
        cursors: {
          transformOnTextChange: true,
        },
        history: {
          userOnly: true,
        },
      },
    });
    q.setContents(JSON.parse(quill));
    q.disable(true);
    q.on('editor-change', function (eventName, ...args) {
      if (eventName === 'text-change') {
        // console.log(currentTemplate);
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
