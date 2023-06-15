import { useState, useContext } from 'react';
import { theme, Drawer, Switch, Tooltip, Form, Typography, Space } from 'antd';
import { CloseOutlined, SettingOutlined } from '@ant-design/icons';
import { colorList, TypeItemColorList, ThemeContext } from 'context/Theme';
import ThemeColor from './ThemeColor';
import style from './CustomSettingDrawer.module.scss';

const { useToken } = theme;
const { Text } = Typography;

function CustomSettingDrawer(): JSX.Element {
  const { isDarkMode, setIsDarkMode, isCompact, setIsCompact, optionColorPrimary, setOptionColorPrimary } =
    useContext(ThemeContext);

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
            value={optionColorPrimary}
            onChange={(colorName: string) => setOptionColorPrimary(colorName as TypeItemColorList)}
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
          height: token.controlHeight * 1.5,
          width: token.controlHeight * 1.5,
        }}
      >
        {open ? (
          <CloseOutlined
            style={{
              color: '#fff',
              fontSize: token.fontSize * 1.42,
            }}
          />
        ) : (
          <SettingOutlined
            style={{
              color: '#fff',
              fontSize: token.fontSize * 1.42,
            }}
          />
        )}
      </div>
    </Drawer>
  );
}

export default CustomSettingDrawer;
