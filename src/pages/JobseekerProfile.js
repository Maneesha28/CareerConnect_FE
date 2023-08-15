import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './JobSeekerProfile.css';
import { useParams } from 'react-router-dom';

// Helper components for each tab
const AboutTab = ({ jobseekerData }) => {
  // Render the about tab content
  return (
    <div>
      <h3>About</h3>
      <table>
        <tbody>
          <tr>
            <th>Name:</th>
            <td>{jobseekerData.name}</td>
          </tr>
          <tr>
            <th>Gender:</th>
            <td>{jobseekerData.gender}</td>
          </tr>
          <tr>
            <th>Address:</th>
            <td>{jobseekerData.address}</td>
          </tr>
          <tr>
            <th>Date of Birth:</th>
            <td>{jobseekerData.date_of_birth || 'Not available.'}</td>
          </tr>
          <tr>
            <th>Phone No:</th>
            <td>{jobseekerData.phone_no || 'Not available.'}</td>
          </tr>
          <tr>
            <th>Nationality:</th>
            <td>{jobseekerData.nationality || 'Not available.'}</td>
          </tr>
          {/* Add more rows for other general information */}
        </tbody>
      </table>
    </div>
  );
};

const WorkExperienceTab = ({ workExperienceData }) => {
    return (
      <div>
        <h3>Work Experience</h3>
        {workExperienceData.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Designation</th>
                <th>Organization</th>
                <th>Employment Type</th>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
              {workExperienceData.map((experience, index) => (
                <tr key={index}>
                  <td>{experience.designation}</td>
                  <td>{experience.organization}</td>
                  <td>{experience.employment_type}</td>
                  <td>{experience.start_date || 'Not available.'}</td>
                  <td>{experience.end_date || 'Not available.'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No work experiences available.</div>
        )}
      </div>
    );
  };  

const EducationTab = ({educationData}) => {
  // Fetch education data and render the content
  // ...
  return (
    <div>
        <h3>Education</h3>
        {educationData.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Degree</th>
                <th>Subject</th>
                <th>Institution</th>
                <th>Result</th>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
              {educationData.map((education, index) => (
                <tr key={index}>
                  <td>{education.degree}</td>
                  <td>{education.subject}</td>
                  <td>{education.institution}</td>
                  <td>{education.result}</td>
                  <td>{education.start_date || 'Not available.'}</td>
                  <td>{education.end_date || 'Not available.'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No education information available.</div>
        )}
      </div>
  );
};

const SkillsTab = ({skillsData}) => {
  // Fetch skills data and render the content
  // ...
  return (
    <div>
        <h3>Skills</h3>
        {skillsData.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Expertise Level</th>
              </tr>
            </thead>
            <tbody>
              {skillsData.map((skill, index) => (
                <tr key={index}>
                  <td>{skill.skill_name}</td>
                  <td>{skill.expertise_level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No skill information available.</div>
        )}
      </div>
  );
};

const AchievementsTab = ({achievementsData}) => {
  // Fetch achievements data and render the content
  // ...
  return (
    <div>
        <h3>Achievements</h3>
        {achievementsData.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Achievement Name</th>
                <th>Position</th>
                <th>Organization</th>
                <th>Achievement Date</th>
              </tr>
            </thead>
            <tbody>
              {achievementsData.map((achievement, index) => (
                <tr key={index}>
                  <td>{achievement.achievement_name}</td>
                  <td>{achievement.position}</td>
                  <td>{achievement.organized_by}</td>
                  <td>{achievement.achievement_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No achievement available.</div>
        )}
      </div>
  );
};

const PublicationsTab = ({publicationsData}) => {
  // Fetch publications data and render the content
  // ...
  return (
    <div>
        <h3>Publications</h3>
        {publicationsData.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Paper Title</th>
                <th>Author(s)</th>
                <th>Journal</th>
                <th>Publication Date</th>
                <th>PDF Link</th>
              </tr>
            </thead>
            <tbody>
              {publicationsData.map((publication, index) => (
                <tr key={index}>
                  <td>{publication.title}</td>
                  <td>{publication.authors}</td>
                  <td>{publication.journal}</td>
                  <td>{publication.publication_date}</td>
                  {publication.pdf_link ? (
                        <td> 
                        <a
                          href={publication.pdf_link.startsWith('http') ? publication.pdf_link : `http://${publication.pdf_link}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                        PDF Link
                        </a>
                    </td>) : 
                    (<td></td>)}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No publication available.</div>
        )}
      </div>
  );
};

const ProjectTab = ({projectData}) => {
    // Fetch publications data and render the content
    // ...
    return (
      <div>
          <h3>Projects</h3>
          {projectData.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Project Title</th>
                  <th>Description</th>
                  <th>Technologies</th>
                  <th>Project Link</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                </tr>
              </thead>
              <tbody>
                {projectData.map((project, index) => (
                  <tr key={index}>
                    <td>{project.title}</td>
                    <td>{project.description}</td>
                    <td>{project.technologies}</td>
                    {project.project_link ? (
                        <td> 
                        <a
                          href={project.project_link.startsWith('http') ? project.project_link : `http://${project.project_link}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                        Project Link
                        </a>
                    </td>) : 
                    (<td></td>)}
                    <td>{project.start_date}</td>
                    <td>{project.end_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>No project available.</div>
          )}
        </div>
    );
  };

const JobSeekerProfile = () => {
    const [jobseekerData, setJobseekerData] = useState(null);
    const [workExperienceData, setWorkExperienceData] = useState(null);
    const [educationData, setEducationData] = useState(null);
    const [skillsData, setSkillsData] = useState(null);
    const [achievementsData, setAchievementsData] = useState(null);
    const [publicationsData, setPublicationsData] = useState(null);
    const [projectData, setProjectData] = useState(null);

    const [isLoadingJobseeker, setIsLoadingJobseeker] = useState(true);
    const [isLoadingWorkExperience, setIsLoadingWorkExperience] = useState(true);
    const [isLoadingEducation, setIsLoadingEducation] = useState(true);
    const [isLoadingSkills, setIsLoadingSkills] = useState(true);
    const [isLoadingAchievements, setIsLoadingAchievements] = useState(true);
    const [isLoadingPublications, setIsLoadingPublications] = useState(true);
    const [isLoadingProject, setIsLoadingProject] = useState(true);

    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('about'); // Initial active tab
  
    const id = useParams().jobseeker_id;
  
    useEffect(() => {
      const fetchJobseekerData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/jobseeker/${id}`, {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          });
          setJobseekerData(response.data);
          setIsLoadingJobseeker(false);
        } catch (error) {
          setError('Error fetching jobseeker information.');
          setIsLoadingJobseeker(false);
        }
      };
  
      const fetchWorkExperienceData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/workexperience/all/${id}`, {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          });
          setWorkExperienceData(response.data);
          setIsLoadingWorkExperience(false);
        } catch (error) {
          setError('Error fetching work experience information.');
          setIsLoadingWorkExperience(false);
        }
      };

    const fetchEducationData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/education/all/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            setEducationData(response.data);
            setIsLoadingEducation(false);
        } catch (error) {
            setError('Error fetching work experience information.');
            setIsLoadingEducation(false);
        }
    };

    const fetchSkillsData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/skill/all/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            setSkillsData(response.data);
            setIsLoadingSkills(false);
        } catch (error) {
            setError('Error fetching work experience information.');
            setIsLoadingSkills(false);
        }
    };

    const fetchAchievementsData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/achievement/all/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            setAchievementsData(response.data);
            setIsLoadingAchievements(false);
        } catch (error) {
            setError('Error fetching work experience information.');
            setIsLoadingAchievements(false);
        }
    };

    const fetchPublicationsData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/publication/all/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            setPublicationsData(response.data);
            setIsLoadingPublications(false);
        } catch (error) {
            setError('Error fetching work experience information.');
            setIsLoadingPublications(false);
        }
    };

    const fetchProjectData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/project/all/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            setProjectData(response.data);
            setIsLoadingProject(false);
        } catch (error) {
            setError('Error fetching work experience information.');
            setIsLoadingProject(false);
        }
    };
  
    fetchJobseekerData();
    fetchWorkExperienceData();
    fetchEducationData();
    fetchSkillsData();
    fetchAchievementsData();
    fetchPublicationsData();
    fetchProjectData();

    }, [id]);
  
    if (isLoadingJobseeker || isLoadingWorkExperience || isLoadingEducation || isLoadingSkills || isLoadingAchievements 
        || isLoadingPublications || isLoadingProject) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>{error}</div>;
    }
  
    const handleTabChange = (tabName) => {
      setActiveTab(tabName);
    };
  
    if (!jobseekerData) {
      return <div>Jobseeker not found.</div>;
    }

    const handleLogout = () => {
        axios.post('http://localhost:3000/api/auth/logout', {}, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
        .then((response) => {
            if (response.status === 200) {
                window.location.href = '/auth/login';
            }
        })
        .catch((error) => {
            console.log(error);
        });
      };
  
    return (
      <div className="jobseeker-profile">
        {/* add a logout button on the top right corner */}
        <div className="logout" onClick={handleLogout}>
        Logout
      </div>
        <h2>Jobseeker Profile</h2>
        <div className="tab">
          <div
            className={`tab-button ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => handleTabChange('about')}
          >
            About
          </div>
          <div
            className={`tab-button ${activeTab === 'work-experience' ? 'active' : ''}`}
            onClick={() => handleTabChange('work-experience')}
          >
            Work Experience
          </div>
          <div
            className={`tab-button ${activeTab === 'education' ? 'active' : ''}`}
            onClick={() => handleTabChange('education')}
          >
            Education
          </div>
          <div
            className={`tab-button ${activeTab === 'skills' ? 'active' : ''}`}
            onClick={() => handleTabChange('skills')}
          >
            Skills
          </div>
          <div
            className={`tab-button ${activeTab === 'achievements' ? 'active' : ''}`}
            onClick={() => handleTabChange('achievements')}
          >
            Achievements
          </div>
          <div
            className={`tab-button ${activeTab === 'publications' ? 'active' : ''}`}
            onClick={() => handleTabChange('publications')}
          >
            Publications
          </div>
          <div
            className={`tab-button ${activeTab === 'project' ? 'active' : ''}`}
            onClick={() => handleTabChange('project')}
          >
            Projects
          </div>
        </div>
  
        <div className="tab-content">
          {/* Render the content of the selected tab */}
          {activeTab === 'about' && <AboutTab jobseekerData={jobseekerData} />}
          {activeTab === 'work-experience' && <WorkExperienceTab workExperienceData={workExperienceData} />}
          {activeTab === 'education' && <EducationTab educationData={educationData}/>}
          {activeTab === 'skills' && <SkillsTab skillsData={skillsData} />}
          {activeTab === 'achievements' && <AchievementsTab achievementsData={achievementsData} />}
          {activeTab === 'publications' && <PublicationsTab publicationsData={publicationsData}/>}
          {activeTab === 'project' && <ProjectTab projectData={projectData}/>}
        </div>
      </div>
    );
  };
  

export default JobSeekerProfile;
