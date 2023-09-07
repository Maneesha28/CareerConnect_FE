import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { List, ListItem, ListItemText, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { Style } from '@mui/icons-material';

const sections = [
  { label: 'Account Information', link: '/companyAccountInfo' },
  { label: 'Company Information', link: '/companyInfo' },
];

function HtmlToPdfConverter() {

  const printDocument = () => {
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        pdf.save('download.pdf');
      });
  };
  const paperStyle = {
    backgroundColor: 'lightblue', // Set the background color here
    padding: '16px', // Add padding as needed
  };

  const divStyle = {
    backgroundColor: 'lightblue', // Set the background color here
    width: '100%', // Adjust the width as needed
    minHeight: '297mm', // Adjust the height as needed
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '16px', // Add padding as needed
  };
return (
    <>
    <div className="mb5">
         <button onClick={printDocument}>Print</button>
   </div>
   <div id='divToPrint' style={divStyle}>
    <Paper outlined sx={{ minWidth: 200, marginTop: '22px', height: '100%' }}>
      <List component="nav" sx={{ height: '100%' }}>
        {sections.map((section) => (
          <ListItem>
            <ListItemText primary={section.label} />
          </ListItem>
        ))}
      </List>
    </Paper>
    </div>
    </>
  );
}

export default HtmlToPdfConverter;
