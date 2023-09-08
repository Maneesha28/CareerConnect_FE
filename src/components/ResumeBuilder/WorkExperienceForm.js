// WorkExperienceForm.js
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';

const WorkExperienceForm = ({ workExperience, handleChange }) => {
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
            <TableCell>Designation</TableCell>
            <TableCell>Organization</TableCell>
            <TableCell>Employment Type</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {workExperience.map((row) => (
          <TableRow key={row.exp_id}>
            <TableCell>
              <Checkbox
                checked={selectedRows.includes(row.exp_id)}
                onChange={(event) => handleCheckboxChange(event, row.exp_id)}
              />
            </TableCell>
            <TableCell>
              <TextField
                name={row.designation}
                value={row.designation || ''}
                onChange={handleChange}
              />
            </TableCell>
            <TableCell>
              <TextField
                name={row.organization}
                value={row.organization || ''}
                onChange={handleChange}
              />
            </TableCell>
            <TableCell>
              <TextField
                name={row.employment_type}
                value={row.employment_type || ''}
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

export default WorkExperienceForm;
