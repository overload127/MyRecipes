import { useState } from 'react';
import { theme } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { headerHeight } from 'settings/valuesConst';

import style from './ButtonSearch.module.scss';

function ButtonSearch() {
  const [useInput, setUseInput] = useState(false);
  const {
    token: { controlHeight, fontSize },
  } = theme.useToken();
  return (
    <form className={style.container}>
      <button
        type="button"
        className={style.button}
        style={{
          height: controlHeight * headerHeight,
          minWidth: controlHeight * headerHeight,
        }}
        onClick={() => {
          setUseInput(true);
        }}
      >
        <SearchOutlined />
      </button>
      <input
        style={{ lineHeight: `${fontSize}px` }}
        className={`${style.textInput} ${useInput && style.display}`}
        onBlur={() => {
          setUseInput(false);
        }}
      />
    </form>
  );
}

export default ButtonSearch;
