import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const PaymentMethod = () => {
  return (
    <FormControl className="text-(--color-brown)">
      <label id="demo-radio-buttons-group-label">
        <h3 className='mb-1 font-semibold'>Payment Method :</h3>
      </label>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="payment"
        name="radio-buttons-group"
      >
        <FormControlLabel value="credit_card" control={<Radio />} label="Credit Card" />
        <FormControlLabel value="qr_code" control={<Radio />} label="QR Code" />
      </RadioGroup>
    </FormControl>
  );
}

export default PaymentMethod;