import * as React from 'react';

import { useLocalStorage } from 'react-use';

import all_markets from '../data/markets.json';
import all_products from '../data/products-v2.json';

import { CategoryData } from '../types/interdental';
import { MarketData, StorageProps } from '../types/storagecontext';

import useConfig from 'hooks/useConfig';

const StorageContext = React.createContext<Partial<StorageProps> | null>(null);

type Props = {
  children: JSX.Element;
};

export const StorageProvider = ({ children }: Props) => {
  const { onChangeLocale } = useConfig();
  const [ptMarket, setPatientMarket] = useLocalStorage<MarketData>(
    'pt-mark',
    all_markets[0]
  );
  const [ptCats, setPatientCategories] = useLocalStorage<CategoryData[]>(
    'pt-cats',
    []
  );
  const [ptLocale, setPatientLocale] = useLocalStorage<string>(
    'pt-locale',
    'en' || all_markets[0].locales[0]
  );

  const provider = {
    ptMarket,
    ptCats,
    ptLocale,

    ptMarketChange: (market_id: string) => {
      const current_market = all_markets.find(
        market => market.id === market_id
      );

      setPatientLocale(current_market?.locales[0] || 'en');
      onChangeLocale(current_market?.locales[0] || 'en');
      setPatientMarket(current_market);
    },

    ptCatsChange: (cats: Array<string>) => {
      const temp: Array<CategoryData> = [];

      for (const cat of cats) {
        if (cat.search(':') >= 0) {
          const cat_id = cat.slice(0, cat.indexOf(':'));
          const product_id = cat.slice(cat.indexOf(':', cat.length));

          const find_index = temp.findIndex(
            (category: CategoryData) => category?.id === cat_id
          );

          if (find_index !== -1) {
            temp[find_index].data.push(
              all_products[parseInt(cat_id, 10) - 1].data[
                parseInt(product_id, 10) - 1
              ]
            );
          } else {
            const new_cat = {
              id: all_products[parseInt(cat_id, 10) - 1].id,
              title: all_products[parseInt(cat_id, 10) - 1].title,
              catImg: all_products[parseInt(cat_id, 10) - 1].catImg,
              data: [
                all_products[parseInt(cat_id, 10) - 1].data[
                  parseInt(product_id, 10) - 1
                ],
              ],
            };

            temp.push(new_cat);
          }
        } else {
          temp.push(all_products[parseInt(cat, 10) - 1]);
        }
      }

      setPatientCategories([...temp]);
    },

    ptLocaleChange: (sel_locale: string) => {
      setPatientLocale(sel_locale);
      onChangeLocale(sel_locale);
    },
  };

  return (
    <StorageContext.Provider value={provider}>
      {children}
    </StorageContext.Provider>
  );
};

export const usePtStorage = () => React.useContext(StorageContext);
