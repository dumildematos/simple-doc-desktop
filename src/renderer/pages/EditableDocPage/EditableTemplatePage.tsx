import { SaveFilled } from '@ant-design/icons';
import { Affix, Button } from 'antd';
import { useContext, useState } from 'react';
import { MainContext } from 'renderer/contexts/MainContext';
import { onEditTemplate } from 'renderer/services/TemplateService';
import { MessageShow } from 'renderer/utils/messages/Messages';
import styled from 'styled-components';
import { TemplateEditor } from './tools/TemplateEditor/TemplateEditor';

const EditorContainer = styled.div`
  width: 100%;
  height: 100vh;
  padding: 0;
  overflow-y: scroll;
  background: ${(props: { theme: { cardBg: any } }) => props.theme.cardBg};
  margin: 0;
  .addContributorBtn {
    position: fixed;
    top: 0.7em;
    right: 5rem;
    z-index: 1;
    width: 24px;
  }
  .tools-drawer {
    .ant-drawer-body {
      padding: 0;
      display: flex;
      justify-content: center;
    }
  }

  .ant-row {
    &.main {
      height: 100%;
    }
    .ant-col {
      border-radius: 3px;
      background: ${(props: { theme: { cardBg: any } }) => props.theme.cardBg};
      &.main {
        height: 100%;
      }
      padding: 12px;
      .btn-action-pmd {
        font-size: 1rem;
        color: var(--purple-1);
      }
      h4,
      h3,
      p {
        color: ${(props: { theme: { cardTexColor: any } }) =>
          props.theme.cardTexColor} !important;
      }
      p {
        font-size: 0.8rem;
      }
      .ant-avatar-group {
      }
      &.doc-ls {
        padding: 0;
        .ant-card {
          border: 1px solid var(--purple-1);
        }
        .doc-item {
          background-color: blue;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .square {
            width: 70px;
            height: 70px !important;
            background: green;
            svg {
              width: 100%;
            }
          }
        }
      }
    }
  }
`;



// eslint-disable-next-line import/prefer-default-export
export const EditableTemplatePage = (props: any) => {
  const { currentTemplate, defineCurrentTemplate} =
  useContext(MainContext);
  const [quill, setQuill] = useState();

  const onSaveSuccess = (data: any) => {
    MessageShow('success', 'Action in progress');
  };
  const onSaveError = (data: any) => {

  };
  const { mutate: updateTemplate } = onEditTemplate(
    onSaveSuccess,
    onSaveError
  );


  return (
    <EditorContainer theme={props.theme}>
      <TemplateEditor quill={quill} setQuill={setQuill}/>
      <Affix style={{ position: 'fixed', top: '90%', right: '3%' }}>
        <Button
          style={{ color: 'var(--purple-1)', fontSize: '1.7rem' }}
          size="middle"
          shape="circle"
          type="link"
          onClick={()=> {
            console.log(quill.getContents())
            const templateData = {
              id: currentTemplate.id,
              category: currentTemplate.category,
              createdAt: currentTemplate.createdAt,
              name: currentTemplate.name,
              price: currentTemplate.price,
              content: JSON.stringify(quill.getContents()),
            }
            updateTemplate(templateData)
          }}
        >
          <SaveFilled />
        </Button>
      </Affix>
    </EditorContainer>
  );
};
