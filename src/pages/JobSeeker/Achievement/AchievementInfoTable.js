import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DateComponent from '../../../components/DateComponent';
import { IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DeleteConfirmationDialogue from '../../../components/DeleteConfirmationDialogue';


function AchievementInfoTable({ isLoggedInUser, achievementInfo, handleDeleteAchievementInfo, handleEditAchievementInfo, setIsDeleteConfirmationOpen, handleCancelDelete, isDeleteConfirmationOpen }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Organizer</TableCell>
            <TableCell>Date</TableCell>
            {isLoggedInUser && <TableCell>Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {achievementInfo.map((info) => (
            <TableRow key={info.achievement_id}>
              <TableCell>{`${info.achievement_name}`}</TableCell>
              <TableCell>{`${info.position}`}</TableCell>
              <TableCell>{`${info.organized_by}`}</TableCell>
              <TableCell>
                <DateComponent isoDate={info.achievement_date} />
              </TableCell>
              {isLoggedInUser && 
              <TableCell>
                <IconButton color="primary" onClick={() => handleEditAchievementInfo(info)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => setIsDeleteConfirmationOpen(true)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>}
              <DeleteConfirmationDialogue
                isOpen={isDeleteConfirmationOpen}
                onClose={handleCancelDelete}
                onDelete={() => handleDeleteAchievementInfo(info.achievement_id)}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AchievementInfoTable;
