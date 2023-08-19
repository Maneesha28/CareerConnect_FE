import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const DeleteConfirmationDialogue = ({ isOpen, onClose, onDelete}) => {

  return (
    <Dialog open={isOpen} onClose={onClose} sx={{padding: 6}}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent sx={{fontSize: 28}}>
        Are you sure you want to delete this? This action cannot be undone.
      </DialogContent>
      <DialogActions>
        <Button onClick={onDelete} color="secondary">
          Delete
        </Button>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialogue;
