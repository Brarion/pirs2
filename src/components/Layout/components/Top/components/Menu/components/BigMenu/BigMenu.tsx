import Image from 'next/image';
import React from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { Locale, useLocale } from '@utils/useLocale';

import { ROUTES, SUBROUTES } from '../../services/constants';

import { Form, TextModal } from './components';

import Logo from '../../../../assets/logo.png';
import LogoPier from '../../../../assets/pier.png';
import Close from './assets/close.png';
import Phone from './assets/phone.png';
import Mail from './assets/mail.png';

import styles from './BigMenu.module.scss';

type Props = {
  close: () => void;
};

const BigMenu: React.FC<Props> = ({ close }) => {
  const [textModal, setTextModal] = React.useState(false);
  const [formOpened, setFormOpened] = React.useState(false);
  const router = useRouter();

  const locale = useLocale();

  React.useEffect(() => {
    const main = document.getElementById('main');

    if (main) {
      main.style.filter = 'blur(10px)';
    }

    return () => {
      if (main) {
        main.style.filter = 'none';
      }
    };
  }, []);

  const isRU = React.useMemo(
    () => router.locale === Locale.ru,
    [router.locale]
  );

  const openTextModal = React.useCallback(() => {
    setTextModal(true);
  }, []);

  const closeTextModal = React.useCallback(() => {
    setTextModal(false);
  }, []);

  const openForm = React.useCallback(() => {
    setFormOpened(true);
  }, []);

  const closeForm = React.useCallback(() => {
    setFormOpened(false);
  }, []);

  return createPortal(
    <>
      {formOpened && <Form close={closeForm} />}
      {textModal && <TextModal close={closeTextModal} />}
      <div className={styles.modal}>
        <header>
          <Image src={isRU ? Logo : LogoPier} alt="ПИРС" height={70} />
          <button onClick={close}>
            <Image src={Close} alt="ПИРС" height={44} />
          </button>
        </header>
        <main>
          <div>
            <Link href={ROUTES[0]}>{locale.menu[0].title}</Link>
            <Link href={ROUTES[3]}>{locale.menu[3].title}</Link>
          </div>
          <div>
            <Link href={ROUTES[1]}>{locale.menu[1].title}</Link>
            {locale.menu[1].children && (
              <div>
                <Link href={SUBROUTES[0]}>
                  {locale.menu[1].children[0].title}
                </Link>
                <Link href={SUBROUTES[1]}>
                  {locale.menu[1].children[1].title}
                </Link>
                <Link href={SUBROUTES[2]}>
                  {locale.menu[1].children[2].title}
                </Link>
                <Link href={SUBROUTES[3]}>
                  {locale.menu[1].children[3].title}
                </Link>
              </div>
            )}
            <Link href={ROUTES[2]}>{locale.menu[2].title}</Link>
          </div>
        </main>
        <footer>
          <div className={styles.divider} />
          <div className={styles.grid}>
            <div>
              <div>
                <Image src={Phone} alt="88005553053" height={15} />
                <a href="tel:+78005553053">8 800 555 30 53</a>
              </div>
              <button onClick={openForm}>{locale.bigMenu.call.title}</button>
            </div>
            <div>
              <p>{locale.bigMenu.text.title}</p>
              <button onClick={openTextModal}>
                {locale.bigMenu.link.title}
              </button>
            </div>
            <div>
              <Image src={Mail} alt="info@pirs.tech" height={12} />
              <a href="mailto:info@pirs.tech">info@pirs.tech</a>
            </div>
          </div>
        </footer>
      </div>
    </>,
    document.body
  );
};

export default React.memo(BigMenu);
