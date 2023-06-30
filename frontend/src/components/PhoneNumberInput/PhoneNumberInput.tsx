/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Input, Select } from 'antd';
import { parsePhoneNumber, getCountries, formatPhoneNumberIntl } from 'react-phone-number-input';
import { CountryCode } from 'libphonenumber-js';

import style from './PhoneNumberInput.module.scss';

type PhoneNumberFormItemProps = {
  value: any;
  onChange: (value: any) => void;
};

// source code from https://stackoverflow.com/questions/72818507/using-ant-design-with-react-phone-number-input
function PhoneNumberInput({ value, onChange }: PhoneNumberFormItemProps): JSX.Element {
  const [countryCode, setCountryCode] = useState<CountryCode>();

  useEffect(() => {
    if (value) {
      const parsed = parsePhoneNumber(value);
      setCountryCode(parsed?.country);
    }
  }, [value]);

  const countryOptions: { value: string; label: React.ReactElement }[] = getCountries().map((code) => {
    return {
      value: code,
      label: (
        <span className="phone-icon-container">
          <img src={`/images/flags/${code}.svg`} className={style.countryFlagIcon} />{' '}
          <span className={style.code}>{code}</span>
        </span>
      ),
    };
  });

  function numberInputChanged(phone: string) {
    let parsed = parsePhoneNumber(phone, countryCode);
    //setCountryCode(parsed?.country) // useless if there is useEffect
    if (typeof onChange === 'function') onChange(parsed ? formatPhoneNumberIntl(parsed.number) : phone);
  }

  function selectCountry(code: any) {
    setCountryCode(code);
    const parsed = parsePhoneNumber(value, code);
    if (typeof onChange === 'function') {
      let resultValue = parsed && formatPhoneNumberIntl(parsed.number);
      if (resultValue === undefined) resultValue = '';
      onChange(resultValue);
    }
  }

  return (
    <Input
      className="phone-input-container"
      placeholder="User's phone number"
      onChange={(e) => numberInputChanged(e.target.value)}
      value={value}
      addonBefore={
        <Select
          showSearch
          // work have bug https://github.com/ant-design/ant-design/issues/40205
          options={countryOptions}
          onSelect={selectCountry}
          // value={parsePhoneNumber(value)?.country} //if value === null => crash
          value={countryCode}
          placeholder={<img src="/images/flags/unknown.svg" className={style.unknownCountryFlagIcon} />}
          className={style.sameAsInputPhoneCountrySelect}
        />
      }
    />
  );
}

export default PhoneNumberInput;
