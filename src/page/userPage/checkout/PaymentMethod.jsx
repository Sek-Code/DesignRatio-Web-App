// const PaymentMethod = () => {
//     return (
//         <div>
//             <form>
//                 <h3>Payment Method :</h3>
//                 <input type="radio" id="credit_card" value="Credit Card" />
//                 <label for="credit_card">Credit Card</label>
//                 <br />
//                 <input type="radio" id="qr_code" value="QR Code" />
//                 <label for="qr_code">QR Code</label>
//             </form>
//         </div>
//     );
// };

// export default PaymentMethod;

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const PaymentMethod = () => {
  return (
    <FormControl className="text-(--color-brown)">
      <label id="demo-radio-buttons-group-label">
        <h3 className='mb-1'>Payment Method :</h3>
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