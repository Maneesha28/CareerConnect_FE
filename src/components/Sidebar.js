import React, { useState } from 'react';
import { List, ListItem, ListItemText, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const sections = [
  { label: 'Account Information', link: '/accountInfo' },
  { label: 'Personal Information', link: '/personalInfo' },
  { label: 'Educational Background', link: '/educationalInfo' },
  { label: 'Work Experience', link: '/workInfo' },
  { label: 'Projects', link: '/projectInfo' },
  { label: 'Skills', link: '/skillInfo' },
  { label: 'Achievements', link: '/achievementInfo' },
  { label: 'Research Publications', link: '/publicationInfo' },
];

function Sidebar() {
  const [activeSection, setActiveSection] = useState(sections[0].label);

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  return (
    <Paper elevation={10} sx={{ minWidth: 200, marginTop: '22px'}}>
      <List component="nav">
        {sections.map((section) => (
          <ListItem
            key={section.label}
            button
            component={Link} // Use Link component to navigate
            to={section.link} // Specify the link URL
            onClick={() => handleSectionClick(section.label)}
          >
            <ListItemText primary={section.label} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default Sidebar;
