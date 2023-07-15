import { useState, useRef, useEffect } from 'react';
import { Layout, Col, Row, Card, Divider, Tag, Input, theme, ConfigProvider } from 'antd';
import type { InputRef } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  IconBrandFacebook,
  IconBrandVk,
  IconBrandYoutube,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandTwitter,
  IconBrandTwitch,
  IconBrandReddit,
  IconBrandTelegram,
  IconBrandPinterest,
  IconBrandWhatsapp,
  IconWorldQuestion,
} from '@tabler/icons-react';
import { useAppSelector } from 'hooks/redux';
import { TagType } from 'models/store/IProfile';
import RecipeList from 'components/RecipeList/RecipeList';
import { IMAGES } from 'utils/LoadDefaultImages/LoadDefaultImages';

import style from './LKProfile.module.scss';

const { Content } = Layout;
const { useToken } = theme;

type SocialNetworkMetaDataType = {
  name: string;
  icon: JSX.Element;
};

function getSocialNetworkMetaData(key: string): SocialNetworkMetaDataType {
  switch (key) {
    case 'facebook':
      return {
        name: 'Facebook',
        icon: <IconBrandFacebook />,
      };
    case 'youtube':
      return {
        name: 'YouTube',
        icon: <IconBrandYoutube />,
      };
    case 'instagram':
      return {
        name: 'Instagram',
        icon: <IconBrandInstagram />,
      };
    case 'tiktok':
      return {
        name: 'TikTok',
        icon: <IconBrandTiktok />,
      };
    case 'twitter':
      return {
        name: 'Twitter',
        icon: <IconBrandTwitter />,
      };
    case 'twitch':
      return {
        name: 'Twitch',
        icon: <IconBrandTwitch />,
      };
    case 'reddit':
      return {
        name: 'Reddit',
        icon: <IconBrandReddit />,
      };
    case 'pinterest':
      return {
        name: 'Pinterest',
        icon: <IconBrandPinterest />,
      };
    case 'vk':
      return {
        name: 'Vk',
        icon: <IconBrandVk />,
      };
    case 'telegram':
      return {
        name: 'Telegram',
        icon: <IconBrandTelegram />,
      };
    case 'whatsapp':
      return {
        name: 'WhatsApp',
        icon: <IconBrandWhatsapp />,
      };
    default:
      return {
        name: 'other',
        icon: <IconWorldQuestion />,
      };
  }
}

function LKProfile(): JSX.Element {
  const [inputVisible, setInputVisible] = useState(false);
  const [newTags, setNewTags] = useState<TagType[]>([]);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);
  const { user } = useAppSelector((state) => state.authReducer);
  const { profile } = useAppSelector((state) => state.userReducer);

  const {
    token: { colorTextLabel, controlHeight },
  } = useToken();

  useEffect(() => {
    if (inputVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputVisible]);

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && newTags.filter((tag) => tag.label === inputValue).length === 0) {
      setNewTags([...newTags, { key: `new-${newTags.length}`, label: inputValue }]);
    }
    setInputVisible(false);
    setInputValue('');
  };
  return (
    <Content>
      <Row gutter={{ xs: 1, sm: 1, md: 1, lg: 24 }}>
        <Col lg={7} md={24} sm={24} xs={24}>
          <Card className={style.info} bordered={false}>
            <div>
              <div className={style.avatarHolder}>
                <img alt="Картинка пользователя" src={profile.urlAvatar || IMAGES.noneProfileAvatar} />
                <div className={style.name}>{profile.firstName || user.name || 'безымянный'}</div>
                <div>Подпись</div>
              </div>
              <Divider dashed />
              <div className={style.tags}>
                <div className={style.tagsTitle}>Тэги</div>
                {profile.tags.concat(newTags).map((item) => (
                  <Tag key={item.key}>{item.label}</Tag>
                ))}
                {inputVisible && (
                  <Input
                    ref={inputRef}
                    type="text"
                    size="small"
                    style={{ width: 78 }}
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                  />
                )}
                {!inputVisible && (
                  <Tag onClick={showInput} style={{ borderStyle: 'dashed' }}>
                    <PlusOutlined />
                  </Tag>
                )}
              </div>
              <Divider dashed />
              <div className={style.socialNetwork}>
                <div className={style.socialTitle}>Соцсети</div>
                <Row gutter={36}>
                  <ConfigProvider
                    theme={{
                      token: {
                        colorLink: colorTextLabel,
                      },
                    }}
                  >
                    {profile.socialNetworks
                      .filter((item) => item.url.length > 0)
                      .map((item) => (
                        <Col key={item.id} lg={24} xl={24}>
                          <a href={item.url} style={{ marginBottom: controlHeight * 0.75 }}>
                            <span className={style.icon}>{getSocialNetworkMetaData(item.type).icon}</span> {item.url}
                          </a>
                        </Col>
                      ))}
                  </ConfigProvider>
                </Row>
              </div>
            </div>
          </Card>
        </Col>
        <Col lg={17} md={24} sm={24} xs={24}>
          <RecipeList />
        </Col>
      </Row>
    </Content>
  );
}

export default LKProfile;
