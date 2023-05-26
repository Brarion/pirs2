import React from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Locale, useLocale } from '@utils/useLocale';

import Logo from '../../../../assets/logo.png';
import LogoPier from '../../../../assets/pier.png';
import CloseMobileMenu from './assets/closeMobileMenu.png';
import LocaleIcon from '../../assets/locale.svg';

import styles from './MobileMenu.module.scss';
import Link from 'next/link';

type Props = {
  close: () => void;
};

const MobileMenu: React.FC<Props> = ({ close }) => {
  const [opened, setOpened] = React.useState(false);

  const router = useRouter();
  const locale = useLocale();

  React.useEffect(() => {
    setOpened(true);
  }, []);

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

  const modalStyles = cn(styles.modal, { [styles.opened]: opened });

  const onClick = React.useCallback(() => {
    setOpened(false);

    setTimeout(close, 600);
  }, [close]);

  const toRU = React.useCallback(async () => {
    await router.push(router.pathname, '', { locale: Locale.ru });
  }, [router]);

  const toEN = React.useCallback(async () => {
    await router.push(router.pathname, '', { locale: Locale.en });
  }, [router]);

  const toMain = React.useCallback(async () => {
    await router.push('/', '', { locale: router.locale });
  }, [router]);

  return createPortal(
    <div className={modalStyles}>
      <header>
        <button onClick={toMain} type="button">
          <Image src={isRU ? Logo : LogoPier} alt="Пирс" height={56} />
        </button>
        <button type="button" onClick={onClick}>
          <Image src={CloseMobileMenu} alt="Пирс" height={25} />
        </button>
      </header>
      <main>
        <div className={styles.center}>
          <div className={styles.list}>
            <Link href="/about">{locale.menu[0].title}</Link>
            <Link href="/services">{locale.menu[1].title}</Link>
            {locale.menu[1].children && (
              <div>
                <Link href="/rcm-navigator">
                  {locale.menu[1].children[0].title}
                </Link>
                <Link href="/vnedrenie-po">
                  {locale.menu[1].children[1].title}
                </Link>
                <Link href="/obuchenie-metodologii-rcm">
                  {locale.menu[1].children[2].title}
                </Link>
                <Link href="/rcm-analiz">
                  {locale.menu[1].children[3].title}
                </Link>
              </div>
            )}
            <Link href="/portfolio">{locale.menu[2].title}</Link>
            <Link href="/contacts">{locale.menu[3].title}</Link>
          </div>
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
        <footer>
          <a href="tel:+78005553053">8 800 555 30 53</a>
        </footer>
      </main>
    </div>,
    document.body
  );
};

export default React.memo(MobileMenu);
