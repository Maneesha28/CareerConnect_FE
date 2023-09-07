// PersonalInfoForm.js
import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { format } from 'date-fns';

const PersonalInfoForm = ({ personalInfo, handleChange }) => {

  // Function to format date as "dd-mm-yyyy"
  function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
    //return formattedDate.replace(/\//g, '-'); // Replace slashes with dashes if necessary
  }

  const [selectedFields, setSelectedFields] = useState({
    name: false,
    about: false,
    email: false,
    gender: false,
    date_of_birth: false,
    phone_no: false,
    address: false,
    nationality: false,
  });

  const handleCheckboxChange = (fieldName) => {
    setSelectedFields({
      ...selectedFields,
      [fieldName]: !selectedFields[fieldName],
    });
  };

  console.log("inside personalInfo", personalInfo)

  return (
    <div>
    <div style={{ marginBottom: '16px' }}>
      <TextField
        label="Full Name"
        name="name"
        value={personalInfo.name}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
    <div style={{ marginBottom: '16px' }}>
      <TextField
        label="About"
        name="about"
        value={personalInfo.about}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
    <div style={{ marginBottom: '16px' }}>
      <TextField
        label="Email"
        name="email"
        type="email"
        value={personalInfo.email}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
    <div style={{ marginBottom: '16px' }}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender"
          value={personalInfo.gender}
          onChange={handleChange}
        >
          <FormControlLabel
            value="male"
            control={<Radio />}
            label="Male"
          />
          <FormControlLabel
            value="female"
            control={<Radio />}
            label="Female"
          />
          <FormControlLabel
            value="other"
            control={<Radio />}
            label="Other"
          />
        </RadioGroup>
      </FormControl>
    </div>
    <div style={{ marginBottom: '16px' }}>
      <TextField
        label="Date of Birth"
        name="date_of_birth"
        type="date"
        value={formatDate(personalInfo.date_of_birth)}
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
      />
    </div>
    <div style={{ marginBottom: '16px' }}>
      <TextField
        label="Phone"
        name="phone_no"
        value={personalInfo.phone_no}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
    <div style={{ marginBottom: '16px' }}>
      <TextField
        label="Address"
        name="address"
        multiline
        rows={3}
        value={personalInfo.address}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
    <div style={{ marginBottom: '16px' }}>
      <TextField
        label="Nationality"
        name="nationality"
        value={personalInfo.nationality}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
  </div>

  );
};

export default PersonalInfoForm;
