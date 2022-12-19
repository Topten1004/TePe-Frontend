export type SummeryData = {
  email: string;
  phone_number: string;
  comment: string;
  bridge_list: number[];
  missing_list: number[];
};

export interface SummeryProps extends SummeryData {}
