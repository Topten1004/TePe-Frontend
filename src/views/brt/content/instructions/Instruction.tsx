// Material-UI
import {
  Container,
  Grid,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextareaAutosize,
} from '@mui/material';

// Third Party
import { FormattedMessage } from 'react-intl';

// Assets
import SelectIcon from 'assets/images/icons/select.png';
import { InstructionProps } from 'types/instruction';

// =============================|| INSTRUCTION ||============================= //

const Instruction = ({
  selectedOpt,
  comment,
  setComment,
  setSelectedOpt,
}: InstructionProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOpt(e.target.value);
  };

  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return (
    <Container className="ins-container">
      <Typography variant="h3">
        <FormattedMessage id="have_bridge" />
      </Typography>
      <FormControl>
        <RadioGroup
          aria-labelledby="bridge-radio-group"
          defaultValue="no"
          name="radio-buttons"
          className="radio-buttons"
        >
          <FormControlLabel
            value="no"
            control={
              <Radio onChange={handleChange} checked={selectedOpt === 'no'} />
            }
            label={<FormattedMessage id="no" />}
          />
          <FormControlLabel
            value="yes"
            control={
              <Radio onChange={handleChange} checked={selectedOpt === 'yes'} />
            }
            label={<FormattedMessage id="yes" />}
          />
        </RadioGroup>
      </FormControl>

      {selectedOpt === 'yes' ? (
        <>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <Typography variant="h5">
                <FormattedMessage id="click_on" />
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <img src={SelectIcon} alt="Select teeth" />
            </Grid>
          </Grid>
        </>
      ) : (
        <></>
      )}
      <Typography variant="h3" className="title">
        <FormattedMessage id="comment" />
      </Typography>

      <TextareaAutosize
        aria-label="maximum height"
        minRows={5}
        placeholder="Set to 5 rows"
        className="field"
        value={comment}
        onChange={handleChangeComment}
      />
    </Container>
  );
};

export default Instruction;
