import React, { useState } from 'react';
import { List, ListItem, ListItemText, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const sections = [
  { label: 'Account Information', link: '/companyAccountInfo' },
  { label: 'Company Information', link: '/companyInfo' },
];

function Sidebar_Company() {
  const [activeSection, setActiveSection] = useState(sections[0].label);

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  return (
    <Paper elevation={10} sx={{ minWidth: 200, marginTop: '22px', height: '100%' }}>
      <List component="nav" sx={{ height: '100%' }}>
        {sections.map((section) => (
          <ListItem
            key={section.label}
            button
            component={Link} // Use Link component to navigate
            to={section.link} // Specify the link URL
            onClick={() => handleSectionClick(section.label)}
            sx={{ height: '50%', display: 'flex', alignItems: 'center' }}
          >
            <ListItemText primary={section.label} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default Sidebar_Company;
