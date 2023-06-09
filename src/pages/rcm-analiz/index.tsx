import React from 'react';
import Head from 'next/head';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { type GetBreakpoint, getBreakpoint } from '@utils/getBreakpoint';
import { useBreakpoint } from '@utils/useBreakpoint';
import { BreakpointContext } from '@utils/breakpointContext';

import { Layout } from '@components';

import styles from './index.module.scss';
import { useLocale } from '@utils/useLocale';
import {
  Form,
  TextModal,
} from '@components/Layout/components/Top/components/Menu/components/BigMenu/components';
import Image from 'next/image';
import Phone from '@components/Layout/components/Top/components/Menu/components/BigMenu/assets/phone.png';
import Mail from '@components/Layout/components/Top/components/Menu/components/BigMenu/assets/mail.png';

import One from '../../assets/1.png';
import Two from '../../assets/2.png';
import Three from '../../assets/3.png';
import Four from '../../assets/4.png';
import Five from '../../assets/5.png';
import Six from '../../assets/6.png';
import Seven from '../../assets/7.png';

type Props = {
  serverBreakpoint: GetBreakpoint;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
}) => {
  const serverBreakpoint = getBreakpoint(req);

  return {
    props: {
      serverBreakpoint,
    },
  };
};

const Home: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ serverBreakpoint }) => {
  const [textModal, setTextModal] = React.useState(false);
  const [formOpened, setFormOpened] = React.useState(false);

  const breakpoint = useBreakpoint(serverBreakpoint);

  const locale = useLocale();

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

  return (
    <>
      {/*TODO*/}
      <Head>
        <title>{locale.title.analiz.title}</title>
        <meta name="description" content={locale.description.analiz.title} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <BreakpointContext.Provider value={breakpoint}>
        <Layout>
          <div className={styles.main}>
            <div>
              <div className={styles.fake} />
              {/*<Image src={Vnedrenie} alt="Пирс" className={styles.vnedrenie} />*/}
            </div>
            <h1>{locale.analiz.header.first.title}</h1>
            <h2>{locale.analiz.header.second.title}</h2>
            <button onClick={openForm} type="button">
              {locale.analiz.header.btn.title}
            </button>
          </div>
          <div className={styles.content}>
            <h1>{locale.analiz.stages.header.title}</h1>
            <div>
              <div>
                <Image src={One} alt="Пирс" height={50} />
                <h2>{locale.analiz.stages.one.title}</h2>
              </div>
              <div>
                <Image src={Two} alt="Пирс" height={50} />
                <h2>{locale.analiz.stages.two.title}</h2>
              </div>
              <div>
                <Image src={Three} alt="Пирс" height={50} />
                <h2>{locale.analiz.stages.three.title}</h2>
              </div>
              <div>
                <Image src={Four} alt="Пирс" height={50} />
                <h2>{locale.analiz.stages.four.title}</h2>
              </div>
              <div>
                <Image src={Five} alt="Пирс" height={50} />
                <h2>{locale.analiz.stages.five.title}</h2>
              </div>
              <div>
                <Image src={Six} alt="Пирс" height={50} />
                <h2>{locale.analiz.stages.six.title}</h2>
              </div>
              <div>
                <Image src={Seven} alt="Пирс" height={50} />
                <h2>{locale.analiz.stages.seven.title}</h2>
              </div>
            </div>
          </div>
          <div className={styles.partners}>
            <div className={styles.pFake} />
            <div className={styles.wrapper}>
              <h2>{locale.analiz.text.title}</h2>
            </div>
          </div>
          {formOpened && <Form close={closeForm} high />}
          {textModal && <TextModal close={closeTextModal} />}
          <footer className={styles.footer}>
            <div className={styles.fakeFooter} />
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
                <p>{locale.bigMenu.secure.title}</p>
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
        </Layout>
      </BreakpointContext.Provider>
    </>
  );
};

export default Home;
