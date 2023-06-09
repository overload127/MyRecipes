import { useAppSelector } from '../../hooks/redux';

import OfflineBar from './OfflineBar/OfflineBar';

import style from './LayoutAreaExtraTop.module.scss';

interface IProps {
  isAbsolute?: boolean;
}

function LayoutAreaExtraTop({ isAbsolute }: IProps): JSX.Element | null {
  const { isBadConnection } = useAppSelector((state) => state.authReducer);

  if (!isBadConnection) {
    return null;
  }

  return (
    <div className={`${style.container} ${isAbsolute && style.absolute}`}>
      <OfflineBar />
    </div>
  );
}

LayoutAreaExtraTop.defaultProps = {
  isAbsolute: false,
};

export default LayoutAreaExtraTop;
