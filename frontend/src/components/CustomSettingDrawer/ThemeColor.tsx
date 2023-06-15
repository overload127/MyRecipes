import { CheckOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import React from 'react';
import style from './ThemeColor.module.scss';

type TagProps = {
  color: string;
  check: boolean;
  className?: string;
  onClick?: () => void;
};

const Tag = React.forwardRef(
  ({ color, check, ...rest }: TagProps, ref: React.ForwardedRef<HTMLDivElement>): JSX.Element => {
    return (
      <div {...rest} style={{ backgroundColor: color }} ref={ref}>
        {check ? <CheckOutlined /> : ''}
      </div>
    );
  },
);

Tag.defaultProps = {
  className: '',
  onClick: () => {},
};

export type ThemeColorProps = {
  colorList: { [key: string]: string };
  value: string;
  onChange: (color: string) => void;
};

function ThemeColor({ value, colorList, onChange }: ThemeColorProps): React.ReactElement<HTMLDivElement> | null {
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
}

export default ThemeColor;
