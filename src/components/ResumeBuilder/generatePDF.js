import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button, Divider, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import PersonalInfoForm from './PersonalInfoForm';
import ReactToPrint from 'react-to-print';

const generatePDF = ({personalInfo, education, workExperience, achievements, skills, projects, publications}) =>
{

  const printDocument = () =>{     
    let printContents = document.getElementById('divToPrint').innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
   document.body.innerHTML = originalContents; 
  }

  const sectionStyle = {
    marginLeft: '30px',
    marginTop: '20px',
    marginRight: '100px',
    fontSize: '20px',
    alignContent: 'left',
  };

  function renderEducation() {
    return (
      <div style={sectionStyle}>
        <Typography variant='h5' style={{ fontWeight: 'bold' }}>
          Education
        </Typography>
        <List>
          {education.map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                disableTypography
                primary={<Typography variant='h6'>{item.degree}</Typography>}
                secondary={
                  <div style={{ fontSize: '16px', color: 'grey' }}>
                    {item.result}
                    <br />
                    {item.subject}, {item.institution}
                    <br />
                    {`${new Date(item.start_date).toLocaleDateString('en-CA')} to ${new Date(
                      item.end_date
                    ).toLocaleDateString('en-CA')}`}
                  </div>
                }
              />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }

  function renderWorkExperience() {
    return (
      <div style={sectionStyle}>
        <Typography variant='h5' style={{ fontWeight: 'bold' }}>
          Work Experience
        </Typography>
        <List>
          {workExperience.map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                disableTypography
                primary={<Typography variant='h6'>{item.designation}</Typography>}
                secondary={
                  <div style={{ fontSize: '16px', color: 'grey' }}>
                    {item.organization}
                    <br />
                    {`${new Date(item.start_date).toLocaleDateString('en-CA')} to ${new Date(
                      item.end_date
                    ).toLocaleDateString('en-CA')}`}
                  </div>
                }
              />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }

  function renderAchievements() {
    return (
      <div style={sectionStyle}>
        <Typography variant='h5' style={{ fontWeight: 'bold' }}>
          Achievements
        </Typography>
        <List>
          {achievements.map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                disableTypography
                primary={<Typography variant='h6'>{item.achievement_name}</Typography>}
                secondary={
                  <div style={{ fontSize: '16px', color: 'grey' }}>
                    {item.position}
                    <br />
                    {`${new Date(item.achievement_date).toLocaleDateString('en-CA')}`}
                  </div>
                }
              />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }

  function renderSkills() {
    return (
      <div
        style={{
          paddingLeft: '100px',
          paddingTop: '20px',
          paddingRight: '150px',
          fontSize: '20px',
          alignContent: 'left',
        }}
      >
        <Typography variant='h5' style={{ fontWeight: 'bold' }}>
          Skills
        </Typography>
        <List>
          {skills.map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                disableTypography
                primary={<Typography variant='h6'>{item.skill_name}</Typography>}
                secondary={
                  <div style={{ fontSize: '16px', color: 'grey' }}>
                    {item.expertise_level}
                  </div>
                }
              />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }

  function renderProjects() {
    return (
      <div style={sectionStyle}>
        <Typography variant='h5' style={{ fontWeight: 'bold' }}>
          Projects
        </Typography>
        <List>
          {projects.map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                disableTypography
                primary={<Typography variant='h6'>{item.title}</Typography>}
                secondary={
                  <div style={{ fontSize: '16px', color: 'grey' }}>
                    {item.description}
                    <br />
                    {`${new Date(item.start_date).toLocaleDateString('en-CA')} to ${new Date(
                      item.end_date
                    ).toLocaleDateString('en-CA')}`}
                  </div>
                }
              />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }

  function renderPublications() {
    return (
      <div style={sectionStyle}>
        <Typography variant='h5' style={{ fontWeight: 'bold' }}>
          Publications
        </Typography>
        <List>
          {publications.map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={item.title}
                secondary={
                  <div style={{ fontSize: '16px', color: 'grey' }}>
                    {item.authors}
                    <br />
                    {item.journal}
                    <br />
                    {`${new Date(item.publication_date).toLocaleDateString('en-CA')}`}
                  </div>
                }
              />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }

  const row1 = [renderEducation(), renderWorkExperience()];
  const row2 = [renderAchievements(), renderSkills()];
  const row3 = [renderPublications(), renderProjects()];

  // const printDocument = () => {
  //   const element = document.getElementById('divToPrint');
  //   html2canvas(element).then((canvas) => {
  //     const imgData = canvas.toDataURL('image/png');

  //     // Create a new jsPDF instance
  //     const pdf = new jsPDF();

  //     // Add the captured image to the PDF
  //     pdf.addImage(imgData, 'PNG', 0, 0);

  //     // Save the PDF with the specified file name
  //     pdf.save(`${personalInfo.name} Resume.pdf`);
  //   });
  // };

  const goBack = () => {
    window.location.reload();
  };

  return (
    <>
        {/* <ReactToPrint
          trigger={() => <Button variant='contained' color='secondary'>Print</Button>}
          content={() => componentRef.current}
          documentTitle={`${personalInfo.name} Resume`}
        /> */}
        <div id='divToPrint'>
          {/* <Paper sx={{ minWidth: 200, marginTop: '5px', height: '100%' }}> */}
            <div>
              <PersonalInfoForm personalInfo={personalInfo} />
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
          {/* </Paper> */}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button variant='contained' color='secondary' onClick={goBack}>Back</Button>
          <Button variant='contained' color='secondary' onClick={printDocument}>Print</Button>
        </div>
    </>
  );
}

export default generatePDF;
