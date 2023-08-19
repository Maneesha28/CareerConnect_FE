import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DateComponent from '../../../components/DateComponent';
import { IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteConfirmationDialogue from '../../../components/DeleteConfirmationDialogue';


function EduInfoTable({ eduInfo, handleDeleteEduInfo, handleEditEduInfo, setIsDeleteConfirmationOpen, handleCancelDelete, isDeleteConfirmationOpen }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Degree</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Institution</TableCell>
            <TableCell>Result</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {eduInfo.map((info) => (
            <TableRow key={info.degree_id}>
              <TableCell>{`${info.degree}`}</TableCell>
              <TableCell>{`${info.subject}`}</TableCell>
              <TableCell>{`${info.institution}`}</TableCell>
              <TableCell>{`${info.result}`}</TableCell>
              <TableCell>
                <DateComponent isoDate={info.start_date} />
              </TableCell>
              <TableCell>
                <DateComponent isoDate={info.end_date} />
              </TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => handleEditEduInfo(info)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => setIsDeleteConfirmationOpen(true)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
              <DeleteConfirmationDialogue
                isOpen={isDeleteConfirmationOpen}
                onClose={handleCancelDelete}
                onDelete={() => handleDeleteEduInfo(info.degree_id)}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EduInfoTable;
