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
        <title>{locale.title.education.title}</title>
        <meta name="description" content={locale.description.education.title} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <BreakpointContext.Provider value={breakpoint}>
        <Layout>
          <div className={styles.main}>
            <div>
              <div className={styles.fake} />
            </div>
            <h1>{locale.education.header.first.title}</h1>
            <h2>{locale.education.header.second.title}</h2>
            <button onClick={openForm} type="button">
              {locale.education.header.btn.title}
            </button>
          </div>
          <div className={styles.whiteContent}>
            <h1>{locale.education.white.target.header.title}</h1>
            <p>{locale.education.white.target.text.title}</p>
            <h1>{locale.education.white.about.header.title}</h1>
            <p>{locale.education.white.about.text.title}</p>
          </div>
          <div className={styles.content}>
            <h1>{locale.education.gray.header.title}</h1>
            <div>
              <div>
                <h2>{locale.education.gray.list.one.header.title}</h2>
                <p>{locale.education.gray.list.one.text.one.title}</p>
                <p>{locale.education.gray.list.one.text.two.title}</p>
                <p>{locale.education.gray.list.one.text.three.title}</p>
              </div>
              <div>
                <h2>{locale.education.gray.list.two.header.title}</h2>
                <p>{locale.education.gray.list.two.text.one.title}</p>
                <p>{locale.education.gray.list.two.text.two.title}</p>
                <p>{locale.education.gray.list.two.text.three.title}</p>
                <p>{locale.education.gray.list.two.text.four.title}</p>
              </div>
              <div>
                <h2>{locale.education.gray.list.three.header.title}</h2>
                <p>{locale.education.gray.list.three.text.one.title}</p>
                <p>{locale.education.gray.list.three.text.two.title}</p>
                <p>{locale.education.gray.list.three.text.three.title}</p>
              </div>
              <div>
                <h2>{locale.education.gray.list.four.header.title}</h2>
                <p>{locale.education.gray.list.four.text.one.title}</p>
                <p>{locale.education.gray.list.four.text.two.title}</p>
                <p>{locale.education.gray.list.four.text.three.title}</p>
              </div>
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
