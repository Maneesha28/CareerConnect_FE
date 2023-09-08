import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';

const PublicationForm = ({ publications, handleChange }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleCheckboxChange = (event, id) => {
    if (event.target.checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    }
  };

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
            <TableCell>
              <TextField
                name={row.title}
                value={row.title || ''}
                onChange={handleChange}
              />
            </TableCell>
            <TableCell>
              <TextField
                name={row.authors}
                value={row.authors || ''}
                onChange={handleChange}
              />
            </TableCell>
            <TableCell>
              <TextField
                name={row.journal}
                value={row.journal || ''}
                onChange={handleChange}
              />
            </TableCell>
            <TableCell>
              <TextField
                name={row.pdf_link}
                value={row.pdf_link || ''}
                onChange={handleChange}
              />
            </TableCell>
            <TableCell>
              <TextField
                name={row.publication_date}
                value={new Date(row.publication_date).toLocaleDateString('en-CA') || ''}
                onChange={handleChange}
                type='date'
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      </Table>
    </div>
  );
};

export default PublicationForm;
