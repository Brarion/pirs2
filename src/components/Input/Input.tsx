import React from 'react';
import Image from 'next/image';
import cn from 'classnames';

import RequiredLogo from './assets/required.png';

import styles from './Input.module.scss';

type Props = {
  value: string;
  placeholder: string;
  required?: boolean;
  error?: boolean;

  onChange: (value: string) => void;
};

const Input: React.FC<Props> = ({
  value,
  placeholder,
  required,
  error,
  onChange,
}) => {
  const change = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  const inputStyles = React.useMemo(
    () => cn(styles.input, { [styles.error]: !!error }),
    [error]
  );

  return (
    <div className={styles.inputWrapper}>
      <input
        value={value}
        onChange={change}
        placeholder={placeholder}
        className={inputStyles}
      />
      {required && (
        <Image
          src={RequiredLogo}
          alt="ПИРС"
          height={8}
          className={styles.logo}
        />
      )}
    </div>
  );
};

export default React.memo(Input);
