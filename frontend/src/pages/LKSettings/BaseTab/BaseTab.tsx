import { Upload, Button, Typography, Spin, Tooltip } from 'antd';
import type { UploadProps } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import type { UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface';
import { toast } from 'react-toastify';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { deleteAvatarProfile, updateAvatarProfile } from 'store/reducers/profile/ActionCreators';
import { IMAGES } from 'utils/LoadDefaultImages/LoadDefaultImages';

import BaseAccountForm from './BaseAccountForm/BaseAccountForm';
import style from './BaseTab.module.scss';

const { Text } = Typography;

function Base(): JSX.Element {
  const {
    isFetching,
    profile: { urlAvatar },
  } = useAppSelector((state) => state.userReducer);

  const dispatch = useAppDispatch();

  const uploadPropsData: UploadProps = {
    beforeUpload: (file) => {
      const matched = ['image/png', 'image/jpeg', 'image/jpg', 'image/bmp', 'image/webp'].filter(
        (ext) => ext === file.type,
      );
      const isImage = matched.length !== 0;

      if (!isImage) {
        toast.warn(`${file.name} должен быть с одним из следующих расширений [png, jpeg, jpg, bmp, webp]`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
        });
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        toast.warn(`${file.name} превышает разрешенный размер в 2 мегабайта`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
        });
      }
      return isImage || Upload.LIST_IGNORE;
    },
    accept: 'image/png, image/jpeg, image/jpg, image/bmp, image/webp',
    showUploadList: false,
    customRequest: async ({ file }: RcCustomRequestOptions) => {
      const formData = new FormData();
      formData.append('avatar', file);
      await dispatch(updateAvatarProfile(formData));
    },
  };

  const handleDeleteAvatar = () => {
    dispatch(deleteAvatarProfile());
  };

  return (
    <Spin spinning={isFetching} tip="обновляем данные ...">
      <div className={style.container}>
        <div className={style.formWrapper}>
          <BaseAccountForm />
        </div>

        <div className={style.avatar}>
          <Text className={style.title}>Avatar</Text>
          <div className={style.picture}>
            <img alt="Картинка пользователя" src={urlAvatar || IMAGES.noneProfileAvatar} />
          </div>

          <div className={style.buttonView}>
            <Upload {...uploadPropsData}>
              <Tooltip placement="topLeft" title="[png, jpeg, jpg, bmp, webp] [2mb]">
                <Button icon={<UploadOutlined />} disabled={isFetching}>
                  Change avatar
                </Button>
              </Tooltip>
            </Upload>
            <Button
              icon={<DeleteOutlined />}
              type="primary"
              danger
              disabled={isFetching || !urlAvatar}
              onClick={handleDeleteAvatar}
            />
          </div>
        </div>
      </div>
    </Spin>
  );
}

export default Base;
