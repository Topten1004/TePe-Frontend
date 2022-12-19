import { ItemData } from './interdental';

export type Wireframe = {
  id?: string;
  teeth?: string;
  visible_btn?: boolean;
  active_brush: ItemData;
  active_step: number;
  selected_opt: string;
  overview_opened: boolean;
  is_reset?: boolean;
  bridge_list: number[];
  missing_list: number[];
  recommended_list: IRecommendBrush[];
};

export interface IRecommendBrush extends ItemData {
  cat_id?: string;
  title?: string;
  description: string;
  cat_img?: string;
}

export interface IWireFrameRefProps {
  call_resetSVG: () => void;
  call_applyPointerEvents: (
    lower_pointer_event: string,
    upper_pointer_event: string
  ) => void;
  call_delete_recommend_brush: (index: number, list: IRecommendBrush[]) => void;
}

export interface WireframeProps extends Wireframe {
  setRecommendedList: (list: IRecommendBrush[]) => void;
  setBridgeList: (el_bridge: number) => void;
  setMissingList: (el_missing: number) => void;
}
