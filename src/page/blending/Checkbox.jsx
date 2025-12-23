import { useState } from 'react';

const Checkbox = ({ label }) => {
  // Initialize and manage the 'checked' state
  const [isChecked, setIsChecked] = useState(false);

  // Handler function to update the state when the checkbox is clicked
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="checkbox-wrapper">
      <label>
        <input
          type="checkbox"
          checked={isChecked} // Makes it a controlled component
          onChange={handleOnChange} // Updates state on change
        />
        {/* Associate the label with the input for accessibility */}
        <span>{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;