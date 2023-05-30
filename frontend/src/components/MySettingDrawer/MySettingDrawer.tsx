import { useState, Dispatch, SetStateAction } from 'react';
import { theme, Drawer, Switch, Tooltip, Form, Typography, Space } from 'antd';
import { CloseOutlined, SettingOutlined } from '@ant-design/icons';

import style from './MySettingDrawer.module.scss';
import { ThemeColor } from './ThemeColor';

const { useToken } = theme;
const { Text } = Typography;

export const colorList = {
  techBlue: '#1677FF',
  daybreak: '#1890ff',
  dust: '#F5222D',
  volcano: '#FA541C',
  sunset: '#FAAD14',
  cyan: '#13C2C2',
  green: '#52C41A',
  geekblue: '#2F54EB',
  purple: '#722ED1',
};

export type TypeItemColorList = keyof typeof colorList;

interface IProps {
  isDarkMode: boolean;
  isCompact: boolean;
  colorPrimary: TypeItemColorList;
  setIsDarkMode: Dispatch<SetStateAction<boolean>>;
  setIsCompact: Dispatch<SetStateAction<boolean>>;
  setColorPrimary: Dispatch<SetStateAction<TypeItemColorList>>;
}

function MySettingDrawer({
  isDarkMode,
  isCompact,
  colorPrimary,
  setIsDarkMode,
  setIsCompact,
  setColorPrimary,
}: IProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const { token } = useToken();
  const drawerOpenProps = {
    open,
    onOpenChange: null,
  };

  const contentWrapperStyle = open
    ? {
        display: 'block',
        right: '0px',
        boxShadow:
          '-6px 0 16px 0rgba(0, 0, 0, 0.08),-3px 0 6px -4px rgba(0, 0, 0, 0.12),-9px 0 28px 8px rgba(0, 0, 0, 0.05)',
        transition: 'all 300ms ease 0ms',
      }
    : {
        right: '-300px',
        display: 'block',
        boxShadow: 'none',
        transition: 'all 300ms ease 0ms',
      };

  return (
    <Drawer
      {...drawerOpenProps}
      className={style.container}
      width={300}
      onClose={() => setOpen(false)}
      placement="right"
      forceRender
      contentWrapperStyle={contentWrapperStyle}
    >
      <Form name="theme" labelCol={{ span: 20 }} wrapperCol={{ span: 4 }} labelAlign="left">
        <Tooltip title="Переключение темы" placement="left">
          <Form.Item label="Темная тема">
            <Switch
              size="small"
              checked={isDarkMode}
              onChange={() => setIsDarkMode((previousValue) => !previousValue)}
            />
          </Form.Item>
        </Tooltip>

        <Tooltip title="Переключить размер компонентов" placement="left">
          <Form.Item label="Маленькие">
            <Switch size="small" checked={isCompact} onChange={() => setIsCompact((previousValue) => !previousValue)} />
          </Form.Item>
        </Tooltip>

        <Space direction="vertical">
          <Text>Основной цвет:</Text>
          <ThemeColor
            colorList={colorList}
            value={colorPrimary}
            onChange={(colorName: string) => setColorPrimary(colorName as TypeItemColorList)}
          />
        </Space>
      </Form>
      <div
        className={style.settingDrawerHandle}
        onClick={() => setOpen(!open)}
        onKeyUp={() => setOpen(!open)}
        role="button"
        tabIndex={0}
        style={{
          backgroundColor: token.colorPrimary,
        }}
      >
        {open ? (
          <CloseOutlined
            style={{
              color: '#fff',
              fontSize: 20,
            }}
          />
        ) : (
          <SettingOutlined
            style={{
              color: '#fff',
              fontSize: 20,
            }}
          />
        )}
      </div>
    </Drawer>
  );
}

export default MySettingDrawer;
