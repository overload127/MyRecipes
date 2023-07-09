import { useEffect } from 'react';
import { Button, Form, Input, DatePicker, Select } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { updateBaseDataProfile } from 'store/reducers/profile/ActionCreators';
import PhoneNumberInput from 'components/PhoneNumberInput/PhoneNumberInput';
import { parsePhoneNumber, formatPhoneNumberIntl } from 'react-phone-number-input';

const dateFormat = 'YYYY-MM-DD';

const genderOptions = [
  { value: 1, label: 'Мужской' },
  { value: 2, label: 'Женский' },
  { value: 0, label: 'Не указан' },
];

type FormDataType = {
  firstName: string;
  lastName: string;
  birthday: Dayjs;
  gender: number;
  phoneNumber: string;
};

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

function BaseAccountForm(): JSX.Element {
  const { isFetching, profile } = useAppSelector((state) => state.userReducer);
  const [form] = Form.useForm<FormDataType>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const currentPhone = profile.phone || '';
    const parsed = parsePhoneNumber(currentPhone, 'RU');
    let resultValue = parsed && formatPhoneNumberIntl(currentPhone);
    if (resultValue === undefined) resultValue = '';
    form.setFieldsValue({
      firstName: profile.firstName,
      lastName: profile.lastName,
      birthday: (profile.birthday && dayjs(profile.birthday, dateFormat)) || '',
      gender: profile.gender,
      phoneNumber: resultValue,
    });
  }, [profile, form]);
  const onFinish = ({ firstName, lastName, birthday, gender, phoneNumber }: FormDataType) => {
    const stringDate = birthday ? birthday.format(dateFormat) : null;
    dispatch(updateBaseDataProfile(firstName, lastName, stringDate, gender, phoneNumber));
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
      <Form.Item
        label="Имя"
        name="firstName"
        tooltip={{
          title: 'Ваше имя. Необязательное поле',
          icon: <InfoCircleOutlined />,
        }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Фамилия"
        name="lastName"
        tooltip={{
          title: 'Ваша фамилия. Необязательное поле',
          icon: <InfoCircleOutlined />,
        }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="День рождения"
        name="birthday"
        tooltip={{
          title: 'Ваша дата рождения. Необязательное поле',
          icon: <InfoCircleOutlined />,
        }}
      >
        <DatePicker format={dateFormat} placeholder={dayjs(new Date()).format(dateFormat)} />
      </Form.Item>

      <Form.Item
        label="Пол (гендер)"
        name="gender"
        tooltip={{
          title: 'Ваш пол (гендер). Необязательное поле',
          icon: <InfoCircleOutlined />,
        }}
      >
        <Select options={genderOptions} />
      </Form.Item>

      <Form.Item
        label="Номер мобильного телефона"
        name="phoneNumber"
        tooltip={{
          title: 'Ваш номер мобильного телефона. Необязательное поле',
          icon: <InfoCircleOutlined />,
        }}
        rules={[
          {
            // @ts-ignore
            validator(rule, value) {
              return new Promise((resolve, reject) => {
                const phoneNumber = parsePhoneNumber(value);
                if (value === '') {
                  resolve(value);
                } else if (phoneNumber?.isValid()) {
                  resolve(value);
                } else {
                  // eslint-disable-next-line prefer-promise-reject-errors
                  reject('Некорректный номер');
                }
              });
            },
          },
        ]}
      >
        {/* @ts-ignore */}
        <PhoneNumberInput />
      </Form.Item>

      <Form.Item wrapperCol={{ xs: { offset: 0, span: 16 }, sm: { offset: 8, span: 16 } }}>
        <Button type="primary" htmlType="submit" disabled={isFetching}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default BaseAccountForm;
