import AppRoutes from 'routes/AppRoutes';
import style from './ContentWrapper.module.scss';

function ContentWrapper(): JSX.Element {
  return (
    <div className={style.container}>
      <AppRoutes />
    </div>
  );
}

export default ContentWrapper;
