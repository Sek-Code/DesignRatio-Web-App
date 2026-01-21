import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export default function DeliveryChoice() {
  return (
    <FormControl className="text-(--color-brown)">
      <label id="demo-radio-buttons-group-label">
        <h3 className='mb-1 font-semibold'>Delivery :</h3>
      </label>
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