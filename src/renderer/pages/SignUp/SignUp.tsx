import {
  Layout,
  Carousel,
  Row,
  Col,
  Form,
  Button,
  Input,
  Checkbox,
  Select,
  Image,
  Alert,
  DatePicker,
} from 'antd';
import styled from '@xstyled/styled-components';
import { FaLinkedinIn } from '@react-icons/all-files/fa/FaLinkedinIn';
import { FaFacebookF } from '@react-icons/all-files/fa/FaFacebookF';
import { FaGoogle } from '@react-icons/all-files/fa/FaGoogle';
import { useHistory } from 'react-router-dom';
import {
  getUserDataService,
  onRegistUser,
  UserLoginService,
} from 'renderer/services/UserService';
import { MessageShow, RequestAlert } from 'renderer/utils/messages/Messages';
import { useContext, useState } from 'react';
import { MainContext } from 'renderer/contexts/MainContext';
import { LoginForm, UserRegistrationModel } from 'renderer/models/UserModels';
import folder1 from './undraw_Add_notes_re_ln36.svg';
import { onListCoutries } from 'renderer/services/CountryService';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

const { Content } = Layout;
const { Option } = Select;

const LoginBox = styled.divBox`
  margin-top: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-container {
    height: 100%;
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
  background: var(--white-1);
`;

const SignUp = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const { t, i18n } = useTranslation();

  const [isLoginError, setIsLoginError] = useState(false);

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

  const { data: lstCountries, refetch: refetchCountries } = onListCoutries(
    onSuccessListCountries,
    onErrorListCountries
  );

  const sucessRegistration = (data: any) => {
    console.log(data);
    if (data.status === 200 && !data.data.message) {
      MessageShow('success', 'criado com sucesso');
    } else {
      MessageShow('warning', data.data.message);
    }
  };

  const errorRegistration = (error: any) => {
    console.log(error)
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
    console.log('error091')
    MessageShow('warning', registredUser.message);
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
      phonenumber: values.phoneNumber,
      firstname: values.firstName,
      lastname: values.lastName,
      country: values.country,
      birthday: String(moment(values.birthday).format(dateFormat)),
      role: 'ROLE_USER',
    };
    console.log('Success:', registUserForm);
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
              <Col span={12} style={{ height: '100%' }}>
                <LoginBox>
                  <div className="login-container">
                    <Row>
                      <Col span={24}>
                        <div className="login-logo">
                          <header>
                            <h1>
                              Simple <b>Doc</b>
                            </h1>
                          </header>
                          <h3>Criar Conta</h3>
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
                        >
                          <Form.Item style={{ marginBottom: 0 }}>
                            <Form.Item
                              name="firstName"
                              label="First Name"
                              rules={[{ required: true }]}
                              style={{
                                display: 'inline-block',
                                width: 'calc(50% - 8px)',
                              }}
                            >
                              <Input placeholder="Input birth year" />
                            </Form.Item>
                            <Form.Item
                              name="lastName"
                              label="Last Name"
                              rules={[{ required: true }]}
                              style={{
                                display: 'inline-block',
                                width: 'calc(50% - 8px)',
                                margin: '0 8px',
                              }}
                            >
                              <Input placeholder="LastName" />
                            </Form.Item>
                          </Form.Item>
                          <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                              {
                                required: true,
                                message: 'Please input your username!',
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>

                          <Form.Item style={{ marginBottom: 0 }}>
                            <Form.Item
                              name="country"
                              label="Country"
                              rules={[{ required: true }]}
                              style={{
                                display: 'inline-block',
                                width: 'calc(50% - 8px)',
                              }}
                            >
                              <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="select one country"
                                onChange={handleChangeCountrySelect}
                                optionLabelProp="children"
                                // filterOption={(input, option) =>
                                //   (
                                //     option!.children as unknown as string
                                //   ).includes(input)
                                // }
                                // filterSort={(optionA, optionB) =>
                                //   (optionA!.children as unknown as string)
                                //     .toLowerCase()
                                //     .localeCompare(
                                //       (
                                //         optionB!.children as unknown as string
                                //       ).toLowerCase()
                                //     )
                                // }
                              >
                                {lstCountries?.data.map((country: any) => (
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
                              label="Birthday"
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
                              />
                            </Form.Item>
                          </Form.Item>
                          <Form.Item
                            name="phoneNumber"
                            label="Phone Number"
                            rules={[{ required: true }]}
                            style={{
                              width: '100%',
                            }}
                          >
                            <Input placeholder="LastName" />
                          </Form.Item>
                          <Form.Item
                            label="Palavra-passe:"
                            name="password"
                            rules={[
                              {
                                required: true,
                                message: 'Please input your password!',
                              },
                            ]}
                          >
                            <Input.Password />
                          </Form.Item>
                          <Form.Item
                            label="Confirmar Palavra-passe:"
                            name="confirmPassword"
                            rules={[
                              {
                                required: true,
                                message: 'Please input your password!',
                              },
                            ]}
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
                    <Row>
                      <Col span={16} style={{ textAlign: 'center' }}>
                        <p>or</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="social-login" span={16}>
                        <div>
                          <Button>
                            <FaLinkedinIn />
                          </Button>{' '}
                          <Button>
                            <FaFacebookF />
                          </Button>{' '}
                          <Button onClick={() => socialLogin('google')}>
                            <FaGoogle />
                          </Button>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col
                        span={16}
                        className="p-10 sign-up"
                        style={{ marginTop: '1rem' }}
                      >
                        <span>
                          Ainda não tem uma conta,
                          <Button
                            type="link"
                            onClick={() => {
                              history.push('/login');
                            }}
                          >
                            Login
                          </Button>
                        </span>
                      </Col>
                    </Row>
                  </div>
                </LoginBox>
              </Col>
              <Col span={12} style={{ height: '100%' }}>
                <FolderSlider>
                  <div className="folder folder-1" />
                  <div className="folder folder-2" />
                  <div className="folder folder-3" />
                  <div className="slider-container">
                    <Carousel autoplay>
                      <div>
                        <h3>Facilidade</h3>
                        <p>
                          Lorem ipsum dolor sit amet, consetetur sadipscing
                          elitr, sed diam nonumy eirmod tempor invidunt ut
                          labore et dolore magna aliquyam erat, sed diam
                          voluptua. At vero eos et accusam et justo duo dolores
                          et ea rebum. Stet clita kasd gubergren, no sea
                          takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                          ipsum dolor sit amet, consetetur sadipscing elitr.
                        </p>
                        <Image src={folder1} width="200" />
                      </div>
                      <div>
                        <h3>2</h3>
                      </div>
                      <div>
                        <h3>3</h3>
                      </div>
                      <div>
                        <h3>4</h3>
                      </div>
                    </Carousel>
                  </div>
                </FolderSlider>
              </Col>
            </Row>
          </div>
        </Content>
        <FooterBox style={{ textAlign: 'center' }}>
          Copyright ©2020 Created by Dumilde Matos
        </FooterBox>
      </Layout>
    </>
  );
};

export default SignUp;
