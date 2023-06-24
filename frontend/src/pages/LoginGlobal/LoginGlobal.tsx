import { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from 'hooks/redux';
import { useElementSize } from 'usehooks-ts';
import { ThemeContext } from 'context/Theme';
import CustomCarousel from 'components/CustomCarousel/CustomCarousel';
import FormLogin from 'components/FormLogin/FormLogin';

import style from './LoginGlobal.module.scss';

type FromType = {
  pathname?: string;
};

type StateType = {
  from?: FromType;
};

function LoginGlobal(): JSX.Element {
  const { isAnonym } = useAppSelector((state) => state.authReducer.user);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const state = location.state as StateType;
    const from = state?.from?.pathname || '/';
    if (!isAnonym) navigate(from, { replace: true });
  }, [isAnonym, navigate, location]);

  const [squareRef, { height }] = useElementSize();
  const { isDarkMode } = useContext(ThemeContext);

  const boxShadow = isDarkMode ? '5px 5px 50px rgba(255, 255, 255, 0.5)' : '20px 20px 50px rgba(0, 0, 0, 0.5)';

  return (
    <div className={style.container} ref={squareRef}>
      <div className={style.backgroundContainer}>
        <CustomCarousel reverseDirection />
        {height > 650 && <CustomCarousel />}
      </div>
      <div className={style.formWrapper} style={{ boxShadow }}>
        <div className={style.formContainer}>
          <FormLogin />
        </div>
      </div>
    </div>
  );
}

export default LoginGlobal;
