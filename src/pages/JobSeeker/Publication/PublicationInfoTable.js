import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DateComponent from '../../../components/DateComponent';
import { IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DeleteConfirmationDialogue from '../../../components/DeleteConfirmationDialogue';


function PublicationInfoTable({ publicationInfo, handleDeletePublicationInfo, handleEditPublicationInfo, setIsDeleteConfirmationOpen, handleCancelDelete, isDeleteConfirmationOpen }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Paper Title</TableCell>
            <TableCell>Author(s)</TableCell>
            <TableCell>Journal</TableCell>
            <TableCell>Paper Link</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {publicationInfo.map((info) => (
            <TableRow key={info.publication_id}>
              <TableCell>{`${info.title}`}</TableCell>
              <TableCell>{`${info.authors}`}</TableCell>
              <TableCell>{`${info.journal}`}</TableCell>
              <TableCell>
                <a href={`http://${info.pdf_link}`} target="_blank" rel="noopener noreferrer">{info.pdf_link}</a>
              </TableCell>
              <TableCell>
                <DateComponent isoDate={info.publication_date} />
              </TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => handleEditPublicationInfo(info)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => setIsDeleteConfirmationOpen(true)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
              <DeleteConfirmationDialogue
                isOpen={isDeleteConfirmationOpen}
                onClose={handleCancelDelete}
                onDelete={() => handleDeletePublicationInfo(info.publication_id)}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PublicationInfoTable;
