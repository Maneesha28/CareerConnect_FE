// PersonalInfoForm.js
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { format } from 'date-fns';
import { Checkbox, Typography } from '@mui/material';

const PersonalInfoForm = ({ personalInfo, handleChange }) => {

  // // Function to format date as "dd-mm-yyyy"
  // function formatDate(dateString) {
  //   const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  //   const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
  //   return formattedDate;
  //   //return formattedDate.replace(/\//g, '-'); // Replace slashes with dashes if necessary
  // }

  // const [selectedFields, setSelectedFields] = useState({
  //   name: true,
  //   about: true,
  //   email: true,
  //   gender: true,
  //   date_of_birth: true,
  //   phone_no: true,
  //   address: true,
  //   nationality: true,
  // });

  // const handleCheckboxChange = (fieldName) => {
  //   setSelectedFields({
  //     ...selectedFields,
  //     [fieldName]: !selectedFields[fieldName],
  //   });
  // };

  return (
    <div style={{ padding: '6px', display: 'flex', flexDirection: 'row' }}>
  {/* Left Column */}
  <div style={{ flex: 1, marginRight: '16px', marginLeft: '30px'}}>
    {/* Profile Picture */}
    <div>
      <img
        src={personalInfo.profile_pic} // Replace with the actual source of your profile picture
        alt="Profile Pic"
        style={{ width: '200px', height: '200px' }} // Adjust the dimensions as needed
      />
    </div>

    {/* Full Name */}
    <div style={{ marginBottom: '6px', marginTop: '10px' }}>
      <Typography variant="h4" style={{fontWeight: 'bold'}}>{personalInfo.name}</Typography>
    </div>

    {/* About */}
    <div style={{ marginBottom: '16px' }}>
      <Typography variant='h5'>{personalInfo.about}</Typography>
    </div>
  </div>

  {/* Right Column */}
  <div style={{ flex: 5, marginLeft: '30px' }}>
    {/* Email */}
    <div style={{ marginBottom: '16px' }}>
      <Typography variant="h6">Email: {personalInfo.email}</Typography>
    </div>

    {/* Phone */}
    <div style={{ marginBottom: '16px' }}>
      <Typography variant="h6">Phone: {personalInfo.phone_no}</Typography>
    </div>

    {/* Gender */}
    <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
      <Typography variant="h6">Gender: {personalInfo.gender}</Typography>
    </div>

    {/* Date of Birth */}
    <div style={{ marginBottom: '16px' }}>
      <Typography variant="h6">Date of Birth: {new Date(personalInfo.date_of_birth).toLocaleDateString('en-CA')}</Typography>
    </div>

    {/* Address */}
    <div style={{ marginBottom: '16px' }}>
      <Typography variant="h6">Address: {personalInfo.address}</Typography>
    </div>

    {/* Nationality */}
    <div style={{ marginBottom: '16px' }}>
      <Typography variant="h6">Nationality: {personalInfo.nationality}</Typography>
    </div>
  </div>
</div>



//     <div style={{padding: '6px'}}>
//     <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'row', display: 'flex', flexDirection: 'row' }}>
//       <FormControlLabel
//         control={
//           <Checkbox
//             checked={selectedFields.name}
//             onChange={() => handleCheckboxChange('name')}
//             disabled
//           />
//         }
//         label="Full Name"
//         style={{ width: '160px' }} 
//       />
//         <TextField
//           name="name"
//           disabled
//           value={personalInfo.name}
//           onChange={handleChange}
//           fullWidth
//           InputLabelProps={{
//             shrink: true,
//           }}
//         />

//     </div>
//     <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'row' }}>
//       <FormControlLabel
//         control={
//           <Checkbox
//             checked={selectedFields.about}
//             onChange={() => handleCheckboxChange('about')}
//           />
//         }
//         label="About"
//         style={{ width: '160px' }}
//       />

//         <TextField
//           name="about"
//           value={personalInfo.about}
//           onChange={handleChange}
//           fullWidth
//           InputLabelProps={{
//             shrink: true,
//           }}
//         />

//     </div>
//     <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'row' }}>
//   <FormControlLabel
//     control={
//       <Checkbox
//         checked={selectedFields.email}
//         onChange={() => handleCheckboxChange('email')}
//         disabled
//       />
//     }
//     label="Email"
//     style={{ width: '160px' }}
//   />

//     <TextField
//       name="email"
//       value={personalInfo.email}
//       onChange={handleChange}
//       fullWidth
//       InputLabelProps={{
//         shrink: true,
//       }}
//       disabled
//     />

// </div>

// <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
//   <FormControlLabel
//     control={
//       <Checkbox
//         checked={selectedFields.gender}
//         onChange={() => handleCheckboxChange('gender')}
//       />
//     }
//     label="Gender"
//     style={{ width: '160px' }}
//   />

//     <FormControl component="fieldset">
//       <RadioGroup
//         aria-label="gender"
//         name="gender"
//         value={personalInfo.gender || ''}
//         onChange={handleChange}
//         row
//       >
//         <FormControlLabel value="male" control={<Radio />} label="Male" />
//         <FormControlLabel value="female" control={<Radio />} label="Female" />
//         <FormControlLabel value="other" control={<Radio />} label="Other" />
//       </RadioGroup>
//     </FormControl>

// </div>
//     <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'row' }}>
//       <FormControlLabel
//         control={
//           <Checkbox
//             checked={selectedFields.date_of_birth}
//             onChange={() => handleCheckboxChange('date_of_birth')}
//           />
//         }
//         label="Date of Birth"
//         style={{ width: '160px' }}
//       />

//         <TextField
//           name="date_of_birth"
//           type="date"
//           value={new Date(personalInfo.date_of_birth).toLocaleDateString('en-CA')}
//           onChange={handleChange}
//           fullWidth
//           InputLabelProps={{
//             shrink: true,
//           }}
//         />

//     </div>
//     <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'row' }}>
//       <FormControlLabel
//         control={
//           <Checkbox
//             checked={selectedFields.address}
//             onChange={() => handleCheckboxChange('address')}
//           />
//         }
//         label="Address"
//         style={{ width: '160px' }}
//       />

//         <TextField
//           name="address"
//           multiline
//           rows={2}
//           value={personalInfo.address}
//           onChange={handleChange}
//           fullWidth
//           InputLabelProps={{
//             shrink: true,
//           }}
//         />

//     </div>
//     <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'row' }}>
//       <FormControlLabel
//         control={
//           <Checkbox
//             checked={selectedFields.nationality}
//             onChange={() => handleCheckboxChange('nationality')}
//           />
//         }
//         label="Nationality"
//         style={{ width: '160px' }}
//       />

//         <TextField
//           name="nationality"
//           value={personalInfo.nationality}
//           onChange={handleChange}
//           fullWidth
//           InputLabelProps={{
//             shrink: true,
//           }}
//         />
//     </div>
//   </div>

  );
};

export default PersonalInfoForm;
