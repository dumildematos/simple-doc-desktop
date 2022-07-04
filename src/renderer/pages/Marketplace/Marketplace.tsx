import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Row, Col, Input, Tabs, Card, Empty, Modal, Button } from 'antd';
import {
  Key,
  ReactChild,
  ReactFragment,
  ReactPortal,
  Key,
  useState,
} from 'react';
import { onListCategory } from 'renderer/services/CategoryService';
import {
  onCreateTemplate,
  onGetMarketplaceTemplates,
  onGetTemplates,
} from 'renderer/services/TemplateService';
import { MessageShow } from 'renderer/utils/messages/Messages';
import styled from 'styled-components';
import imgBanner from './marketplace1.jpg';
const { Search } = Input;

const MarketPlaceContainer = styled.div`
  /* background: red !important; */
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow-y: scroll;
  main.ant-layout-content.site-layout-background {
    padding: 0 !important;
  }
  .banner {
    background-image: url(${imgBanner});
    background-size: cover;
    background-attachment: fixed;
    height: 350px;
    display: flex;
    justify-content: center;
    align-items: center;
    span.ant-input-group-wrapper.ant-input-search {
      width: 300px;
      background: transparent;
    }
  }
  .ant-row {
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
            svg {
              width: 100%;
            }
          }
        }
      }
    }
  }
`;
const { TabPane } = Tabs;
const { Meta } = Card;
const { confirm } = Modal;

export default function Marketplace(props: any) {
  const [isModalBuyTemplateVisible, setIsModalBuyTemplateVisible] =
    useState(false);
  const [currentTab, setCurrentTab] = useState(1);
  const [selectedTemplate, setTemplate] = useState({});
  const [filterRequeListParam, setFilterRequeListParam] = useState({
    page: 1,
    size: 99999,
    categoryId: 0,
    name: '',
  });

  const onSearch = (value: any) => {
    setFilterRequeListParam({
      page: 1,
      size: 99999,
      categoryId: currentTab === 1 ? 0 : currentTab,
      name: value,
    });
    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      getTemplateList();
    }, 2000);
  };

  const onSuccessCategoryList = () => {};
  const onErrorategoryList = () => {};

  const { data: lstCategory, refetch: getCategoryList } = onListCategory(
    onSuccessCategoryList,
    onErrorategoryList,
    true
  );

  const onCreateSuccess = (data: any) => {
    MessageShow('success', 'Action in progress');
    setTimeout(() => {
      setIsModalBuyTemplateVisible(false);
    }, 2000);
    // console.log(data);
  };

  const onCreateError = (error: any) => {
    console.log(error);
  };

  const { mutate: createTemplate } = onCreateTemplate(
    onCreateSuccess,
    onCreateError
  );

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const { data: templateList, refetch: getTemplateList } =
    onGetMarketplaceTemplates(
      onSuccessCategoryList,
      onErrorategoryList,
      filterRequeListParam
    );

  const changeTab = (key: any) => {
    console.log(key);

    setCurrentTab(Number(key));
    setFilterRequeListParam({
      page: 1,
      size: 99999,
      categoryId: Number(key) === 1 ? 0 : Number(key),
      name: '',
    });
    setTimeout(() => {
      getTemplateList();
    }, 2000);
  };

  const ontypeSearch = (e: any) => {
    console.log(e.target.value);
    // setCurrentTab(Number(key));
    setFilterRequeListParam({
      page: 1,
      size: 99999,
      categoryId: currentTab === 1 ? 0 : currentTab,
      name: e.target.value,
    });
    setTimeout(() => {
      getTemplateList();
    }, 2000);
  };

  const handleOk = () => {
    setIsModalBuyTemplateVisible(false);
  };

  const handleCancel = () => {
    setIsModalBuyTemplateVisible(false);
  };

  return (
    <>
      <MarketPlaceContainer theme={props.theme}>
        <div className="banner">
          <Search
            placeholder="input search text"
            allowClear
            onChange={ontypeSearch}
            onSearch={onSearch}
            style={{ width: 200 }}
          />
        </div>
        <Row>
          <Col span={24} style={{ height: '100%', overflowY: 'auto' }}>
            <Tabs tabPosition="left" onChange={changeTab}>
              <TabPane tab={props.t('comum.all')} key="1">
                <Row>
                  {templateList?.data?.content.map(
                    (template: { id: Key | null | undefined }) => (
                      <Col
                        key={template.id}
                        onClick={() => {
                          setTemplate(template);
                          setIsModalBuyTemplateVisible(true);
                        }}
                      >
                        <Card
                          hoverable
                          style={{ width: 240 }}
                          cover={
                            <img alt={template.name} src={template.cover} />
                          }
                        >
                          <Meta
                            title={`${template.name}`}
                            description={`${template?.category[0]?.name} - ${
                              template.price === '0.00'
                                ? 'Free'
                                : `${template.price} $`
                            }`}
                          />
                        </Card>
                      </Col>
                    )
                  )}
                  {templateList?.data?.numberOfElements === 0 && (
                    <Col span={24}>
                      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    </Col>
                  )}
                </Row>
              </TabPane>
              {lstCategory?.data.content.map(
                (tab: {
                  name:
                    | boolean
                    | ReactChild
                    | ReactFragment
                    | ReactPortal
                    | null
                    | undefined;
                  id: Key | null | undefined;
                }) => (
                  <TabPane tab={tab.name} key={tab.id}>
                    <Row>
                      {templateList?.data?.content.map(
                        (template: { id: Key | null | undefined }) => (
                          <Col
                            key={template.id}
                            onClick={() => {
                              setTemplate(template);
                              setIsModalBuyTemplateVisible(true);
                            }}
                          >
                            <Card
                              hoverable
                              style={{ width: 240 }}
                              cover={
                                <img alt={template.name} src={template.cover} />
                              }
                            >
                              <Meta
                                title={`${template.name}`}
                                description={`${template.category[0].name} - ${
                                  template.price === '0.00'
                                    ? props.t('comum.free')
                                    : `${template.price} $`
                                }`}
                              />
                            </Card>
                          </Col>
                        )
                      )}
                      {templateList?.data?.numberOfElements === 0 && (
                        <Col span={24}>
                          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        </Col>
                      )}
                    </Row>
                  </TabPane>
                )
              )}
            </Tabs>
          </Col>
        </Row>
        <Modal
          title=""
          visible={isModalBuyTemplateVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={false}
        >
          <Row justify="space-between" align="middle">
            <Col span={8}>
              <h2>{selectedTemplate?.name}</h2>
              {/* <span>{selectedTemplate?.category ? selectedTemplate?.category.[0].name  : ''} </span> */}
            </Col>
            <Col span={4}>
              <p>
                {selectedTemplate.price === '0.00'
                  ? props.t('comum.free')
                  : `${selectedTemplate.price} $`}
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>{selectedTemplate.description}</p>
            </Col>
          </Row>
          <Row justify="end">
            <Col>
              <Button
                type="primary"
                style={{ float: 'right' }}
                onClick={() => {
                  if (selectedTemplate.price === '0.00') {
                    createTemplate({
                      name: selectedTemplate.name,
                      content: selectedTemplate.content,
                      price: selectedTemplate.price,
                      description: selectedTemplate.description,
                      cover: selectedTemplate.cover,
                      categoryId: null,
                    });
                  }else {
                    confirm({
                      title: 'Do you Want to delete these items?',
                      icon: <ExclamationCircleOutlined />,
                      content: 'Some descriptions',
                      onOk() {
                        // console.log('OK');
                      },
                      onCancel() {
                        // console.log('Cancel');
                      },
                    });
                  }
                }}
              >
                Get Template
              </Button>
            </Col>
          </Row>
        </Modal>
      </MarketPlaceContainer>
    </>
  );
}
