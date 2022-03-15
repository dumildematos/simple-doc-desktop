import { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import {
  Affix,
  Button,
  Col,
  Divider,
  Drawer,
  Dropdown,
  Layout,
  Menu,
  PageHeader,
  Row,
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
import QuillEditor from './tools/quill/QuillEditor';
import SlateEditor from './tools/SlateEditor/Editor';

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
  background: ${(props: { theme: { cardBg: any } }) => props.theme.boxBg};
  margin: 0;
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
  const {
    isRouted,
    defineRoutedState,
    groupPage,
    editorOpened,
    visibleDocSidebar,
    defineDocSideBar,
    definedEditorIsOpened,
  } = useContext(MainContext);
  useEffect(() => {
    inPage = isRouted;
    // console.log(inPage);
  }, [inPage, isRouted, MainLayout]);
  const history = useHistory();
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

  const showDrawer = () => {
    defineDocSideBar(true);
  };
  const onCloseDrawer = () => {
    defineDocSideBar(false);
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

  const handleGeneratePDF = () => {
    const rawContent = convertToRaw(editor.editorState.getCurrentContent());
    const stateToPdfMake = new StateToPdfMake(rawContent);
    console.log(stateToPdfMake.generate());

    pdfMake.createPdf(stateToPdfMake.generate()).download();
  };

  const previewMenu = (
    <Menu onClick={() => handleMenuClick()}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        1st menu item
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        2nd menu item
      </Menu.Item>
      <Menu.Item key="3" icon={<UserOutlined />}>
        3rd menu item
      </Menu.Item>
    </Menu>
  );

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

  const exportMenu = (
    <Menu onClick={handleExportAsMenuClick}>
      <Menu.Item key="pdf" icon={<UserOutlined />}>
        PDF
      </Menu.Item>
    </Menu>
  );

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

          {/* <QuillEditor /> */}
          <SlateEditor />

          <Affix style={{ position: 'fixed', top: '90%', right: '3%' }}>
            <Button
              className="btn-action"
              size="middle"
              shape="circle"
              onClick={showDrawer}
            >
              <SendOutlined />
            </Button>
          </Affix>

          <Drawer
            title="Basic Drawer"
            placement="right"
            width={440}
            onClose={onCloseDrawer}
            visible={visibleDocSidebar}
          >
            <p
              className="site-description-item-profile-p"
              style={{ marginBottom: 24 }}
            >
              Membros
            </p>
            <p className="site-description-item-profile-p">Personal</p>
            <Row>
              <Col span={12}>
                <DescriptionItem title="Full Name" content="Lily" />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title="Account"
                  content="AntDesign@example.com"
                />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem title="City" content="HangZhou" />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Country" content="China🇨🇳" />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem title="Birthday" content="February 2,1900" />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Website" content="-" />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <DescriptionItem
                  title="Message"
                  content="Make things as simple as possible but no simpler."
                />
              </Col>
            </Row>
            <Divider />
            <p className="site-description-item-profile-p">Chat</p>
            <Row>
              <Col span={24}>
                <Chat />
              </Col>
            </Row>
          </Drawer>
        </Content>
      </EditorContainer>
    </>
  );
}
