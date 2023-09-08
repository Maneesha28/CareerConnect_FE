import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { Button, Divider, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { Person } from '@mui/icons-material';
import PersonalInfoForm from './PersonalInfoForm';

function generatePDF(personalInfo, education, workExperience, achievements, skills, projects, publications) {
    
    const printDocument = () => {
      const element = document.getElementById('divToPrint');
    
      // Use html2canvas to capture the element as an image
    //   html2canvas(document.body,
    //     {
    //     useCORS: true, //By passing this option in function Cross origin images will be rendered properly in the downloaded version of the PDF
    //     allowTaint: true,
    //     onrendered: function (element) {
    //         //your functions here
    //            var imgData = element.toDataURL('image/png');
    //            var imgWidth = 210;
    //            var pageHeight = 295;
    //            var imgHeight = element.height * imgWidth / element.width;
    //            var heightLeft = imgHeight;
    //            var doc = new jsPDF('p', 'mm');
    //            var position = 0;
    //            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    //            heightLeft -= pageHeight;
    //            while (heightLeft >= 0) {
    //                position = heightLeft - imgHeight;
    //                doc.addPage();
    //                doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    //                heightLeft -= pageHeight;
    //            }
    //            doc.save(`${personalInfo.name} Resume.pdf`);
    //        }
    //     });
      
      html2canvas(element)
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
    
          // Create a new jsPDF instance
          const pdf = new jsPDF();
    
          // Add the captured image to the PDF
          pdf.addImage(imgData, 'PNG', 0, 0);
    
          // Save the PDF with the specified file name
          pdf.save(`${personalInfo.name} Resume.pdf`);
        });
    };
    

  const sectionStyle = {
    paddingLeft: '30px', // Adjust padding as needed
    paddingTop: '20px', // Adjust padding as needed
    paddingRight: '150px', // Adjust padding as needed
    fontSize: '20px',
    alignContent: 'left',
  };

  function renderEducation()
  {
    return (
        <div style={sectionStyle}>
            <Typography variant='h5' style={{fontWeight: 'bold'}}>Education</Typography>
            <List>
                {education.map((item, index) => (
                    <ListItem key={index}>
                        <ListItemText disableTypography primary={<Typography variant='h6'>{item.degree}</Typography>} secondary={
                            <div style={{fontSize: '16px', color: 'grey'}}>
                                {item.result} 
                                <br />
                                {item.subject}, {item.institution} 
                                <br />
                                {`${new Date(item.start_date).toLocaleDateString('en-CA')} to ${new Date(item.end_date).toLocaleDateString('en-CA')}`}
                            </div>
                            } />
                        </ListItem>
                ))}
            </List>
        </div>
    )
  }

  function renderWorkExperience() {
    return(
        <div style={sectionStyle}>
            <Typography variant='h5' style={{fontWeight: 'bold'}}>Work Experience</Typography>
            <List>
                {workExperience.map((item, index) => (
                    <ListItem key={index}>
                        <ListItemText disableTypography primary={<Typography variant='h6'>{item.designation}</Typography>} secondary={
                            <div style={{fontSize: '16px', color: 'grey'}}>
                                {item.organization} 
                                <br />
                                {`${new Date(item.start_date).toLocaleDateString('en-CA')} to ${new Date(item.end_date).toLocaleDateString('en-CA')}`}
                            </div>
                            } />
                    </ListItem>
                ))}
            </List>
        </div>
    )
  }

  function renderAchievements() {
    return(
        <div style={sectionStyle}>
            <Typography variant='h5' style={{fontWeight: 'bold'}}>Achievements</Typography>
            <List>
                {achievements.map((item, index) => (
                    <ListItem key={index}>
                        <ListItemText disableTypography primary={<Typography variant='h6'>{item.achievement_name}</Typography>} secondary={
                        <div style={{fontSize: '16px', color: 'grey'}}>
                        {item.position} 
                        <br />
                        {`${new Date(item.achievement_date).toLocaleDateString('en-CA')}`}
                        </div>
                        } />
                    </ListItem>
                ))}
            </List>
        </div>
    )}  
    
    function renderSkills() {
        return(
            <div style={{paddingLeft: '100px', // Adjust padding as needed
            paddingTop: '20px', // Adjust padding as needed
            paddingRight: '150px', // Adjust padding as needed
            fontSize: '20px',
            alignContent: 'left'}}>
            <Typography variant='h5' style={{fontWeight: 'bold'}}>Skills</Typography>
            <List>
                {skills.map((item, index) => (
                    <ListItem key={index}>
                        <ListItemText disableTypography primary={<Typography variant='h6'>{item.skill_name}</Typography>} secondary={
                            <div style={{fontSize: '16px', color: 'grey'}}>
                            {item.expertise_level}
                            </div>
                            } />
                    </ListItem>
                ))}
            </List>
        </div>
        )
    }

    function renderProjects() {
        return(
            <div style={sectionStyle}>
            <Typography variant='h5' style={{fontWeight: 'bold'}}>Projects</Typography>
            <List>
                {projects.map((item, index) => (
                    <ListItem key={index}>
                        <ListItemText disableTypography primary={<Typography variant='h6'>{item.title}</Typography>} secondary={
                            <div style={{fontSize: '16px', color: 'grey'}}>
                            {item.description} 
                            <br />
                            {`${new Date(item.start_date).toLocaleDateString('en-CA')} to ${new Date(item.end_date).toLocaleDateString('en-CA')}`}
                        </div>
                            } />
                    </ListItem>
                ))}
            </List>
        </div>
        )
    }

    function renderPublications()
    {
        return(
            <div style={sectionStyle}>
            <Typography variant='h5' style={{fontWeight: 'bold'}}>Publications</Typography>
            <List>
                {publications.map((item, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={item.title} secondary={
                            <div style={{fontSize: '16px', color: 'grey'}}>
                            {item.authors} 
                            <br />
                            {item.journal}
                            <br />
                            {`${new Date(item.publication_date).toLocaleDateString('en-CA')}`}
                            </div>
                            } />
                        
                    </ListItem>
                ))}
            </List>
        </div>
        )
    }

    const row1 = [renderEducation(), renderWorkExperience()];
    const row2 = [renderAchievements(), renderSkills()];
    const row3 = [renderProjects(), renderPublications()];

    const goBack = () => {
        location.reload();
    }

return (
    <>
   <div id='divToPrint'>
    {/* backgroundColor: 'rgba(225, 198, 153, 0.1)' */}
    <Paper sx={{ minWidth: 200, marginTop: '22px', height: '100%'}}>
    <div>
        <div style={{paddingTop: '30px'}}>
        <PersonalInfoForm personalInfo={personalInfo} handleChange={null}/>
        </div>
        <Divider />
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        {row1.map((section, index) => (
          <div key={index}>{section}</div>
        ))}
      </div>
      <Divider />
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        {row2.map((section, index) => (
          <div key={index}>{section}</div>
        ))}
      </div>
      <Divider />
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        {row3.map((section, index) => (
          <div key={index}>{section}</div>
        ))}
      </div>
    </div>
    </Paper>
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button variant="contained" color='secondary' onClick={goBack}>Back</Button>
        <Button variant="contained" color='secondary' onClick={printDocument}>Print</Button>
    </div>
    </>
  );
}

export default generatePDF;
