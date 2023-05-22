import React from 'react';

import { Top } from './components';

import styles from './Layout.module.scss';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <main className={styles.main}>
    <Top />
    {children}
  </main>
);

export default React.memo(Layout);
