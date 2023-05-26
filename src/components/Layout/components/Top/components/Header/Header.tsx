import React, { useContext } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import cn from 'classnames';

import { BreakpointContext } from '@utils/breakpointContext';
import { Breakpoint } from '@utils/getBreakpoint';
import { Locale } from '@utils/useLocale';

import { Form } from '@components/Layout/components/Top/components/Menu/components/BigMenu/components';
import { CallModal, MobileMenu } from './components';

import Logo from '../../assets/logo.png';
import LogoPier from '../../assets/pier.png';
import Callback from './assets/callback.png';
import LocaleIcon from './assets/locale.svg';
import Call from './assets/call.png';

import styles from './Header.module.scss';

const ICON_HEIGHTS = {
  [Breakpoint.Mobile]: 40,
  [Breakpoint.Tablet]: 65,
  [Breakpoint.Desktop]: 70,
};

const Header = () => {
  const [formOpened, setFormOpened] = React.useState(false);
  const [openedCall, setOpenedCall] = React.useState(false);
  const [openedMobileMenu, setOpenedMobileMenu] = React.useState(false);

  const { breakpoint, isMobile } = useContext(BreakpointContext);

  const router = useRouter();

  const toRU = React.useCallback(async () => {
    await router.push(router.pathname, '', { locale: Locale.ru });
  }, [router]);

  const toEN = React.useCallback(async () => {
    await router.push(router.pathname, '', { locale: Locale.en });
  }, [router]);

  const toMain = React.useCallback(async () => {
    await router.push('/', '', { locale: router.locale });
  }, [router]);

  const isRU = React.useMemo(
    () => router.locale === Locale.ru,
    [router.locale]
  );

  const btnStylesRU = React.useMemo(
    () => cn({ [styles.isActive]: isRU }),
    [isRU]
  );

  const btnStylesEN = React.useMemo(
    () => cn({ [styles.isActive]: !isRU }),
    [isRU]
  );

  const openForm = React.useCallback(() => {
    setFormOpened(true);
  }, []);

  const closeForm = React.useCallback(() => {
    setFormOpened(false);
  }, []);

  const call = React.useCallback(() => {
    setOpenedCall(true);
  }, []);

  const callClose = React.useCallback(() => {
    setOpenedCall(false);
  }, []);

  const openMobileMenu = React.useCallback(() => {
    setOpenedMobileMenu(true);
  }, []);

  const closeMobileMenu = React.useCallback(() => {
    setOpenedMobileMenu(false);
  }, []);

  return (
    <>
      {openedCall && <CallModal close={callClose} high />}
      {openedMobileMenu && <MobileMenu close={closeMobileMenu} />}
      {formOpened && <Form close={closeForm} high />}
      <header className={styles.header}>
        {!isMobile ? (
          <>
            <button onClick={toMain}>
              <Image
                src={isRU ? Logo : LogoPier}
                alt="Пирс"
                height={ICON_HEIGHTS[breakpoint]}
              />
            </button>
            <div className={styles.rightSide}>
              <div>
                <a href="tel:+78005553053">8 800 555 30 53</a>
                <a href="mailto:info@pirs.tech">info@pirs.tech</a>
              </div>
              <button type="button" onClick={openForm}>
                <Image src={Callback} alt="Звонок" height={24} />
              </button>
              <div>
                <Image src={LocaleIcon} alt="ПИРС" height={20} />
                <button className={btnStylesRU} onClick={toRU}>
                  RU
                </button>
                <button className={btnStylesEN} onClick={toEN}>
                  EN
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.mobile}>
            <button type="button" onClick={openMobileMenu}>
              <div />
              <div />
              <div />
            </button>
            <Image src={isRU ? Logo : LogoPier} alt="Пирс" height={40} />
            <button type="button" onClick={call}>
              <Image src={Call} alt="Пирс" height={24} />
            </button>
          </div>
        )}
      </header>
    </>
  );
};
export default Header;
