import { useEffect, useRef } from 'react';
import { Button, Checkbox, Form, Input, Spin } from 'antd';
import type { InputRef } from 'antd';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { loginAuth } from 'store/reducers/auth/ActionCreators';

import style from './FormLogin.module.scss';

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

type FormDataType = {
  username: string;
  password: string;
  remember: boolean;
};

function FormLogin(): JSX.Element {
  const { isFetching } = useAppSelector((state) => state.authReducer);
  const [form] = Form.useForm<FormDataType>();
  const dispatch = useAppDispatch();
  const usernameInput = useRef<InputRef>(null);

  useEffect(() => {
    if (usernameInput.current) {
      usernameInput.current.focus();
    }
  }, [usernameInput]);
  const onFinish = ({ username, password, remember }: FormDataType) => {
    dispatch(loginAuth(username, password, remember));
  };

  return (
    <Spin spinning={isFetching} tip="Входим...">
      <Form
        className={style.container}
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="Логин" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input ref={usernameInput} />
        </Form.Item>

        <Form.Item label="Пароль" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ xs: { offset: 0, span: 16 }, sm: { offset: 8, span: 16 } }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ xs: { offset: 0, span: 16 }, sm: { offset: 8, span: 16 } }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
}

export default FormLogin;
