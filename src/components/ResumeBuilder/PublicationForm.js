import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';

const PublicationForm = ({ publications, handleChange, setSelectedPublications }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleCheckboxChange = (event, id) => {
    if (event.target.checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    }
  };

  useEffect(() => {
    //add selected row publications to selectedPublications
    setSelectedPublications(publications.filter((row) => selectedRows.includes(row.publication_id)));
  }, [selectedRows]);

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Select</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Author(s)</TableCell>
            <TableCell>Journal</TableCell>
            <TableCell>Paper Link</TableCell>
            <TableCell>Publication Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {publications.map((row) => (
          <TableRow key={row.publication_id}>
            <TableCell>
              <Checkbox
                checked={selectedRows.includes(row.publication_id)}
                onChange={(event) => handleCheckboxChange(event, row.publication_id)}
              />
            </TableCell>
            <TableCell>{row.title}</TableCell>
            <TableCell>{row.authors}</TableCell>
            <TableCell>{row.journal}</TableCell>
            <TableCell>{row.pdf_link ? row.pdf_link : 'n/a'}</TableCell>
            <TableCell>{new Date(row.publication_date).toLocaleDateString('en-CA')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      </Table>
    </div>
  );
};

export default PublicationForm;
