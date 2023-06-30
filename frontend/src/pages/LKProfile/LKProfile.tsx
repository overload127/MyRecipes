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

import style from './LKProfile.module.scss';

const { Content } = Layout;

type TagType = {
  key: string;
  label: string;
};

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

type SocialNetworkType = {
  id: number;
  url: string;
  type: string;
};

type UserType = {
  avatar: string;
  name: string;
  signature: string;
  tags: TagType[];
  socialNetwork: SocialNetworkType[];
};

const currentUser: UserType = {
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
  name: 'Василий',
  signature: '',
  tags: [],
  socialNetwork: [
    {
      id: 0,
      url: 'https://vk.com/',
      type: 'vk',
    },
    {
      id: 1,
      url: 'https://vk.com/',
      type: 'pinterest',
    },
    {
      id: 2,
      url: 'https://vk.com/',
      type: 'pintdsafdsferest',
    },
  ],
};

function LKProfile(): JSX.Element {
  const [inputVisible, setInputVisible] = useState(false);
  const [newTags, setNewTags] = useState<TagType[]>([]);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);

  const {
    token: { colorTextLabel, controlHeight },
  } = theme.useToken();

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
      <Row gutter={24}>
        <Col lg={7} md={24} sm={24} xs={24}>
          <Card className={style.info} bordered={false}>
            <div>
              <div className={style.avatarHolder}>
                <img alt="Картинка пользователя" src={currentUser.avatar} />
                <div className={style.name}>{currentUser.name}</div>
                <div>{currentUser.signature}</div>
              </div>
              <Divider dashed />
              <div className={style.tags}>
                <div className={style.tagsTitle}>Тэги</div>
                {currentUser.tags.concat(newTags).map((item) => (
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
                    {currentUser.socialNetwork.map((item) => (
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
          <Card bordered={false}>
            Место для персонального контента. Например тут можно было бы вывести все мои рецепты и тут же можно было бы
            добавлять новые.
          </Card>
        </Col>
      </Row>
    </Content>
  );
}

export default LKProfile;
