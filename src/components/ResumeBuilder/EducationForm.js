// EducationForm.js
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';

const EducationForm = ({ education, handleChange }) => {
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
            <TableCell>Degree</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Institution</TableCell>
            <TableCell>Result</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {education.map((row) => (
          <TableRow key={row.degree_id}>
            <TableCell>
              <Checkbox
                checked={selectedRows.includes(row.degree_id)}
                onChange={(event) => handleCheckboxChange(event, row.degree_id)}
              />
            </TableCell>
            <TableCell>
              <TextField
                name={row.degree}
                value={row.degree || ''}
                onChange={handleChange}
              />
            </TableCell>
            <TableCell>
              <TextField
                name={row.subject}
                value={row.subject || ''}
                onChange={handleChange}
              />
            </TableCell>
            <TableCell>
              <TextField
                name={row.institution}
                value={row.institution || ''}
                onChange={handleChange}
              />
            </TableCell>
            <TableCell>
              <TextField
                name={row.result}
                value={row.result || ''}
                onChange={handleChange}
              />
            </TableCell>
            <TableCell>
              <TextField
                name={row.start_date}
                value={new Date(row.start_date).toLocaleDateString('en-CA') || ''}
                onChange={handleChange}
                type='date'
              />
            </TableCell>
            <TableCell>
              <TextField
                name={row.end_date}
                value={new Date(row.end_date).toLocaleDateString('en-CA') || ''}
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

export default EducationForm;
