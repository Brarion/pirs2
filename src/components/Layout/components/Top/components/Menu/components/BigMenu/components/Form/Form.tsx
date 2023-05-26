import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import cn from 'classnames';

import { Locale, useLocale } from '@utils/useLocale';
import { BreakpointContext } from '@utils/breakpointContext';

import { Input } from '@components';
import { TextModal } from '../TextModal';

import DesktopClose from '../../../../../../../../assets/modal-close.png';
import MobileClose from '../../../../../../../../assets/close-mobile.png';
import Checkbox from './assets/checkbox.png';

import styles from './Form.module.scss';

type Props = {
  high?: boolean;

  close: () => void;
};

type Form = {
  name: string;
  phone: string;
  email: string;
  checkbox: boolean;
};

const INITIAL_VALUE: Form = {
  name: '',
  phone: '',
  email: '',
  checkbox: false,
};

type OwnError = {
  email: boolean;
  checkbox: boolean;
};

const INITIAL_VALUE_ERROR: OwnError = {
  email: false,
  checkbox: false,
};

const Form: React.FC<Props> = ({ high, close }) => {
  const [openedBigText, setOpenedBigText] = React.useState(false);
  const [form, setForm] = React.useState<Form>(INITIAL_VALUE);
  const [error, setError] = React.useState<OwnError>(INITIAL_VALUE_ERROR);
  const router = useRouter();
  const locale = useLocale();

  const { isMobile } = useContext(BreakpointContext);

  const isRU = React.useMemo(
    () => router.locale === Locale.ru,
    [router.locale]
  );

  const setValue = React.useCallback(
    (key: keyof Form) => (value: string | boolean) => {
      if (key === 'email') {
        setError((e) => ({ ...e, email: false }));
      }
      setForm((f) => ({ ...f, [key]: value }));
    },
    []
  );

  const checkboxStyles = React.useMemo(
    () => cn(styles.checkbox, { [styles.error]: error.checkbox }),
    [error]
  );

  const submit = React.useCallback(() => {
    let errors = error;
    if (form.email === '' || !form.email.includes('@')) {
      errors = { ...errors, email: true };
    }

    if (!form.checkbox) {
      errors = { ...errors, checkbox: true };
    }

    setError(errors);

    if (!errors.checkbox && !errors.email) {
      console.log(form);
    }
  }, [error, form]);

  const spanClick = React.useCallback(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      e.stopPropagation();

      setOpenedBigText(true);
    },
    []
  );

  const textModalStyles = cn(styles.textModal, { [styles.high]: high });

  return createPortal(
    <>
      {openedBigText && (
        <TextModal close={() => setOpenedBigText(false)} high={high} />
      )}
      <div className={textModalStyles}>
        <div className={styles.fake}>
          <div className={styles.textWrapper}>
            <h1>{locale.form.header.title}</h1>
            <h2>{locale.form.text.title}</h2>
            <div>
              <Input
                value={form.name}
                onChange={setValue('name')}
                placeholder={locale.form.inputs.name.title}
              />
              <Input
                value={form.phone}
                onChange={setValue('phone')}
                placeholder={locale.form.inputs.phone.title}
              />
              <Input
                value={form.email}
                onChange={setValue('email')}
                placeholder={locale.form.inputs.email.title}
                required
                error={error.email}
              />
              <button type="button" onClick={submit} className={styles.btn}>
                {locale.form.inputs.button.title}
              </button>
              <button
                className={checkboxStyles}
                onClick={() => {
                  setError((e) => ({ ...e, checkbox: false }));
                  setForm((f) => ({ ...f, checkbox: !f.checkbox }));
                }}
              >
                <div className={form.checkbox ? styles.checked : undefined}>
                  {!error.checkbox && (
                    <Image src={Checkbox} alt="ПИРС" width={15} />
                  )}
                </div>
                <label>
                  <span>{locale.form.inputs.checkbox.title}</span>{' '}
                  <span onClick={spanClick}>{locale.form.rules.title}</span>
                </label>
              </button>
            </div>
            <button onClick={close} className={styles.close} type="button">
              <Image
                src={isMobile ? MobileClose : DesktopClose}
                alt="ПИРС"
                height={isMobile ? 40 : 22}
              />
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

export default React.memo(Form);
