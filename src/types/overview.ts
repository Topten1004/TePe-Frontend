import { IRecommendBrush } from './wireframe';

export type OverviewData = {
  recommend_list?: IRecommendBrush[];
  deleteBrush: (index: number) => void;
  btnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export type SelectedItemData = {
  id: number;
  recommend_brush?: IRecommendBrush;
  deleteBrush: (index: number) => void;
};

export interface OverviewProps extends OverviewData {}
export interface SelectedItemProps extends SelectedItemData {}
