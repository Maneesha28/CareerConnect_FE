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

const publicationInfoData = [
  { id: 1, title: 'Machine Learning Techniques', authors: 'John Doe, Jane Smith', journal: 'International Journal of AI', pdfLink: 'https://example.com/ml_paper.pdf', publicationDate: '2022-08-15' },
  { id: 2, title: 'Deep Learning Advances', authors: 'Alice Johnson, Bob Williams', journal: 'Neural Networks', pdfLink: 'https://example.com/dl_paper.pdf', publicationDate: '2021-11-30' },
  // Add more publication info as needed
];

function PublicationInfo() {
  const [publicationInfo, setPublicationInfo] = useState(publicationInfoData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedPublicationInfo, setEditedPublicationInfo] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newPublicationInfo, setNewPublicationInfo] = useState({
    title: '',
    authors: '',
    journal: '',
    pdfLink: '',
    publicationDate: '',
  });

  const handleDeletePublicationInfo = (infoId) => {
    setPublicationInfo(publicationInfo.filter((info) => info.id !== infoId));
  };

  const handleAddPublicationInfo = () => {
    setIsDialogOpen(true);
  };

  const handleEditPublicationInfo = (info) => {
    setEditedPublicationInfo(info);
    setNewPublicationInfo({
      title: info.title,
      authors: info.authors,
      journal: info.journal,
      pdfLink: info.pdfLink,
      publicationDate: info.publicationDate,
    });
    setIsEditDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setNewPublicationInfo({
      title: '',
      authors: '',
      journal: '',
      pdfLink: '',
      publicationDate: '',
    });
  };

  const handleSavePublicationInfo = () => {
    setPublicationInfo([...publicationInfo, { ...newPublicationInfo, id: publicationInfo.length + 1 }]);
    handleCloseDialog();
  };

  const handleSaveEdit = () => {
    if (editedPublicationInfo) {
      const updatedPublicationInfo = publicationInfo.map((info) =>
        info.id === editedPublicationInfo.id ? { ...info, ...newPublicationInfo } : info
      );
      setPublicationInfo(updatedPublicationInfo);
    }
    setEditedPublicationInfo(null);
    setIsEditDialogOpen(false);
    setNewPublicationInfo({
      title: '',
      authors: '',
      journal: '',
      pdfLink: '',
      publicationDate: '',
    });
  };

  const handleCancelEdit = () => {
    setEditedPublicationInfo(null);
    setIsEditDialogOpen(false);
    setNewPublicationInfo({
      title: '',
      authors: '',
      journal: '',
      pdfLink: '',
      publicationDate: '',
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
                Publication Information
              </Typography>
              <ButtonBase
                component="div"
                onClick={handleAddPublicationInfo}
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
              {publicationInfo.length === 0 ? (
                <Typography>No publication information available.</Typography>
              ) : (
                <List>
                  {publicationInfo.map((info) => (
                    <ListItem key={info.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box>
                        <ListItemText
                          primary={info.title}
                          secondary={
                            <>
                              <div>Authors: {info.authors}</div>
                              <div>Journal: {info.journal}</div>
                              <div>
                                PDF Link: <a href={info.pdfLink} target="_blank" rel="noopener noreferrer">{info.pdfLink}</a>
                              </div>
                              <div>Publication Date: {info.publicationDate}</div>
                            </>
                          }
                        />
                      </Box>
                      <Box>
                        <IconButton color="error" onClick={() => handleDeletePublicationInfo(info.id)}>
                          <DeleteIcon />
                        </IconButton>
                        <IconButton color="primary" onClick={() => handleEditPublicationInfo(info)}>
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
        <DialogTitle>Add New Publication Information</DialogTitle>
        <DialogContent>
          {/* Add text fields for publication details */}
          <TextField
            label="Title"
            fullWidth
            margin="dense"
            value={newPublicationInfo.title}
            onChange={(e) => setNewPublicationInfo({ ...newPublicationInfo, title: e.target.value })}
          />
          <TextField
            label="Authors"
            fullWidth
            margin="dense"
            value={newPublicationInfo.authors}
            onChange={(e) => setNewPublicationInfo({ ...newPublicationInfo, authors: e.target.value })}
          />
          <TextField
            label="Journal"
            fullWidth
            margin="dense"
            value={newPublicationInfo.journal}
            onChange={(e) => setNewPublicationInfo({ ...newPublicationInfo, journal: e.target.value })}
          />
          <TextField
            label="PDF Link"
            fullWidth
            margin="dense"
            value={newPublicationInfo.pdfLink}
            onChange={(e) => setNewPublicationInfo({ ...newPublicationInfo, pdfLink: e.target.value })}
          />
          <TextField
            label="Publication Date"
            fullWidth
            margin="dense"
            type="date"
            value={newPublicationInfo.publicationDate}
            onChange={(e) => setNewPublicationInfo({ ...newPublicationInfo, publicationDate: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSavePublicationInfo} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isEditDialogOpen} onClose={handleCancelEdit}>
        <DialogTitle>Edit Publication Information</DialogTitle>
        <DialogContent>
          {/* Display existing publication info */}
          {editedPublicationInfo && (
            <Box>
              <TextField
                label="Title"
                fullWidth
                margin="dense"
                value={newPublicationInfo.title}
                onChange={(e) => setNewPublicationInfo({ ...newPublicationInfo, title: e.target.value })}
              />
              <TextField
                label="Authors"
                fullWidth
                margin="dense"
                value={newPublicationInfo.authors}
                onChange={(e) => setNewPublicationInfo({ ...newPublicationInfo, authors: e.target.value })}
              />
              <TextField
                label="Journal"
                fullWidth
                margin="dense"
                value={newPublicationInfo.journal}
                onChange={(e) => setNewPublicationInfo({ ...newPublicationInfo, journal: e.target.value })}
              />
              <TextField
                label="PDF Link"
                fullWidth
                margin="dense"
                value={newPublicationInfo.pdfLink}
                onChange={(e) => setNewPublicationInfo({ ...newPublicationInfo, pdfLink: e.target.value })}
              />
              <TextField
                label="Publication Date"
                fullWidth
                margin="dense"
                type="date"
                value={newPublicationInfo.publicationDate}
                onChange={(e) => setNewPublicationInfo({ ...newPublicationInfo, publicationDate: e.target.value })}
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

export default PublicationInfo;
