import {
  Layout,
  Carousel,
  Row,
  Col,
  Form,
  Button,
  Input,
  Checkbox,
  Image,
  Alert,
} from 'antd';
import styled from '@xstyled/styled-components';
import { FaLinkedinIn } from '@react-icons/all-files/fa/FaLinkedinIn';
import { FaFacebookF } from '@react-icons/all-files/fa/FaFacebookF';
import { FaGoogle } from '@react-icons/all-files/fa/FaGoogle';
import { useHistory } from 'react-router-dom';
import {
  getUserDataService,
  UserLoginService,
} from 'renderer/services/UserService';
import { MessageShow } from 'renderer/utils/messages/Messages';
import { useContext, useState } from 'react';
import { MainContext } from 'renderer/contexts/MainContext';
import { LoginForm } from 'renderer/models/UserModels';
import IntroSlider from 'renderer/components/IntroSlider/IntroSlider';


const { Content } = Layout;

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

const FooterBox = styled.footerBox`
  font-size: 10px;
  padding: 5px;
  background: var(--white-1);
  margin: 1.4rem 0;
`;

const Login = (props: any) => {
  const [form] = Form.useForm();

  const history = useHistory();

  const {
    defineRoutedState,
    defineAcesstoken,
    definePageInfo,
    definedEditorIsOpened,
    defineRefreshtoken,
    defineUser,
    defineCurrentPath,
    defineDocSideBar,
  } = useContext(MainContext);
  const [isLoginError, setIsLoginError] = useState(false);
  const hasAcessToken = localStorage.getItem('access_token');

  const goToLogin = () => {
    history.push('/login');
  };

  const onDetailSuccess = (data: any) => {
    if (data?.status === 200) {
      defineUser(data.data);
      localStorage.setItem('user', JSON.stringify(data.data));
      localStorage.setItem('hasLogin', JSON.stringify(true));
      localStorage.setItem('loginPath', String(document.location.href));
      setTimeout(() => {
        // history.push('/home');
        // history.push(`${location.pathname}`)
        document.location.reload();
      }, 2000);
    } else {
      localStorage.clear();
      defineRoutedState(false);
      definePageInfo({});
      definedEditorIsOpened(false);
      defineDocSideBar(false);
      defineCurrentPath('');
      defineUser({});
      defineAcesstoken(undefined);
      defineRefreshtoken(undefined);
      // window.location.href = '/';
      setTimeout(() => {
        // history.push('/home');
        history.push(`${location.pathname}`);
        window.location.href = window.location.origin;
        // document.location.reload();
      }, 2000);
      // history.push(`${location.pathname}`);
      // document.location.reload();
      // document.location.replace(document.location.origin);
      // setTimeout(() => history.push('/'), 10);
    }
  };
  const onDetailError = () => {};

  const onLoginSuccess = (data: any) => {
    if (data?.data.status === 200) {
      const accessToken = data?.data?.access_token;
      const refreshToken = data?.data?.refresh_token;
      if (accessToken && refreshToken) {
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
        defineAcesstoken(accessToken);
      }
      setIsLoginError(false);
    } else {
      setIsLoginError(true);
      MessageShow('error', 'Action in progress');
    }
  };

  const onLoginError = (error: any) => {
    console.log(error.message);
  };
  const {
    mutate: onUserLogin,
    data,
    isError: loginError,
    isLoading,
  } = UserLoginService(onLoginSuccess, onLoginError);

  const { data: userDetail, isLoading: isLoadingDetails } = getUserDataService(
    onDetailSuccess,
    onDetailError,
    hasAcessToken,
    data
  );

  if (isLoading) {
    MessageShow('loading', 'Action in progress');
    console.log('isLoading...');
    // if(!data){
    //   MessageShow('error','Action in progress');
    // }
  }

  if (loginError) {
    alert('Error');
  }

  const onFinish = (values: any) => {
    // console.log('Success:', values);
    const loginForm: LoginForm = {
      username: values.username,
      password: values.password,
    };
    onUserLogin(loginForm);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const socialLogin = (client: string) => {
    console.log(client);
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
                          <p>
                            Documente seus produtos, serviços, processos e muito
                            de forma fácil e ágil.
                          </p>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={16}>
                        <Form
                          layout="vertical"
                          initialValues={{ remember: true }}
                          onFinish={onFinish}
                          onFinishFailed={onFinishFailed}
                          autoComplete="off"
                        >
                          <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                              {
                                required: true,
                                message: 'Por favor introduza o seu username!',
                              },
                            ]}
                          >
                            <Input placeholder="username@email.com" />
                          </Form.Item>
                          <Form.Item
                            label="Palavra-passe:"
                            name="password"
                            rules={[
                              {
                                required: true,
                                message:
                                  'Por favor introduza a sua palavra-passe!',
                              },
                            ]}
                          >
                            <Input.Password placeholder="palavra-passe" />
                          </Form.Item>
                          <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                          </Form.Item>

                          <Form.Item>
                            <Button
                              className="btnLogin"
                              type="primary"
                              block
                              htmlType="submit"
                            >
                              Entrar
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
                              history.push('/signup');
                            }}
                          >
                            Registra-se
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

// export const goToLogin = () => {
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const history = useHistory();
//   history.push('/login');
// };

export default Login;
