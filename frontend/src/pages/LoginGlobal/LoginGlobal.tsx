// import { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useAppDispatch } from 'hooks/redux';
// import { loginAuth } from 'store/reducers/auth/ActionCreators';
import CustomCarousel from 'components/CustomCarousel/CustomCarousel';
import FormLogin from 'components/FormLogin/FormLogin';

import style from './LoginGlobal.module.scss';

// interface IState {
//   from?: IFrom;
// }

// interface IFrom {
//   pathname?: string;
// }

function LoginGlobal(): JSX.Element {
  // const [email, setEmail] = useState<string>('');
  // const [password, setPassword] = useState<string>('');
  // const dispatch = useAppDispatch();

  // const navigate = useNavigate();
  // const location = useLocation();
  // const state = location.state as IState;
  // const from = state?.from?.pathname || '/';

  // const handleSubmit = async () => {
  //   const result: boolean = await dispatch(loginAuth(email, password));
  //   if (result) navigate(from, { replace: true });
  // };

  return (
    <div className={style.container}>
      <div className={style.test}>
        <CustomCarousel reverseDirection />
        <CustomCarousel />
      </div>
      <div className={style.formWrapper}>
        <div className={style.formContainer}>
          {/* <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="Email" />
        <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Пароль" />
        <button type="button" onClick={handleSubmit}>
          Логин
        </button> */}
          <FormLogin />
        </div>
      </div>
    </div>
  );
}

export default LoginGlobal;
