import React from 'react';
import Image from 'next/image';

import { Top } from './components';

import Call from './assets/callMobile.png';
import Up from './assets/up.png';

import styles from './Layout.module.scss';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isTop, setIsTop] = React.useState(true);

  const ref = React.useRef<HTMLDivElement | null>(null);

  const toTop = () => {
    if (ref && ref.current) {
      ref.current?.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });
    }
  };

  const scroll = React.useCallback(() => {
    if (window.scrollY === 0) {
      setIsTop(true);
    } else if (window.scrollY > 0) {
      setIsTop(false);
    }
  }, []);

  React.useEffect(() => {
    scroll();
    window.addEventListener('scroll', scroll);

    return () => {
      window.removeEventListener('scroll', scroll);
    };
  }, []);

  return (
    <main className={styles.main} id="main" ref={ref}>
      <Top />
      {children}
      <a href="tel:+78005553053" className={styles.link}>
        <Image src={Call} alt="Пирс" height={25} />
      </a>
      {!isTop && (
        <button type="button" onClick={toTop} className={styles.toTop}>
          <Image src={Up} alt="Пирс" height={50} />
        </button>
      )}
    </main>
  );
};

export default React.memo(Layout);
