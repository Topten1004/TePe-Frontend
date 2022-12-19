import React, { useState, useEffect } from 'react';

// Third Party
import { IntlProvider, MessageFormatElement } from 'react-intl';
import useConfig from 'hooks/useConfig';

// Load Locales Files
const loadLocaleData = (locale: string) => {
  switch (locale) {
    case 'sv':
      return import('utils/locales/sv.json');
    case 'da':
      return import('utils/locales/da.json');
    default:
      return import('utils/locales/en.json');
  }
};

// ==============================|| LOCALIZATION ||============================== //

interface LocalsProps {
  children: React.ReactNode;
}

const Locales = ({ children }: LocalsProps) => {
  const { locale } = useConfig();
  const [messages, setMessages] = useState<
    Record<string, string> | Record<string, MessageFormatElement[]> | undefined
  >();

  useEffect(() => {
    loadLocaleData(locale).then(
      (d: {
        default:
          | Record<string, string>
          | Record<string, MessageFormatElement[]>
          | undefined;
      }) => {
        setMessages(d.default);
      }
    );
  }, [locale]);

  return (
    <>
      {messages && (
        <IntlProvider locale={locale} defaultLocale="en" messages={messages}>
          {children}
        </IntlProvider>
      )}
    </>
  );
};

export default Locales;
