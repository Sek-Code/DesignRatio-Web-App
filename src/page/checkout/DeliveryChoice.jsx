import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function DeliveryChoice() {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label"><h3>Delivery :</h3></FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="delivery"
        name="radio-buttons-group"
      >
        <FormControlLabel value="postTH" control={<Radio />} label="Post Thailand + 40 THB" />
        <FormControlLabel value="kex" control={<Radio />} label="KEX + 60 THB" />
        <FormControlLabel value="flash" control={<Radio />} label="Flash Express + 60 THB" />
      </RadioGroup>
    </FormControl>
  );
}