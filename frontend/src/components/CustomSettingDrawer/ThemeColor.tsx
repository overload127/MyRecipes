import { CheckOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import React from 'react';
import style from './ThemeColor.module.scss';

export type TagProps = {
  color: string;
  check: boolean;
  className?: string;
  onClick?: () => void;
};

const Tag: React.FC<TagProps> = React.forwardRef(({ color, check, ...rest }, ref) => (
  <div {...rest} style={{ backgroundColor: color }} ref={ref as any}>
    {check ? <CheckOutlined /> : ''}
  </div>
));

export type ThemeColorProps = {
  colorList: { [key: string]: string };
  value: string;
  onChange: (color: string) => void;
};

const ThemeColor: React.ForwardRefRenderFunction<HTMLDivElement, ThemeColorProps> = ({
  value,
  colorList,
  onChange,
}) => {
  if (!colorList || Object.keys(colorList).length < 1) {
    return null;
  }
  const items = Object.keys(colorList).map((colorName) => {
    const color = colorList[colorName];
    return (
      <Tooltip key={colorName}>
        <Tag
          color={color}
          check={value === colorName}
          onClick={() => onChange(colorName)}
          className={style.container}
        />
      </Tooltip>
    );
  });
  return <div className="dadsda">{items}</div>;
};

export default ThemeColor;
