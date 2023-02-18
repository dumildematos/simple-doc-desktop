import styled from '@xstyled/styled-components';
import {
  Affix,
  Alert,
  Button,
  Carousel,
  Col,
  DatePicker,
  Form,
  Image,
  Input,
  Layout,
  Row,
  Select,
  PageHeader,
} from 'antd';
import moment from 'moment';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import IntroSlider from 'renderer/components/IntroSlider/IntroSlider';
import { UserRegistrationModel } from 'renderer/models/UserModels';
import { onRegistUser } from 'renderer/services/UserService';
import { MessageShow, RequestAlert } from 'renderer/utils/messages/Messages';

import countries from '../../utils/countries.json';
import phonePrefxes from '../../utils/prefixes.json';

const { Content } = Layout;
const { Option } = Select;

const LoginBox = styled.divBox`
  margin-top: 0;
  .login-container {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;

    padding: 10px;
    .login-logo {
      header {
        h1 {
          font-size: 2rem;
          color: var(--black-1);
          font-family: var(--BerlinRegular);
          b {
            font-family: var(--BerninDemiBold);
            color: var(--purple-1);
          }
        }
      }
      p {
        color: var(--black-1);
        font-family: var(--candara);
        font-size: 1rem;
      }
    }
    .btnLogin {
      background: linear-gradient(var(--purple-3), var(--purple-1)) !important;
      border: none;
    }
    .social-login {
      display: flex;
      justify-content: center;
      align-items: center;
      div {
        button {
          margin: 5px;
          border: none;
          color: var(--white-1);
          &:nth-child(1) {
            background-color: #0a66c2;
          }
          &:nth-child(2) {
            background-color: #395693;
          }
          &:nth-child(3) {
            background-color: #dd4b39;
          }
        }
      }
    }
  }
`;

const FolderSlider = styled.divBox`
  height: 100vh;
  position: absolute;
  width: 100%;
  overflow: hidden;

  div.folder {
    position: absolute;
    right: -15%;
    &.folder-1 {
      height: 100%;
      width: 100%;
      background: #4c5fe1;
      transform: rotate(-15deg);
      border-radius: 20px;
      right: -18%;
      top: -5%;
    }
    &.folder-2 {
      height: 100%;
      width: 100%;
      background: #4c5fe1;
      transform: rotate(-30deg);
      border-radius: 20px;
      right: -25%;
      top: -4%;
      opacity: 0.9;
    }
    &.folder-3 {
      height: 100%;
      width: 100%;
      background: #4c5fe1;
      transform: rotate(-45deg);
      border-radius: 20px;
      top: 0;
      opacity: 0.9;
      right: -30%;
    }
  }
  div.slider-container {
    position: relative;
    height: 300px;
    width: 70%;
    margin: auto;
    margin-right: 0;
    margin-top: 25%;
    .ant-carousel {
      height: 100%;
      color: #fff;
      background: transparent;
      h3 {
        font-weight: bolder;
        font-family: var(--candara);
        color: white;
        font-size: 2rem;
      }
      p {
        font-size: 12px;
        font-family: var(--candara);
        width: 80%;
      }
      img {
        margin: auto;
        width: 150px;
      }
    }
  }
`;
const dateFormat = 'DD/MM/YYYY';

const FooterBox = styled.footerBox`
  font-size: 10px;
  padding: 5px;
  background: var(--white-1);
`;

const SignUp = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const [top, setTop] = useState(10);
  const [isLoginError, setIsLoginError] = useState(false);

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 100 }} defaultValue="+244">
        {phonePrefxes.countries.map((prefix) => (
          <Option value={prefix.code}>{prefix.code}</Option>
        ))}
      </Select>
    </Form.Item>
  );

  const onSuccessListCountries = (data: any) => {
    // eslint-disable-next-line no-empty
    if (data && data.status === 200) {
      console.log(data);
    } else {
      RequestAlert(
        t('comum.there_was_a_problem_with_the_request'),
        t('comum.click_okay_to_fix')
      );
    }
  };

  const onErrorListCountries = (error: any) => {
    console.log(error);
  };

  // const { data: lstCountries, refetch: refetchCountries } = onListCoutries(
  //   onSuccessListCountries,
  //   onErrorListCountries
  // );

  const sucessRegistration = (data: any) => {
    console.log(data);
    if (data.status === 200 && !data.data.message) {
      MessageShow('success', 'criado com sucesso');
      history.push('/login');
      form.resetFields();
    } else {
      MessageShow('warning', data.data.message);
    }
  };

  const errorRegistration = (error: any) => {
    console.log(error);
    MessageShow('warning', error.message);
  };

  const {
    mutate: onCreateUser,
    data: registredUser,
    isLoading: isLoadingRegistration,
    isError: isRegistationError,
  } = onRegistUser(sucessRegistration, errorRegistration);

  if (isLoadingRegistration) {
    MessageShow('loading', 'A carregar...');
  }

  if (isRegistationError) {
    console.log('error091');
    MessageShow('warning', 'Aconteceu algum erro');
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const socialLogin = (client: string) => {
    console.log(client);
  };

  const handleChangeCountrySelect = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onFinish = (values: any) => {
    const registUserForm: UserRegistrationModel = {
      username: values.username,
      password: values.password,
      phonenumber: `${values.prefix}-${values.phoneNumber}`,
      firstname: values.firstName,
      lastname: values.lastName,
      country: values.country,
      birthday: String(moment(values.birthday).format(dateFormat)),
      role: 'ROLE_USER',
    };
    console.log('Success:', registUserForm);
    console.log('values:', values);
    onCreateUser(registUserForm);
  };

  return (
    <>
      <Layout
        className="layout"
        style={{ height: '100vh', overflowY: 'hidden' }}
      >
        <Content style={{ padding: '0 0 0 50px' }}>
          <div className="site-layout-content style={{ height: '100%' }}">
            <Row style={{ height: '100%' }}>
              <Col
                span={12}
                style={{
                  height: '100vh',
                  maxHeight: '100vh',
                }}
              >
                <LoginBox>
                  <PageHeader
                    className="site-page-header"
                    onBack={() => history.push('/login')}
                    title="Voltar"
                    subTitle="Login"
                  >
                    <div className="login-container">
                      <Row>
                        <Col span={24}>
                          <div className="login-logo">
                            <header>
                              <h1>
                                Simple <b>Doc</b>
                              </h1>
                            </header>
                            <h3
                              style={{
                                marginTop: '-1rem',
                              }}
                            >
                              Criar Conta
                            </h3>
                          </div>
                        </Col>
                      </Row>

                      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col span={24}>
                          <Form
                            layout="vertical"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                            form={form}
                          >
                            <Form.Item style={{ marginBottom: 0 }}>
                              <Form.Item
                                name="firstName"
                                label="Primeiro nome"
                                rules={[{ required: true }]}
                                style={{
                                  display: 'inline-block',
                                  width: 'calc(50% - 8px)',
                                }}
                              >
                                <Input placeholder="Primeiro nome" />
                              </Form.Item>
                              <Form.Item
                                name="lastName"
                                label="Sobrenome"
                                rules={[{ required: true }]}
                                style={{
                                  display: 'inline-block',
                                  width: 'calc(50% - 8px)',
                                  margin: '0 8px',
                                }}
                              >
                                <Input placeholder="Sobrenome" />
                              </Form.Item>
                            </Form.Item>
                            <Form.Item
                              label="Username"
                              name="username"
                              rules={[
                                {
                                  type: 'email',
                                  message: 'A entrada não é válida E-mail!',
                                },
                                {
                                  required: true,
                                  message:
                                    'Por favor introduza o seu nome de utilizador!',
                                },
                              ]}
                            >
                              <Input placeholder="username@email.com" />
                            </Form.Item>

                            <Form.Item style={{ marginBottom: 0 }}>
                              <Form.Item
                                name="country"
                                label="País"
                                rules={[{ required: true }]}
                                style={{
                                  display: 'inline-block',
                                  width: 'calc(50% - 8px)',
                                }}
                              >
                                <Select
                                  showSearch
                                  style={{ width: '100%' }}
                                  placeholder="seleccione um país"
                                  onChange={handleChangeCountrySelect}
                                  optionLabelProp="children"
                                >
                                  {countries.map((country: any) => (
                                    <Option
                                      value={country.name.common}
                                      label={country.name.common}
                                    >
                                      <div className="demo-option-label-item">
                                        <span role="img" aria-label="China">
                                          {country.flag}
                                          {'  '}
                                        </span>
                                        {country.name.common}
                                      </div>
                                    </Option>
                                  ))}
                                </Select>
                              </Form.Item>
                              <Form.Item
                                name="birthday"
                                label="Data de nascimento"
                                rules={[{ required: true }]}
                                style={{
                                  display: 'inline-block',
                                  width: 'calc(50% - 8px)',
                                  margin: '0 8px',
                                }}
                              >
                                <DatePicker
                                  style={{ width: '100%' }}
                                  format={dateFormat}
                                  disabledDate={d => !d || d.isAfter("2005-12-31") || d.isSameOrBefore("1960-01-01") }
                                />
                              </Form.Item>
                            </Form.Item>
                            <Form.Item
                              name="phoneNumber"
                              label="Número de telefone"
                              rules={[
                                {
                                  required: true,
                                  message:
                                    'Por favor introduza o seu número de telefone!',
                                },
                              ]}
                            >
                              <Input
                                addonBefore={prefixSelector}
                                style={{ width: '100%' }}
                              />
                            </Form.Item>
                            <Form.Item
                              label="Palavra-passe:"
                              name="password"
                              rules={[
                                {
                                  required: true,
                                  message:
                                    'Por favor introduza a sua palavra-chave!',
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
                                  message:
                                    'Por favor introduza a sua palavra-chave!',
                                },
                                ({ getFieldValue }) => ({
                                  validator(_, value) {
                                    if (
                                      !value ||
                                      getFieldValue('password') === value
                                    ) {
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
                                Criar Conta
                              </Button>
                            </Form.Item>
                          </Form>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={16}>
                          {isLoginError && (
                            <Alert
                              message="Error"
                              description="This is an error message about copywriting."
                              type="error"
                              showIcon
                            />
                          )}
                        </Col>
                      </Row>
                    </div>
                  </PageHeader>
                </LoginBox>
              </Col>
              <Col span={12} style={{ height: '100%' }}>
                <FolderSlider>
                  <div className="folder folder-1" />
                  <div className="folder folder-2" />
                  <div className="folder folder-3" />
                  <div className="slider-container">
                    <IntroSlider />
                  </div>
                </FolderSlider>
              </Col>
            </Row>
          </div>
        </Content>
        <FooterBox style={{ textAlign: 'center' }}>
          Copyright ©2022 Created by Dumilde Matos
        </FooterBox>
      </Layout>
    </>
  );
};

export default SignUp;
