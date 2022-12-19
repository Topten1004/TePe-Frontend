export type InstructionData = {
  id?: string;
  selectedOpt: string;
  comment: string;
};

export interface InstructionProps extends InstructionData {
  setSelectedOpt: (opt: string) => void;
  setComment: (comment: string) => void;
  btnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
