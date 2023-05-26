import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { createPortal } from 'react-dom';
import Image from 'next/image';

import { Locale } from '@utils/useLocale';
import { BreakpointContext } from '@utils/breakpointContext';

import DesktopClose from '../../../../../../../../assets/modal-close.png';
import MobileClose from '../../../../../../../../assets/close-mobile.png';

import styles from './TextModal.module.scss';
import cn from 'classnames';

type Props = {
  high?: boolean;

  close: () => void;
};

const EnglishText = () => (
  <>
    <h1>Consent to the processing of personal data</h1>
    <p>
      I, filling out the form on the site{' '}
      <a href="https://pirs.tech/en/">rcm.reliab.tech/en/</a> , give my consent
      to the administrator of the site{' '}
      <a href="https://pirs.tech/en/">rcm.reliab.tech/en/</a> , in accordance
      with the Federal Law of July 27, 2006, 152-ФЗ On Personal Data, for the
      processing, storage and transfer to third parties of my personal data via
      the Internet. I confirm that I give such consent, acting of my own free
      will and in my interest. The purpose of my personal data is to establish
      communication with the site administrator{' '}
      <a href="https://pirs.tech/en/">rcm.reliab.tech/en/</a> , including
      sending notifications, inquiries regarding the use of the site, the
      provision of services. I hereby acknowledge and confirm that I myself and
      completely bear responsibility for the personal data I have provided,
      including their completeness, reliability, unambiguity and relevance
      directly to me. I confirm that I am familiar with the rights and
      obligations in accordance with the Federal Law “On Personal Data”, incl.
      the procedure for withdrawing consent to the collection and processing of
      personal data.
    </p>
    <h1>Data Processing Policy</h1>
    <p>
      Hereby, in accordance with Federal Law No. 152-ФЗ “On Personal Data” dated
      July 27, 2006, you confirm your consent to the processing of PIRS LLC
      personal data: collection, systematization, accumulation, storage,
      clarification (updating, changing) , use, transfer solely for the purpose
      of selling the software in your name, as described below, blocking,
      depersonalizing, destroying.
    </p>
    <p>
      PIRS LLC guarantees the confidentiality of the information received. The
      processing of personal data is carried out in order to effectively execute
      orders, contracts and other obligations accepted by PIRS LLC as binding.
    </p>
    <p>
      If it is necessary to provide your personal data to the copyright holder,
      distributor or reseller of the software in order to register the software
      in your name, you consent to the transfer of your personal data. PIRS LLC
      guarantees that the copyright holder, distributor or reseller of the
      software protects personal data on terms similar to those set forth in the
      Privacy Policy.
    </p>
    <p>
      This consent extends to the following your personal data: last name, first
      name and patronymic, email address, mailing address for order delivery,
      contact phone number, payment details.
    </p>
    <p>
      The validity of the consent is unlimited. You can revoke this consent at
      any time by sending written notifications to the address: 308034,
      Belgorod, ul. Koroleva, d. 2a, building 2 with the note “Revocation of
      consent to the processing of personal data”.
    </p>
    <p>
      Please note that the withdrawal of consent to the processing of personal
      data entails the deletion of your account from the Internet site (
      <a href="https://pirs.tech/en/">rcm.reliab.tech/en/</a>), as well as the
      destruction of records containing your personal data in the personal data
      processing systems of PIRS LLC, which may make it impossible to use the
      Internet services of PIRS LLC
    </p>
    <p>
      I guarantee that the information presented by me is complete, accurate and
      reliable, and also that the current legislation of the Russian Federation,
      the legal rights and interests of third parties are not violated when
      presenting information. All the information presented is filled by me in
      relation to myself.
    </p>
    <p>
      This consent is valid for the entire period of storage of personal data,
      unless otherwise provided by the legislation of the Russian Federation.
    </p>
  </>
);

const RussianText = () => (
  <>
    <h1>Согласие на обработку персональных данных</h1>
    <p>
      Я, заполняя форму на сайте <a href="https://pirs.tech">rcm.reliab.tech</a>
      , даю свое согласие администратору сайта{' '}
      <a href="https://pirs.tech">rcm.reliab.tech</a>, в соответствии с
      Федеральным законом от 27.07.2006 152-ФЗ «О персональных данных», на
      обработку, хранение и передачу третьим лицам через Интернет моих
      персональных данных. Я подтверждаю, что, даю такое согласие, действуя по
      своей воле и в своем интересе. Целью предоставления мною персональных
      данных является установление связи с администратором сайта{' '}
      <a href="https://pirs.tech">rcm.reliab.tech</a>, включая направление
      уведомлений, запросов, касающихся использования сайта, оказания услуг.
      Настоящим, я признаю и подтверждаю, что я самостоятельно и полностью несу
      ответственность за предоставленные мною персональные данные, включая их
      полноту, достоверность, недвусмысленность и относимость непосредственно ко
      мне. Я подтверждаю, что ознакомлен с правами и обязанностями, в
      соответствии с Федеральным законом «О персональных данных», в т.ч.
      порядком отзыва согласия на сбор и обработку персональных данных.
    </p>
    <h1>Политика в отношении обработки данных</h1>
    <p>
      Настоящим в соответствии с Федеральным законом № 152-ФЗ «О персональных
      данных» от 27.07.2006 года Вы подтверждаете свое согласие на обработку ООО
      «ПИРС» персональных данных: сбор, систематизацию, накопление, хранение,
      уточнение (обновление, изменение), использование, передачу исключительно в
      целях продажи программного обеспечения на Ваше имя, как это описано ниже,
      блокирование, обезличивание, уничтожение.
    </p>
    <p>
      ООО «ПИРС» гарантирует конфиденциальность получаемой информации. Обработка
      персональных данных осуществляется в целях эффективного исполнения
      заказов, договоров и иных обязательств, принятых ООО «ПИРС» в качестве
      обязательных к исполнению.
    </p>
    <p>
      В случае необходимости предоставления Ваших персональных данных
      правообладателю, дистрибьютору или реселлеру программного обеспечения в
      целях регистрации программного обеспечения на ваше имя, вы даёте согласие
      на передачу ваших персональных данных. ООО «ПИРС» гарантирует, что
      правообладатель, дистрибьютор или реселлер программного обеспечения
      осуществляет защиту персональных данных на условиях, аналогичных
      изложенным в Политике конфиденциальности персональных данных.
    </p>
    <p>
      Настоящее согласие распространяется на следующие Ваши персональные данные:
      фамилия, имя и отчество, адрес электронной почты, почтовый адрес доставки
      заказов, контактный телефон, платёжные реквизиты.
    </p>
    <p>
      Срок действия согласия является неограниченным. Вы можете в любой момент
      отозвать настоящее согласие, направив письменное уведомления на адрес:
      308034, г. Белгород, ул. Королёва, д. 2а, корпус 2 с пометкой «Отзыв
      согласия на обработку персональных данных».
    </p>
    <p>
      Обращаем ваше внимание, что отзыв согласия на обработку персональных
      данных влечёт за собой удаление Вашей учётной записи с Интернет-сайта (
      <a href="https://pirs.tech">rcm.reliab.tech</a>), а также уничтожение
      записей, содержащих ваши персональные данные, в системах обработки
      персональных данных ООО «ПИРС», что может сделать невозможным пользование
      интернет-сервисами ООО «ПИРС»
    </p>
    <p>
      Гарантирую, что представленная мной информация является полной, точной и
      достоверной, а также что при представлении информации не нарушаются
      действующее законодательство Российской Федерации, законные права и
      интересы третьих лиц. Вся представленная информация заполнена мною в
      отношении себя лично.
    </p>
    <p>
      Настоящее согласие действует в течение всего периода хранения персональных
      данных, если иное не предусмотрено законодательством Российской Федерации.
    </p>
  </>
);

const TextModal: React.FC<Props> = ({ high, close }) => {
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
          {isRU ? <RussianText /> : <EnglishText />}
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

export default React.memo(TextModal);
