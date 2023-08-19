import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DateComponent from '../../../components/DateComponent';
import { IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DeleteConfirmationDialogue from '../../../components/DeleteConfirmationDialogue';

function SkillInfoTable({ skillInfo, handleDeleteSkillInfo, handleEditSkillInfo, setIsDeleteConfirmationOpen, handleCancelDelete, isDeleteConfirmationOpen }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Expertise Level</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {skillInfo.map((info) => (
            <TableRow key={info.skill_id}>
              <TableCell>{`${info.skill_name}`}</TableCell>
              <TableCell>{`${info.expertise_level}`}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => handleEditSkillInfo(info)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => setIsDeleteConfirmationOpen(true)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
              <DeleteConfirmationDialogue
                isOpen={isDeleteConfirmationOpen}
                onClose={handleCancelDelete}
                onDelete={() => handleDeleteSkillInfo(info.skill_id)}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SkillInfoTable;
