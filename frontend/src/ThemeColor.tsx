import { CheckOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { FC, forwardRef, ForwardRefRenderFunction } from 'react';

export type TagProps = {
  color: string;
  check: boolean;
  className?: string;
  onClick?: () => void;
};

const Tag: FC<TagProps> = forwardRef(({ color, check, ...rest }, ref) => (
  <div {...rest} style={{ backgroundColor: color }} ref={ref as any}>
    {check ? <CheckOutlined /> : ''}
  </div>
));

export type ThemeColorProps = {
  colorList?: {
    key: string;
    color: string;
    title?: string;
  }[];
  value: string;
  onChange: (color: string) => void;
  formatMessage: (data: { id: any; defaultMessage?: string }) => string;
};

const ThemeColor: ForwardRefRenderFunction<HTMLDivElement, ThemeColorProps> = ({
  value,
  colorList,
  onChange,
  formatMessage,
}) => {
  if (!colorList || colorList?.length < 1) {
    return null;
  }
  const baseClassName = 'theme-color';
  return (
    <div className={baseClassName}>
      {colorList?.map(({ key, color, title }) => {
        if (!key) return null;
        return (
          <Tooltip
            key={color}
            title={
              title ??
              formatMessage({
                id: `app.setting.themecolor.${key}`,
              })
            }
          >
            <Tag className="block" color={color} check={value === color} onClick={() => onChange && onChange(color)} />
          </Tooltip>
        );
      })}
    </div>
  );
};

export { ThemeColor };
