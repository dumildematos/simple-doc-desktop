import React, { useContext, useState } from 'react';
import { Button, Checkbox, Col, Form, Input, Modal, Radio, Row, Select, Tabs } from 'antd';
import { AppleOutlined, LockOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { MainContext } from 'renderer/contexts/MainContext';
import { MessageShow } from 'renderer/utils/messages/Messages';
import { onChangePasswordUserService } from 'renderer/services/UserService';

const { TabPane } = Tabs;
const { Option } = Select;

const ModalContainer = styled(Modal)`
  .ant-modal {
    height: 100% !important;
  }
  .ant-modal-content {
    /*ModalSettings*/
    height: 95% !important;
    background: ${(props) => props.theme.modalBg};
    .ant-modal-header {
      background: ${(props) => props.theme.modalBg};
      border-color: ${(props) => props.theme.modalInnerBorderColor};
      .ant-modal-title {
        color: ${(props) => props.theme.modalInputColor} !important;
      }
    }
    .ant-modal-body {
      label {
        color: ${(props) => props.theme.modalInputColor} !important;
      }
      .ant-input,
      .ant-select-selector {
        background: ${(props) => props.theme.modalBgInput} !important;
        border: ${(props) => props.theme.modalInputBorder};
        color: ${(props) => props.theme.modalInputColor} !important;
      }
      .ant-tabs.ant-tabs-left.ant-tabs-small.ant-tabs-card {
      }
      .ant-tabs-content-holder {
        border-color: ${(props) =>
          props.theme.modalInnerBorderColor} !important;
      }
    }
    .ant-modal-footer {
      border-color: ${(props) => props.theme.modalInnerBorderColor};
      button.ant-btn.ant-btn-primary {
        background-color: var(--purple-1);
        border: none;
      }
    }
  }
`;

const optionsWithDisabled = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
];

export default function ModalSettings({
  t,
  settingModal,
  setSettingModal,
  setTheme,
  theme,
}) {
  const user = JSON.parse(localStorage.getItem('user') || '');
  console.log(theme);
  const { i18n } = useTranslation();
  const { defineTheme } = useContext(MainContext);
  const [settingTheme, setSettingTheme] = useState({});
  const [currentLang, setCurrentLang] = useState(String(i18n.language));
  const [formChangePassword] = Form.useForm();
  const showModal = () => {
    setSettingModal({
      loading: false,
      visible: true,
    });
  };

  const onChange = (e) => {
    setState({ size: e.target.value });
  };

  const handleOk = () => {
    setSettingModal({ loading: true });
    setTimeout(() => {
      setSettingModal({ loading: false, visible: false });
    }, 3000);
  };

  const handleCancel = () => {
    setSettingModal({ visible: false });
  };

  const changeTheme = (e: any) => {
    // console.log(e.target.value);
    setTheme(e.target.value);
    defineTheme(e.target.value);
  };

  const onChangeApplicationSettingCheck = (checkedValues: any) => {
    console.log('checked = ', checkedValues);
  };

  const handleChangeLanguage = (e: any) => {
    i18n.changeLanguage(e.value);
    setCurrentLang(e.value);
  };

  

   const sucessRequest = (data: any) => {
    console.log(data);
    if (data.status === 200 && !data.data.message) {
      MessageShow('success', 'criado com sucesso');
      formChangePassword.resetFields();

    } else {
      MessageShow('warning', data.data.message);
    }
  };

  const errorRequest = (error: any) => {
    console.log(error);
    MessageShow('warning', error.message);
  };

  const {
    mutate: onChangePassword,
    data: registredUser,
    isLoading: isLoadingRegistration,
    isError: isRegistationError,
  } = onChangePasswordUserService(sucessRequest, errorRequest);


  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = (values: any) => {
    const userToSend = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      avatar: user.avatar,
      username: user.username,
      birthday: String(
        user?.birthdate.replaceAll('-', '/').split('/').reverse().join('/')
      ),
      password: values.confirmPassword,
      country: user.country,
      phonenumber: user.phonenumber,
      role: 'ROLE_USER',
    };
    onChangePassword(userToSend);
  };

  return (
    <ModalContainer
      theme={theme}
      visible={settingModal?.visible}
      title={t('home.settings.setting')}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      style={{
        height: '100%',
        top: '20px',
      }}
      width={1000}
      bodyStyle={{ height: '100%!important' }}
    >
      <Tabs defaultActiveKey="1" tabPosition="left" type="card" size="small">
        <TabPane
          tab={
            <span>
              <AppleOutlined />
              {t('home.settings.general')}
            </span>
          }
          key="1"
        >
          <Row>
            <Col span={24}>
              <h4>{t('home.settings.theme.title')}</h4>
            </Col>
            <Col span={24}>
              <Radio.Group
                value={theme}
                onChange={changeTheme}
                buttonStyle="solid"
              >
                <Radio.Button
                  value="light"
                  className={theme === 'light' ? 'active' : ''}
                >
                  {t('home.settings.theme.light')}
                </Radio.Button>
                <Radio.Button value="dark">
                  {t('home.settings.theme.dark')}
                </Radio.Button>
              </Radio.Group>
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col span={24}>
              <h4>Aplicação</h4>
            </Col>
            <Col span={24}>
              <small>
                Para reiniciar, mantenha premida a tecla Ctrl e clique no ícone
                do Teams. Em seguida, selecione Sair e volte a abrir o Teams.
              </small>
            </Col>
            <Col span={24}>
              <Checkbox.Group
                style={{ width: '100%' }}
                onChange={onChangeApplicationSettingCheck}
              >
                <Row>
                  <Col span={24}>
                    <Checkbox value="A">
                      Iniciar aplicação automaticamente
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value="B">
                      Ao fechar, manter a aplicação em execução
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value="C">
                      Desativar a aceleração por hardware GPU (será necessário
                      reiniciar o Teams)
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value="D">
                      Ativar registos para diagnósticos de reuniões (é
                      necessário reiniciar o Teams)
                    </Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col span={24}>
              <h4>{t('language.title')}</h4>
            </Col>
            <Col span={24}>
              <small>Reinicie para aplicar definições de idioma.</small>
            </Col>
            <Col span={24}>
              <Select
                labelInValue
                defaultValue={{ value: currentLang }}
                style={{ width: 120 }}
                onChange={handleChangeLanguage}
              >
                <Option className="mdl-opt" value="en">
                  {t('language.english')}
                </Option>
                <Option className="mdl-opt" value="pt">
                {t('language.portuguese')}
                </Option>
              </Select>
            </Col>
          </Row>
        </TabPane>
        <TabPane
          tab={
            <span>
              <LockOutlined />
              {t('home.settings.security')}
            </span>
          }
          key="2"
        >
          <Row>
            <Col>
              <h2>Altera sua palavra passe</h2>
              <p>Será enviado um email, para confimar a mudança da palavra-passe.</p>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
            <Col span={12}>
              <Form
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={formChangePassword}
              >
                <Form.Item
                  label="Palavra-passe:"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Por favor introduza a sua palavra-chave!',
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  label="Confirmar Palavra-passe:"
                  name="confirmPassword"
                  dependencies={['password']}
                  rules={[
                    {
                      required: true,
                      message: 'Por favor introduza a sua palavra-chave!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            'As duas palavras-passe que introduziu não coincidem!'
                          )
                        );
                      },
                    }),
                  ]}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item>
                  <Button
                    className="btnLogin"
                    type="primary"
                    block
                    htmlType="submit"
                  >
                    Alterar senha
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </TabPane>
        {/* <TabPane tab="Card Tab 3" key="3">
          Content of card tab 3
        </TabPane> */}
      </Tabs>
    </ModalContainer>
  );
}
