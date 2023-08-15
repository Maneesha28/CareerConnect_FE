import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import ButtonBase from '@mui/material/ButtonBase';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

const projectInfoData = [
  { id: 1, title: 'E-commerce Website', description: 'Developed a fully functional e-commerce website using MERN stack.', projectLink: 'https://example.com', technologies: 'React, Node.js, MongoDB', startDate: '2022-03-15', endDate: '2022-06-30' },
  { id: 2, title: 'Portfolio Website', description: 'Designed and built a personal portfolio website to showcase projects and skills.', projectLink: 'https://example.com/portfolio', technologies: 'HTML, CSS, JavaScript', startDate: '2021-08-01', endDate: '2021-09-15' },
  // Add more project info as needed
];

function ProjectInfo() {
  const [projectInfo, setProjectInfo] = useState(projectInfoData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedProjectInfo, setEditedProjectInfo] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newProjectInfo, setNewProjectInfo] = useState({
    title: '',
    description: '',
    projectLink: '',
    technologies: '',
    startDate: '',
    endDate: '',
  });

  const handleDeleteProjectInfo = (infoId) => {
    setProjectInfo(projectInfo.filter((info) => info.id !== infoId));
  };

  const handleAddProjectInfo = () => {
    setIsDialogOpen(true);
  };

  const handleEditProjectInfo = (info) => {
    setEditedProjectInfo(info);
    setNewProjectInfo({
      title: info.title,
      description: info.description,
      projectLink: info.projectLink,
      technologies: info.technologies,
      startDate: info.startDate,
      endDate: info.endDate,
    });
    setIsEditDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setNewProjectInfo({
      title: '',
      description: '',
      projectLink: '',
      technologies: '',
      startDate: '',
      endDate: '',
    });
  };

  const handleSaveProjectInfo = () => {
    setProjectInfo([...projectInfo, { ...newProjectInfo, id: projectInfo.length + 1 }]);
    handleCloseDialog();
  };

  const handleSaveEdit = () => {
    if (editedProjectInfo) {
      const updatedProjectInfo = projectInfo.map((info) =>
        info.id === editedProjectInfo.id ? { ...info, ...newProjectInfo } : info
      );
      setProjectInfo(updatedProjectInfo);
    }
    setEditedProjectInfo(null);
    setIsEditDialogOpen(false);
    setNewProjectInfo({
      title: '',
      description: '',
      projectLink: '',
      technologies: '',
      startDate: '',
      endDate: '',
    });
  };

  const handleCancelEdit = () => {
    setEditedProjectInfo(null);
    setIsEditDialogOpen(false);
    setNewProjectInfo({
      title: '',
      description: '',
      projectLink: '',
      technologies: '',
      startDate: '',
      endDate: '',
    });
  };

  return (
    <>
      <Header />
      <Box display="flex">
        <Sidebar />
        <Box p={3}>
          <Paper elevation={3}>
            <Box p={3}>
              <Typography variant="h6" gutterBottom>
                Project Information
              </Typography>
              <ButtonBase
                component="div"
                onClick={handleAddProjectInfo}
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <Typography variant="body1" sx={{ marginRight: '8px' }}>
                  Add
                </Typography>
                <IconButton color="primary">
                  <AddIcon />
                </IconButton>
              </ButtonBase>
              {projectInfo.length === 0 ? (
                <Typography>No project information available.</Typography>
              ) : (
                <List>
                  {projectInfo.map((info) => (
                    <ListItem key={info.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box>
                        <ListItemText
                          primary={info.title}
                          secondary={
                            <>
                              <div>{info.description}</div>
                              <div>Project Link: <a href={info.projectLink} target="_blank" rel="noopener noreferrer">{info.projectLink}</a></div>
                              <div>Technologies: {info.technologies}</div>
                              <div>
                                Dates: {info.startDate} - {info.endDate}
                              </div>
                            </>
                          }
                        />
                      </Box>
                      <Box>
                        <IconButton color="error" onClick={() => handleDeleteProjectInfo(info.id)}>
                          <DeleteIcon />
                        </IconButton>
                        <IconButton color="primary" onClick={() => handleEditProjectInfo(info)}>
                          <EditIcon />
                        </IconButton>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          </Paper>
        </Box>
      </Box>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Add New Project Information</DialogTitle>
        <DialogContent>
          {/* Add text fields for project details */}
          <TextField
            label="Title"
            fullWidth
            margin="dense"
            value={newProjectInfo.title}
            onChange={(e) => setNewProjectInfo({ ...newProjectInfo, title: e.target.value })}
          />
          <TextField
            label="Description"
            fullWidth
            margin="dense"
            multiline
            rows={4}
            value={newProjectInfo.description}
            onChange={(e) => setNewProjectInfo({ ...newProjectInfo, description: e.target.value })}
          />
          <TextField
            label="Project Link"
            fullWidth
            margin="dense"
            value={newProjectInfo.projectLink}
            onChange={(e) => setNewProjectInfo({ ...newProjectInfo, projectLink: e.target.value })}
          />
          <TextField
            label="Technologies"
            fullWidth
            margin="dense"
            value={newProjectInfo.technologies}
            onChange={(e) => setNewProjectInfo({ ...newProjectInfo, technologies: e.target.value })}
          />
          <TextField
            label="Start Date"
            fullWidth
            margin="dense"
            type="date"
            value={newProjectInfo.startDate}
            onChange={(e) => setNewProjectInfo({ ...newProjectInfo, startDate: e.target.value })}
          />
          <TextField
            label="End Date"
            fullWidth
            margin="dense"
            type="date"
            value={newProjectInfo.endDate}
            onChange={(e) => setNewProjectInfo({ ...newProjectInfo, endDate: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveProjectInfo} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isEditDialogOpen} onClose={handleCancelEdit}>
        <DialogTitle>Edit Project Information</DialogTitle>
        <DialogContent>
          {/* Display existing project info */}
          {editedProjectInfo && (
            <Box>
              <TextField
                label="Title"
                fullWidth
                margin="dense"
                value={newProjectInfo.title}
                onChange={(e) => setNewProjectInfo({ ...newProjectInfo, title: e.target.value })}
              />
              <TextField
                label="Description"
                fullWidth
                margin="dense"
                multiline
                rows={4}
                value={newProjectInfo.description}
                onChange={(e) => setNewProjectInfo({ ...newProjectInfo, description: e.target.value })}
              />
              <TextField
                label="Project Link"
                fullWidth
                margin="dense"
                value={newProjectInfo.projectLink}
                onChange={(e) => setNewProjectInfo({ ...newProjectInfo, projectLink: e.target.value })}
              />
              <TextField
                label="Technologies"
                fullWidth
                margin="dense"
                value={newProjectInfo.technologies}
                onChange={(e) => setNewProjectInfo({ ...newProjectInfo, technologies: e.target.value })}
              />
              <TextField
                label="Start Date"
                fullWidth
                margin="dense"
                type="date"
                value={newProjectInfo.startDate}
                onChange={(e) => setNewProjectInfo({ ...newProjectInfo, startDate: e.target.value })}
              />
              <TextField
                label="End Date"
                fullWidth
                margin="dense"
                type="date"
                value={newProjectInfo.endDate}
                onChange={(e) => setNewProjectInfo({ ...newProjectInfo, endDate: e.target.value })}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEdit} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ProjectInfo;
