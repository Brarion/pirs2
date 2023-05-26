import { FakeComponent, Header, Menu } from './components';

import styles from './Top.module.scss';

const Top = () => {
  return (
    <>
      <FakeComponent />
      <div className={styles.top}>
        <Header />
        <Menu />
      </div>
    </>
  );
};

export default Top;
