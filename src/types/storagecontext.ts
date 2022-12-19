import { CategoryData } from './interdental';

export type MarketData = {
  id: string;
  country: string;
  locales: Array<string>;
  cta_url: string;
  sender_phone: string;
  banners: {
    headings: {
      first: any;
      second: any;
    };
    contents: {
      first: any;
      second: any;
    };
    images: {
      first: string;
      second: string;
    };
  };
  categories: {
    include: Array<string>;
  };
};

export type StorageData = {
  ptMarket: MarketData;
  ptLocale: string;
  ptCats: CategoryData[];
};

export interface StorageProps extends StorageData {
  ptMarketChange: (market_id: string) => void;
  ptLocaleChange: (local: string) => void;
  ptCatsChange: (cats: Array<string>) => void;
}
