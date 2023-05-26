import React, { useContext } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useLocale } from '@utils/useLocale';
import { useClickAway } from '@utils/useClickAway';
import { BreakpointContext } from '@utils/breakpointContext';

import { BigMenu } from './components';

import { ROUTES, SUBROUTES } from './services/constants';

import List from './assets/list.png';

import styles from './Menu.module.scss';

const Menu = () => {
  const [openedMenu, setOpenedMenu] = React.useState<boolean>(false);
  const [openedBigMenu, setOpenedBigMenu] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLButtonElement | null>(null);
  useClickAway(ref, setOpenedMenu);
  const router = useRouter();
  const locale = useLocale();

  const { isMobile } = useContext(BreakpointContext);

  const handleClick = React.useCallback(
    (index: number) => async () => {
      if (!!locale.menu[index].children) {
        setOpenedMenu(true);
      } else {
        await router.push(ROUTES[index]);
      }
    },
    [locale.menu, router]
  );

  const openBigMenu = React.useCallback(() => {
    setOpenedBigMenu(true);
  }, []);

  const closeBigMenu = React.useCallback(() => {
    setOpenedBigMenu(false);
  }, []);

  if (isMobile) {
    return null;
  }

  return (
    <>
      {openedBigMenu && <BigMenu close={closeBigMenu} />}
      <div className={styles.menu}>
        <div>
          <button onClick={openBigMenu} className={styles.bitMenuBtn}>
            <div />
            <div />
            <div />
          </button>
          {locale.menu.map((v, index1) => (
            <button
              key={v.title}
              className={styles.linkWrapper}
              onClick={handleClick(index1)}
              ref={v.children ? ref : undefined}
            >
              <Link className={styles.link} href={ROUTES[index1]}>
                {v.title}
              </Link>
              {v.children && (
                <>
                  <div className={styles.icon}>
                    <Image src={List} alt="ПИРС" height={5} />
                  </div>
                  {openedMenu && (
                    <div className={styles.list}>
                      {v.children.map((vv, index2) => (
                        <Link href={SUBROUTES[index2]} key={vv.title}>
                          {vv.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Menu;
