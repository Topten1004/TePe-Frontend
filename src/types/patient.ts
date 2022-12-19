export type PatientData = {
  email: string;
  phone_number: string;
};

export interface PatientProps extends PatientData {
  setEmail: (email: string) => void;
  setPhoneNumber: (phone_number: string) => void;
}
