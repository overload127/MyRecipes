/* eslint-disable react/jsx-no-constructed-context-values */
import { useState, createContext, Dispatch, SetStateAction } from 'react';
import { ConfigProvider, theme } from 'antd';

export const colorList = {
  techBlue: '#1677FF',
  daybreak: '#1890ff',
  dust: '#F5222D',
  volcano: '#FA541C',
  sunset: '#FAAD14',
  cyan: '#13C2C2',
  green: '#52C41A',
  geekBlue: '#2F54EB',
  purple: '#722ED1',
};

export type TypeItemColorList = keyof typeof colorList;

export type CustomThemeType = {
  isDarkMode: boolean;
  setIsDarkMode: Dispatch<SetStateAction<boolean>>;
  optionColorPrimary: TypeItemColorList;
  setOptionColorPrimary: Dispatch<SetStateAction<TypeItemColorList>>;
  isCompact: boolean;
  setIsCompact: Dispatch<SetStateAction<boolean>>;
};

const customTheme: CustomThemeType = {
  isDarkMode: false,
  setIsDarkMode: () => {},
  optionColorPrimary: 'techBlue',
  setOptionColorPrimary: () => {},
  isCompact: false,
  setIsCompact: () => {},
};

export const ThemeContext = createContext<CustomThemeType>(customTheme);

interface IProps {
  children: JSX.Element;
}

const { defaultAlgorithm, darkAlgorithm, compactAlgorithm } = theme;

export const boxShadowList = {
  isDark:
    '0 6px 16px 0 rgba(255, 255, 255, 0.08), 0 3px 6px -4px rgba(255, 255, 255, 0.12), 0 9px 28px 8px rgba(255, 255, 255, 0.05)',
  isWhite: '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
};

export function ThemeProvider({ children }: IProps) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [optionColorPrimary, setOptionColorPrimary] = useState<TypeItemColorList>('techBlue');
  const [isCompact, setIsCompact] = useState<boolean>(false);
  const currentAlgo = [isDarkMode ? darkAlgorithm : defaultAlgorithm];
  if (isCompact) {
    currentAlgo.push(compactAlgorithm);
  }
  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        setIsDarkMode,
        optionColorPrimary,
        setOptionColorPrimary,
        isCompact,
        setIsCompact,
      }}
    >
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: colorList[optionColorPrimary],
            boxShadow: isDarkMode ? boxShadowList.isDark : boxShadowList.isWhite,
          },
          algorithm: currentAlgo,
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}
