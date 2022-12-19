// Material-UI
import { Container, FormHelperText, TextField } from '@mui/material';

import { usePtStorage } from 'contexts/StorageContext';
import { StorageProps } from 'types/storagecontext';

// Third Party
import { FormattedMessage } from 'react-intl';
import dictionaryList from 'utils/locales';
import { ValidationGroup, Validate } from 'mui-validate';

import { PatientProps } from 'types/patient';

// =============================|| INSTRUCTION ||============================= //

const PatInformation = ({
  email,
  phone_number,
  setEmail,
  setPhoneNumber,
}: PatientProps) => {
  const { ptLocale } = usePtStorage() as StorageProps;

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  return (
    <Container className="pat-container">
      <ValidationGroup>
        <>
          <FormHelperText className="title">
            <FormattedMessage id="email" />
          </FormHelperText>
          <Validate
            name="val_email"
            regex={[
              /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
              `${dictionaryList[`${ptLocale}`].validate_email}`,
            ]}
          >
            <TextField
              fullWidth
              className="input"
              onChange={handleChangeEmail}
              value={email}
            />
          </Validate>

          <FormHelperText className="title">
            <FormattedMessage id="phone" />
          </FormHelperText>
          <Validate
            name="val_phone"
            regex={[
              /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i,
              `${dictionaryList[`${ptLocale}`].validate_phone}`,
            ]}
          >
            <TextField
              fullWidth
              className="input"
              onChange={handleChangePhoneNumber}
              value={phone_number}
            />
          </Validate>
        </>
      </ValidationGroup>
    </Container>
  );
};

export default PatInformation;
