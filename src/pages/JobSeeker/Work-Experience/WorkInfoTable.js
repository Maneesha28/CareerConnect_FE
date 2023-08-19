import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DateComponent from '../../../components/DateComponent';
import { IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DeleteConfirmationDialogue from '../../../components/DeleteConfirmationDialogue';


function WorkInfoTable({ workInfo, handleDeleteWorkInfo, handleEditWorkInfo, setIsDeleteConfirmationOpen, handleCancelDelete, isDeleteConfirmationOpen }) {
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Designation</TableCell>
              <TableCell>Organization</TableCell>
              <TableCell>Employment Type</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workInfo.map((info) => (
              <TableRow key={info.exp_id}>
                <TableCell>{`${info.designation}`}</TableCell>
                <TableCell>{`${info.organization}`}</TableCell>
                <TableCell>{`${info.employment_type}`}</TableCell>
                <TableCell>
                  <DateComponent isoDate={info.start_date} />
                </TableCell>
                <TableCell>
                  <DateComponent isoDate={info.end_date} />
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditWorkInfo(info)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => setIsDeleteConfirmationOpen(true)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <DeleteConfirmationDialogue
                  isOpen={isDeleteConfirmationOpen}
                  onClose={handleCancelDelete}
                  onDelete={() => handleDeleteWorkInfo(info.exp_id)}
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default WorkInfoTable;
