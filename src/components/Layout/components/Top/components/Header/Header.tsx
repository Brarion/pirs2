import React, { useContext } from 'react';

import { BreakpointContext } from '@utils/breakpointContext';

import styles from './Header.module.scss';
import { Breakpoint } from '@utils/getBreakpoint';
import Image from 'next/image';
import Logo from './assets/logo.png';

const ICON_HEIGHTS = {
  [Breakpoint.Mobile]: 40,
  [Breakpoint.Tablet]: 65,
  [Breakpoint.Desktop]: 70,
};

const Header = () => {
  const { breakpoint } = useContext(BreakpointContext);

  return (
    <header className={styles.header}>
      <Image src={Logo} alt="Пирс" height={ICON_HEIGHTS[breakpoint]} />
      <div className={styles.rightSide}></div>
    </header>
  );
};
export default Header;
