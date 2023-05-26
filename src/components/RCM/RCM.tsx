import React, { useContext } from 'react';
import Image from 'next/image';
import { Carousel } from 'react-bootstrap';
import Link from 'next/link';

import { useLocale } from '@utils/useLocale';
import { BreakpointContext } from '@utils/breakpointContext';

import RCMPhoto from './assets/rcmPhoto.png';
import Left from './assets/left.png';

import One from './assets/one.svg';
import Two from './assets/two.svg';
import Three from './assets/three.png';
import Four from './assets/four.svg';
import Five from './assets/five.svg';

import styles from './RCM.module.scss';

const RCM = () => {
  const [index, setIndex] = React.useState(0);
  const locale = useLocale();

  const { isMobile } = useContext(BreakpointContext);

  return (
    <>
      <div className={styles.rcm}>
        <h1>{locale.RCM.header.title}</h1>
        <h2>{locale.RCM.photo.title}</h2>
        <h3>{locale.RCM.text.title}</h3>
        <div className={styles.photo}>
          <Image src={RCMPhoto} alt="RCM" />
        </div>
      </div>
      <div className={styles.carouselWrapper}>
        {isMobile ? (
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
        )}
      </div>
      <div className={styles.rcm}>
        <h1 className={styles.margin}>{locale.RCM.product.title}</h1>
        <div className={styles.list}>
          <div>
            <div className={styles.fake} />
            <div className={styles.fake1} />
            <div>
              <div>
                <h1>{locale.RCM.list.one.title}</h1>
                <h2>{locale.RCM.list.oneText.title}</h2>
              </div>
              <Link href="/rcm-navigator" className={styles.a}>
                {locale.RCM.list.oneBtn.title}
              </Link>
            </div>
          </div>
          <div>
            <div className={styles.fake} />
            <div className={styles.fake1} />
            <div>
              <div>
                <h1>{locale.RCM.list.two.title}</h1>
                <h2>{locale.RCM.list.twoText.title}</h2>
              </div>
              <Link href="/obuchenie-metodologii-rcm" className={styles.a}>
                {locale.RCM.list.twoBtn.title}
              </Link>
            </div>
          </div>
          <div>
            <div className={styles.fake} />
            <div className={styles.fake1} />
            <div>
              <div>
                <h1>{locale.RCM.list.three.title}</h1>
                <h2>{locale.RCM.list.threeText.title}</h2>
              </div>
              <Link href="/rcm-analiz" className={styles.a}>
                {locale.RCM.list.threeBtn.title}
              </Link>
            </div>
          </div>
          <div>
            <div className={styles.fake} />
            <div className={styles.fake1} />
            <div>
              <div>
                <h1>{locale.RCM.list.four.title}</h1>
                <h2>{locale.RCM.list.fourText.title}</h2>
              </div>
              <Link href="/vnedrenie-po" className={styles.a}>
                {locale.RCM.list.fourBtn.title}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.partners}>
        <div className={styles.pFake} />
        <div className={styles.wrapper}>
          <h1>{locale.RCM.partner.header.title}</h1>
          <div>
            <div>
              <Image src={One} alt="Пирс" height={80} width={80} />
              <p>{locale.RCM.partner.list.one.title}</p>
            </div>
            <div>
              <Image src={Two} alt="Пирс" height={80} width={80} />
              <p>{locale.RCM.partner.list.two.title}</p>
            </div>
            <div>
              <Image src={Three} alt="Пирс" height={80} width={80} />
              <p>{locale.RCM.partner.list.three.title}</p>
            </div>
            <div>
              <Image src={Four} alt="Пирс" height={80} width={80} />
              <p>{locale.RCM.partner.list.four.title}</p>
            </div>
            <div>
              <Image src={Five} alt="Пирс" height={80} width={80} />
              <p>{locale.RCM.partner.list.five.title}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RCM;
