import { useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { IProfileSocialNetworks as FormDataType } from 'models/business/IProfileBusiness';
import { updateSocialNetworkProfile } from 'store/reducers/profile/ActionCreators';

// eslint-disable-next-line
const onFinishFailed = (errorInfo: any) => {
  toast.warn(errorInfo, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
  });
};

function SocialNetwork(): JSX.Element {
  const { isFetching, profile } = useAppSelector((state) => state.userReducer);
  const [form] = Form.useForm<FormDataType>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    form.setFieldsValue({
      ...Object.fromEntries(profile.socialNetworks.map((item) => [`social_${item.type}_url`, item.url])),
    });
  }, [profile, form]);

  const onFinish = (data: FormDataType) => {
    dispatch(updateSocialNetworkProfile(data));
  };
  return (
    <Form
      layout="vertical"
      form={form}
      name="basic"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {profile.socialNetworks.map((item) => (
        <Form.Item
          key={item.id}
          label={`Социальная сеть ${item.type}`}
          name={`social_${item.type}_url`}
          rules={[
            {
              type: 'url',
              message: 'Это поле должно быть полной ссылкой на вашу страницу.',
            },
          ]}
          tooltip={{
            title: `Полная ссылка на вашу страницу ${item.type}`,
            icon: <InfoCircleOutlined />,
          }}
        >
          <Input />
        </Form.Item>
      ))}

      <Form.Item wrapperCol={{ xs: { offset: 0, span: 16 }, sm: { offset: 8, span: 16 } }}>
        <Button type="primary" htmlType="submit" disabled={isFetching}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default SocialNetwork;
