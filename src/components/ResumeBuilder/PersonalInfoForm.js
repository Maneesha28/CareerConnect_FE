// PersonalInfoForm.js
import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import {
  AtSign,
  Calendar,
  GitHub,
  Linkedin,
  MapPin,
  Phone,
  Mail
} from "react-feather";

const PersonalInfoForm = ({ personalInfo}) => {

  return (
    <div style={{ padding: '15px', display: 'flex', flexDirection: 'row' }}>
  {/* Left Column */}
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    {/* Profile Picture */}
    <div style={{marginTop: '60px'}}>
      <img src={personalInfo.profile_pic}/>
    </div>
  </div>
  {/* Right Column */}
  <div style={{ flex: 4, marginLeft: '30px' }}>
    {/* Full Name */}
    <div style={{ marginBottom: '6px', marginTop: '10px' }}>
      <Typography variant="h5" style={{ fontWeight: 'bold', fontSize: '32px', fontFamily: 'Arial, sans-serif' }}>{personalInfo.name}</Typography>
    </div>

    {/* About */}
    <div style={{ marginBottom: '10px' }}>
      <Typography variant='h6' style={{ fontSize: '24px', fontFamily: 'Arial, sans-serif', color: 'grey' }}>{personalInfo.about}</Typography>
    </div>
    
      {/* Email */}
      <div style={{ marginBottom: '10px' }}>
        <Typography variant="h6">
          <Mail /> {personalInfo.email}
        </Typography>
      </div>

      {/* Phone */}
      <div style={{marginBottom: '10px'}}>
        <Typography variant="h6">
          <Phone /> {personalInfo.phone_no}
        </Typography>
      </div>

    {/* Date of Birth */}
    <div style={{ marginBottom: '10px' }}>
      <Typography variant="h6">
        <Calendar /> {new Date(personalInfo.date_of_birth).toLocaleDateString('en-CA')}
      </Typography>
    </div>

    {/* Address */}
    <div style={{ marginBottom: '10px' }}>
      <Typography variant="h6">
        <MapPin /> {personalInfo.address}
      </Typography>
    </div>

      {/* Github */}
      {personalInfo.github_link &&
      <div style={{ marginBottom: '10px' }}>
        <Typography variant="h6">
          <a href={`http://${personalInfo.github_link}`} target="_blank" rel="noopener noreferrer">
            <GitHub /> {personalInfo.github_link}
          </a>
        </Typography>

      </div>
      }
      {/* LinkedIn */}
      {personalInfo.linkedin_link &&
      <div style={{ marginBottom: '10px' }}>
        <Typography variant="h6">
          <a href={`http://${personalInfo.linkedin_link}`} target="_blank" rel="noopener noreferrer">
            <Linkedin /> {personalInfo.linkedin_link}
          </a>
        </Typography>

      </div>
      } 
  </div>
</div>

  );
};

export default PersonalInfoForm;
