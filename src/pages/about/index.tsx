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
        <title>{locale.title.about.title}</title>
        <meta name="description" content={locale.description.about.title} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <BreakpointContext.Provider value={breakpoint}>
        <Layout>
          <div className={styles.main}>
            <div>
              <div className={styles.fake} />
              <iframe
                src="https://www.youtube.com/embed/d5gSJcJh93U?rel=0&mute=1&controls=0&loop=1&showinfo=0&autoplay=1&playlist=d5gSJcJh93U"
                allowFullScreen
              />
            </div>
            <h1>{locale.menu[0].title}</h1>
          </div>
          <div className={styles.content}>
            <h3>{locale.about.text1.title}</h3>
            <ul>
              <li>{locale.about.list.one.title}</li>
              <li>{locale.about.list.two.title}</li>
              <li>{locale.about.list.three.title}</li>
              <li>{locale.about.list.four.title}</li>
              <li>{locale.about.list.five.title}</li>
            </ul>
            <h1>{locale.about.text2.title}</h1>
            <h3>{locale.about.text3.title}</h3>
          </div>
          {formOpened && <Form close={closeForm} />}
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
