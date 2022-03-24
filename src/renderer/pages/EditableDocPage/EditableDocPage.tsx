import { useContext, useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router';
import {
  Affix,
  Button,
  Checkbox,
  Col,
  Divider,
  Drawer,
  Dropdown,
  Form,
  Input,
  Layout,
  Menu,
  Modal,
  PageHeader,
  Row,
  Select,
} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LeftOutlined,
  DownOutlined,
  UserOutlined,
  DownloadOutlined,
  EyeOutlined,
  SendOutlined,
  MessageFilled,
  UserAddOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { MainContext } from 'renderer/contexts/MainContext';
import Chat from 'renderer/components/Chat/Chat';
import MainLayout from 'renderer/components/MainLayout/MainLayout';
import Editor, {
  createEditorStateWithText,
  composeDecorators,
} from '@draft-js-plugins/editor';
import styled from 'styled-components';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';
import createSideToolbarPlugin from '@draft-js-plugins/side-toolbar';
import createImagePlugin from '@draft-js-plugins/image';

import createAlignmentPlugin from '@draft-js-plugins/alignment';
import createFocusPlugin from '@draft-js-plugins/focus';
import createResizeablePlugin from '@draft-js-plugins/resizeable';
import createBlockDndPlugin from '@draft-js-plugins/drag-n-drop';
import createDragNDropUploadPlugin from '@draft-js-plugins/drag-n-drop-upload';
import StateToPdfMake from 'draft-js-export-pdfmake';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';
import QuillEditor from './tools/QuillEditor/QuillEditor';
const { Option } = Select
// pdfMake.vfs = pdfFonts.pdfMake.vfs;
// import robotoItalic from '../../../../assets/fonts/Roboto/Roboto-Italic.ttf';

// const fonts = {
//   Roboto: {
//     normal: '../../../../assets/fonts/Roboto/Roboto-Italic.ttf',
//     bold: '../../../../assets/fonts/Roboto/Roboto-Italic.ttf',
//     italics: '../../../../assets/fonts/Roboto/Roboto-Italic.ttf',
//     bolditalics: '../../../../assets/fonts/Roboto/Roboto-Italic.ttf',
//   },
// };
// pdfFonts.pdfMake.vfs = fonts;
// pdfMake.vfs = fonts;
// pdfMake.vfs = {
//   'Roboto-Italic.ttf': fonts.Roboto.italics,
//   'Roboto-Medium.ttf': fonts.Roboto.italics,
//   'Roboto-MediumItalic.ttf': fonts.Roboto.italics,
//   'Roboto-Regular.ttf': fonts.Roboto.italics,
// };

const EditorContainer = styled.div`
  /* background: red !important; */
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

const { Header, Content } = Layout;

let inPage = false;

const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;

const sideToolbarPlugin = createSideToolbarPlugin();
const { SideToolbar } = sideToolbarPlugin;

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();
const { AlignmentTool } = alignmentPlugin;

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator,
  blockDndPlugin.decorator
);

const imagePlugin = createImagePlugin({ decorator });

const dragNDropFileUploadPlugin = createDragNDropUploadPlugin({
  handleUpload: null,
  addImage: imagePlugin.addImage,
});

const plugins = [
  inlineToolbarPlugin,
  sideToolbarPlugin,
  dragNDropFileUploadPlugin,
  blockDndPlugin,
  focusPlugin,
  alignmentPlugin,
  resizeablePlugin,
  imagePlugin,
];

const initialState = {
  entityMap: {
    0: {
      type: 'IMAGE',
      mutability: 'IMMUTABLE',
      data: {
        src: 'https://i.gadgets360cdn.com/large/loki_tom_hiddleston_crop_1622797154582.jpg',
      },
    },
  },
  blocks: [
    {
      key: '9gm3s',
      text: 'You can have images in your text field. This is a very rudimentary example, but you can enhance the image plugin with resizing, focus or alignment plugins.',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: 'ov7r',
      text: ' ',
      type: 'atomic',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [
        {
          offset: 0,
          length: 1,
          key: 0,
        },
      ],
      data: {},
    },
    {
      key: 'e23a8',
      text: 'See advanced examples further down …',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
};

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);
export default function EditableDocPage({ theme }) {
  const { isRouted } = useContext(MainContext);
  const { id: documentId } = useParams();
  useEffect(() => {
    inPage = isRouted;
    // console.log(inPage);
  }, [isRouted]);
  const history = useHistory();

  const [visible, setVisible] = useState(false);

  const [collapse, setCollapse] = useState({
    collapsed: false,
  });
  const [editor, setEditor] = useState({
    editorState: EditorState.createWithContent(convertFromRaw(initialState)),
  });

  const [detailGroup, setDatailGroup] = useState(false);

  const [hashes, setHash] = useState({
    tags: ['Tag 1', 'Tag 2', 'Tag 3'],
    inputVisible: false,
    inputValue: '',
  });

  const toggle = () => {
    setCollapse({
      collapsed: !collapse.collapsed,
    });
  };

  const onChangeText = (editorState: any) => {
    // const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
    setEditor({
      editorState,
    });
    // const editorState = EditorState.createWithContent(contentState);
    // const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
    const rows = convertToRaw(editor.editorState.getCurrentContent());
    const { blocks } = rows;
    console.log(blocks);
  };

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const handleGeneratePDF = () => {
    const rawContent = convertToRaw(editor.editorState.getCurrentContent());
    const stateToPdfMake = new StateToPdfMake(rawContent);
    console.log(stateToPdfMake.generate());

    pdfMake.createPdf(stateToPdfMake.generate()).download();
  };

  const handleMenuClick = (e: any) => {
    // message.info('Click on menu item.');
    console.log('click', e);
  };

  const handleExportAsMenuClick = (e: any) => {
    // message.info('Click on menu item.');
    console.log('click', e);
    if (e.key === 'pdf') {
      handleGeneratePDF();
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const handleChangeSelect = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      <EditorContainer>
        <Content
          className="site-layout-background"
          style={{
            margin: '0px',
            height: '100%',
            background: !isRouted ? 'inherit' : 'transparent',
            marginTop: '48px',
          }}
        >
          <Button
            type="link"
            block
            className="addContributorBtn"
            onClick={showModal}
          >
            <UserAddOutlined />
          </Button>

          <QuillEditor id={documentId} />

          <Modal
            title="Basic Modal"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Form
              name="add-contributor"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Form.Item
                name="username"
                label="Email do utilizador"
                rules={[
                  { required: true, message: 'Please input your Username!' },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="role"
                label="Regra"
                rules={[
                  { required: true, message: 'Please input your Password!' },
                ]}
              >
                <Select
                  defaultValue="WRITER"
                  style={{ width: 120 }}
                  onChange={handleChangeSelect}
                >
                  <Option value="WRITER">Editor</Option>
                  <Option value="REVISER">Revisor</Option>
                  <Option value="READER">Leitor</Option>

                </Select>
              </Form.Item>


            </Form>
          </Modal>

          <Affix style={{ position: 'fixed', top: '90%', right: '3%' }}>
            <Button
              style={{ color: 'var(--purple-1)', fontSize: '1.7rem' }}
              size="middle"
              shape="circle"
              type="link"
              onClick={showDrawer}
            >
              <MessageFilled />
            </Button>
          </Affix>

          <Drawer
            title="Basic Drawer"
            placement="right"
            onClose={onClose}
            visible={visible}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Drawer>
        </Content>
      </EditorContainer>
    </>
  );
}
