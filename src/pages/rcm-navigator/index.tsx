import React, {useContext} from 'react';
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
import RCMPhoto from "@components/RCM/assets/rcmPhoto.png";
import {Carousel} from "react-bootstrap";
import Left from "@components/RCM/assets/left.png";
import One from "@components/RCM/assets/one.svg";
import Two from "@components/RCM/assets/two.svg";
import Three from "@components/RCM/assets/three.png";
import Four from "@components/RCM/assets/four.svg";
import Five from "@components/RCM/assets/five.svg";

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
  const [index, setIndex] = React.useState(0);
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
        <title>{locale.title.navigator.title}</title>
        <meta name="description" content={locale.description.navigator.title} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <BreakpointContext.Provider value={breakpoint}>
        <Layout>
          <div className={styles.main}>
            <div>
              <div className={styles.fake} />
            </div>
            <h1>{locale.RCMpage.header.first.title}</h1>
            <h2>{locale.RCMpage.header.second.title}</h2>
            <button onClick={openForm} type="button">
              {locale.RCMpage.header.btn.title}
            </button>
          </div>
          <div className={styles.whiteContent}>
            <p>{locale.RCM.text.title}</p>
          </div>
          <div className={styles.content}>
            <h1>{locale.RCMpage.photo.title}</h1>
            <div className={styles.photo}>
              <Image src={RCMPhoto} alt="RCM" />
            </div>
          </div>
          <div className={styles.carouselWrapper}>
            <BreakpointContext.Consumer>
              {({isMobile}) => {
                return isMobile ? (
                    <Carousel
                        activeIndex={index}
                        onSelect={setIndex}
                        interval={null}
                        className={styles.carousel}
                        prevIcon={<Image src={Left} alt="ПИРС" height={60} />}
                        nextIcon={
                          <Image
                              src={Left}
                              alt="ПИРС"
                              height={60}
                              className={styles.next}
                          />
                        }
                    >
                      <Carousel.Item className={styles.item4}>
                        <div>
                          <div />
                        </div>
                      </Carousel.Item>
                      <Carousel.Item className={styles.item5}>
                        <div>
                          <div />
                        </div>
                      </Carousel.Item>
                      <Carousel.Item className={styles.item6}>
                        <div>
                          <div />
                        </div>
                      </Carousel.Item>
                      <Carousel.Item className={styles.item7}>
                        <div>
                          <div />
                        </div>
                      </Carousel.Item>
                      <Carousel.Item className={styles.item8}>
                        <div>
                          <div />
                        </div>
                      </Carousel.Item>
                      <Carousel.Item className={styles.item9}>
                        <div>
                          <div />
                        </div>
                      </Carousel.Item>
                      <Carousel.Item className={styles.item10}>
                        <div>
                          <div />
                        </div>
                      </Carousel.Item>
                      <Carousel.Item className={styles.item11}>
                        <div>
                          <div />
                        </div>
                      </Carousel.Item>
                      <Carousel.Item className={styles.item12}>
                        <div>
                          <div />
                        </div>
                      </Carousel.Item>
                    </Carousel>
                ) : (
                    <Carousel
                        activeIndex={index}
                        onSelect={setIndex}
                        interval={null}
                        className={styles.carousel}
                        prevIcon={<Image src={Left} alt="ПИРС" height={60} />}
                        nextIcon={
                          <Image
                              src={Left}
                              alt="ПИРС"
                              height={60}
                              className={styles.next}
                          />
                        }
                    >
                      <Carousel.Item className={styles.item1}>
                        <div>
                          <div />
                          <div />
                          <div />
                        </div>
                      </Carousel.Item>
                      <Carousel.Item className={styles.item2}>
                        <div>
                          <div />
                          <div />
                          <div />
                        </div>
                      </Carousel.Item>
                      <Carousel.Item className={styles.item3}>
                        <div>
                          <div />
                          <div />
                          <div />
                        </div>
                      </Carousel.Item>
                    </Carousel>
                )
              }}
            </BreakpointContext.Consumer>
          </div>
          <div className={styles.content}>
            <h1>{locale.RCMpage.cool.header.title}</h1>
            <div className={styles.cool}>
              <div>
                <h2>1</h2>
                <p>{locale.RCMpage.cool.list.one.title}</p>
              </div>
              <div>
                <h2>2</h2>
                <p>{locale.RCMpage.cool.list.two.title}</p>
              </div>
              <div>
                <h2>3</h2>
                <p>{locale.RCMpage.cool.list.three.title}</p>
              </div>
              <div>
                <h2>4</h2>
                <p>{locale.RCMpage.cool.list.four.title}</p>
              </div>
            </div>
          </div>
          <div className={styles.partners}>
            <div className={styles.pFake} />
            <div className={styles.wrapper}>
              <h1>{locale.RCMpage.function.header.title}</h1>
              <div>
                <div>
                  <i />
                  <p>{locale.RCMpage.function.one.title}</p>
                </div>
                <div>
                  <i />
                  <p>{locale.RCMpage.function.two.title}</p>
                </div>
                <div>
                  <i />
                  <p>{locale.RCMpage.function.three.title}</p>
                </div>
                <div>
                  <i />
                  <p>{locale.RCMpage.function.four.title}</p>
                </div>
                <div>
                  <i />
                  <p>{locale.RCMpage.function.five.title}</p>
                </div>
                <div>
                  <i />
                  <p>{locale.RCMpage.function.six.title}</p>
                </div>
                <div>
                  <i />
                  <p>{locale.RCMpage.function.seven.title}</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.content}>
            <h1>{locale.RCMpage.benefits.header.title}</h1>
            <div className={styles.benefits}>
              <div>
                <div className={styles.fake} />
                <div className={styles.fake1} />
                <p>{locale.RCMpage.benefits.list.one.title}</p>
              </div>
              <div>
                <div className={styles.fake} />
                <div className={styles.fake1} />
                <p>{locale.RCMpage.benefits.list.two.title}</p>
              </div>
              <div>
                <div className={styles.fake} />
                <div className={styles.fake1} />
                <p>{locale.RCMpage.benefits.list.three.title}</p>
              </div>
              <div>
                <div className={styles.fake} />
                <div className={styles.fake1} />
                <p>{locale.RCMpage.benefits.list.four.title}</p>
              </div>
              <div>
                <div className={styles.fake} />
                <div className={styles.fake1} />
                <p>{locale.RCMpage.benefits.list.five.title}</p>
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
