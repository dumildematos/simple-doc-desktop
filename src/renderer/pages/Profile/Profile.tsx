import {
  Breadcrumb,
  Layout,
  Image,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
  Upload,
  Input,
  DatePicker,
  Select,
} from 'antd';
import ImgCrop from 'antd-img-crop';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { MessageShow } from 'renderer/utils/messages/Messages';
import {
  onGetUserActivityService,
  onUpdateUserService,
} from 'renderer/services/UserService';
import IntroduceRow from './components/IntroduceRow';
import countries from '../../utils/countries.json';
import phonePrefxes from '../../utils/prefixes.json';

const { Option } = Select;
const dateFormat = 'DD/MM/YYYY';
const MainContainer = styled(Layout)`
  height: 100vh;
  .avatarHolder {
    margin-bottom: 24px;
    text-align: center;

    img {
      width: 104px;
      height: 104px;
      margin-bottom: 20px;
      border-radius: 50%;
    }

    .name {
      margin-bottom: 4px;
      font-weight: 500;
      font-size: 20px;
      line-height: 28px;
    }
  }
`;

const ModalLayout = styled(Modal)`
  .ant-modal-content {
    /*Groups*/
    background: ${(props: { theme: { modalBg: any } }) => props.theme.modalBg};
    .ant-modal-header {
      background: ${(props: { theme: { modalBg: any } }) =>
        props.theme.modalBg};
      border-color: ${(props: { theme: { modalInnerBorderColor: any } }) =>
        props.theme.modalInnerBorderColor};
      .ant-modal-title {
        color: ${(props: { theme: { modalInputColor: any } }) =>
          props.theme.modalInputColor} !important;
      }
    }
    .ant-modal-body {
      label {
        color: ${(props: { theme: { modalInputColor: any } }) =>
          props.theme.modalInputColor} !important;
      }
      .ant-input {
        background: ${(props: { theme: { modalBgInput: any } }) =>
          props.theme.modalBgInput} !important;
        border: ${(props: { theme: { modalInputBorder: any } }) =>
          props.theme.modalInputBorder};
        color: ${(props: { theme: { modalInputColor: any } }) =>
          props.theme.modalInputColor} !important;
      }
    }
    .ant-modal-footer {
      border-color: ${(props: { theme: { modalInnerBorderColor: any } }) =>
        props.theme.modalInnerBorderColor};
      button.ant-btn.ant-btn-primary {
        background-color: var(--purple-1);
        border: none;
      }
    }
  }
`;

const Profile = (props: any) => {
  const user = JSON.parse(localStorage.getItem('user') || '');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleAvatar, setIsModalVisibleAvatar] = useState(false);
  const [formUpdateInfo] = Form.useForm();
  const [formAvatar] = Form.useForm();
  const [bannerInput, setBannerInput] = useState([]);

  const onSucessGetActivity = (data: any) => {
    if (data && data.status === 200) {
      // setTableLIstTeam(
      //   data?.data?.content.map((team) => {
      //     return {
      //       id: team.id,
      //       key: team.id,
      //       title: team.name,
      //       members: team.contributors.length,
      //       desc: team.description,
      //       type: team.type === 'PRIVATE' ? <FaLock /> : <FaGlobeAfrica />,
      //       docs: team.documents.length,
      //     };
      //   })
      // );
      console.log(data);
    } else {
      RequestAlert(
        props.t('comum.there_was_a_problem_with_the_request'),
        props.t('comum.click_okay_to_fix')
      );
    }
  };
  const onErrorGetActivity = (error: any) => {
    RequestAlert(
      props.t('comum.there_was_a_problem_with_the_request'),
      props.t('comum.click_okay_to_fix')
    );
  };

  const { data: userActivityInfo, refetch: refetchUserActivity } =
    onGetUserActivityService(onSucessGetActivity, onErrorGetActivity);

  useEffect(() => {
    refetchUserActivity();
    return;
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onCancel = () => {
    setIsModalVisible(false);
  };

  const showModalAvatar = () => {
    setIsModalVisibleAvatar(true);
  };

  const onCancelAvatar = () => {
    setIsModalVisibleAvatar(false);
  };

  const onChangeBanner = ({ fileList: newFileList }) => {
    console.log(newFileList);
    setBannerInput(newFileList);
  };

  const onPreviewBannerImage = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const handleChangeCountrySelect = (value: string) => {
    console.log(`selected ${value}`);
  };

  const sucessRequest = (data: any) => {
    console.log(data);
    if (data.status === 200 && !data.data.message) {
      MessageShow('success', 'criado com sucesso');
      localStorage.setItem('user', JSON.stringify(data.data));

      if (formUpdateInfo) {
        formUpdateInfo.resetFields();
      }
      if (formAvatar) {
        formAvatar.resetFields();
      }

      setIsModalVisible(false);
      setIsModalVisibleAvatar(false);
    } else {
      MessageShow('warning', data.data.message);
    }
  };

  const errorRequest = (error: any) => {
    console.log(error);
    MessageShow('warning', error.message);
  };

  const {
    mutate: onEditUser,
    data: registredUser,
    isLoading: isLoadingRegistration,
    isError: isRegistationError,
  } = onUpdateUserService(sucessRequest, errorRequest);

  const onUpdateUser = (values: any) => {
    console.log(values);
    const userToSend = {
      id: user.id,
      firstname: values.firstName,
      lastname: values.lastName,
      avatar: user.avatar,
      username: user.username,
      birthday: String(moment(values.birthday).format(dateFormat)),
      password: null,
      country: values.country,
      phonenumber: `${values.prefix ? values.prefix : '+244'}-${values.phoneNumber}`,
      role: 'ROLE_USER',
    };
    onEditUser(userToSend);
    console.log(userToSend);
  };

  const onUpdateAvatar = (values) => {
    // console.log(bannerInput[0].thumbUrl);
    const userToSend = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      avatar: bannerInput[0].thumbUrl,
      username: user.username,
      birthday: String(
        user?.birthdate.replaceAll('-', '/').split('/').reverse().join('/')
      ),
      password: null,
      country: user.country,
      phonenumber: user.phonenumber,
      role: 'ROLE_USER',
    };
    onEditUser(userToSend);
  };

  const prefixSelector = (
    <Form.Item
      name="prefix"
      noStyle
      initialValue={user.phonenumber.split('-')[0]}
    >
      <Select style={{ width: 100 }}>
        {phonePrefxes.countries.map((prefix) => (
          <Option value={prefix.code}>{prefix.code}</Option>
        ))}
      </Select>
    </Form.Item>
  );

  return (
    <MainContainer>
      <Row gutter={24} style={{ marginTop: 50, padding: 25, height: '100%' }}>
        <Col lg={7} md={24}>
          <Card bordered={false} style={{ marginBottom: 24, height: '100%' }}>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '1rem',
              }}
            >
              <Button type="link" onClick={showModalAvatar}>
                {props.t('comum.edit_user_avatar')}
              </Button>
              <Button type="link" onClick={showModal}>
                {props.t('comum.edit_profile')}
              </Button>
            </div>
            <div>
              <div className="avatarHolder">
                <Image alt="" src={user?.avatar} />
                <div className="name">
                  {`${user?.firstname} ${user?.lastname}`}
                </div>
                <div>{user?.username}</div>
              </div>
              <div className="row d-flex justify-content-center">
                <span>
                  <b>{props.t('comum.country')}:</b> {user?.country}
                </span>
              </div>
              <div className="row d-flex justify-content-center">
                <span>
                  <b>{props.t('comum.phone')}:</b> {user?.phonenumber}
                </span>
              </div>
              <div className="row d-flex justify-content-center">
                <span>
                  <b>{props.t('comum.birthday')}: </b>
                  {user?.birthdate
                    .replaceAll('-', '/')
                    .split('/')
                    .reverse()
                    .join('/')}
                </span>
              </div>
            </div>
          </Card>
        </Col>
        <Col lg={17} md={24}>
          {userActivityInfo && userActivityInfo.data && (
            <IntroduceRow activity={userActivityInfo.data} t={props.t} />
          )}
        </Col>
      </Row>
      <ModalLayout
        theme={props.theme}
        visible={isModalVisible}
        title={props.t('comum.edit_user_information')}
        okText={props.t('comum.update')}
        cancelText={props.t('comum.cancel')}
        onCancel={onCancel}
        onOk={() => {
          formUpdateInfo
            .validateFields()
            // eslint-disable-next-line promise/always-return
            .then((values) => {
              onUpdateUser(values);
              // form.resetFields();
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={formUpdateInfo}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: 'public',
          }}
        >
          <Form.Item style={{ marginBottom: 0 }}>
            <Form.Item
              name="firstName"
              label={props.t('comum.first_name')}
              rules={[{ required: true }]}
              initialValue={user.firstname}
              style={{
                display: 'inline-block',
                width: 'calc(50% - 8px)',
              }}
            >
              <Input placeholder={props.t('comum.first_name')} />
            </Form.Item>
            <Form.Item
              name="lastName"
              label={props.t('comum.last_name')}
              rules={[{ required: true }]}
              initialValue={user.lastname}
              style={{
                display: 'inline-block',
                width: 'calc(50% - 8px)',
                margin: '0 8px',
              }}
            >
              <Input placeholder={props.t('comum.last_name')} />
            </Form.Item>
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            <Form.Item
              name="country"
              label={props.t('comum.country')}
              rules={[{ required: true }]}
              initialValue={user.country}
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
              label={props.t('comum.birthday')}
              rules={[{ required: true }]}
              // initialValue={String(
              //   user.birthdate
              //     .replaceAll('-', '/')
              //     .split('/')
              //     .reverse()
              //     .join('/')
              // )}
              style={{
                display: 'inline-block',
                width: 'calc(50% - 8px)',
                margin: '0 8px',
              }}
            >
              <DatePicker style={{ width: '100%' }} format={dateFormat} disabledDate={d => !d || d.isAfter("2005-12-31") || d.isSameOrBefore("1960-01-01") }/>
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              label={props.t('comum.phone')}
              initialValue={user.phonenumber.split('-')[1]}
              rules={[
                {
                  required: true,
                  message: 'Por favor introduza o seu número de telefone!',
                },
              ]}
            >
              <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            </Form.Item>
          </Form.Item>
        </Form>
      </ModalLayout>
      <ModalLayout
        theme={props.theme}
        visible={isModalVisibleAvatar}
        title={props.t('comum.edit_user_picture')}
        okText={props.t('comum.update')}
        cancelText={props.t('comum.cancel')}
        onCancel={onCancelAvatar}
        onOk={() => {
          formAvatar
            .validateFields()
            // eslint-disable-next-line promise/always-return
            .then((values) => {
              onUpdateAvatar(values);
              // form.resetFields();
            })
            .catch((info) => {
              // console.log('Validate Failed:', info);
              onUpdateAvatar();
            });
        }}
      >
        <Form
          form={formAvatar}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: 'public',
          }}
        >
          <Row justify="center">
            <Col>
              <Form.Item
                name="banner"
                rules={[
                  {
                    required: !(bannerInput.length > 0),
                    message: props.t('home.modal_create_team.required_field'),
                  },
                ]}
              >
                <ImgCrop rotate>
                  <Upload
                    listType="picture-card"
                    fileList={bannerInput}
                    onChange={onChangeBanner}
                    onPreview={onPreviewBannerImage}
                  >
                    {bannerInput.length < 1 && '+ Upload'}
                  </Upload>
                </ImgCrop>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </ModalLayout>
    </MainContainer>
  );
};

export default Profile;
