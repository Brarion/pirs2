import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import cn from 'classnames';

import { Locale } from '@utils/useLocale';
import { BreakpointContext } from '@utils/breakpointContext';

import DesktopClose from '../../../../../../assets/modal-close.png';
import MobileClose from '../../../../../../assets/close-mobile.png';

import styles from './CallModal.module.scss';

type Props = {
  high?: boolean;

  close: () => void;
};

const CallModal: React.FC<Props> = ({ high, close }) => {
  const router = useRouter();

  const { isMobile } = useContext(BreakpointContext);

  const isRU = React.useMemo(
    () => router.locale === Locale.ru,
    [router.locale]
  );

  const textModalStyles = cn(styles.textModal, { [styles.high]: high });

  return createPortal(
    <div className={textModalStyles}>
      <div className={styles.fake}>
        <div className={styles.textWrapper}>
          <h1>8 800 555 30 53</h1>
          <div />
          <a href="mailto:info@pirs.tech">info@pirs.tech</a>
          <button onClick={close}>
            <Image
              src={isMobile ? MobileClose : DesktopClose}
              alt="ПИРС"
              height={isMobile ? 40 : 22}
            />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default React.memo(CallModal);
