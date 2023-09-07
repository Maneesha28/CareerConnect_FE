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

  const workExperienceData = [
    { id: 1, company: 'Company A', position: 'Engineer', year: '2018-2020' },
    { id: 2, company: 'Company B', position: 'Manager', year: '2021-2023' },
    // Add more work experience data here
  ];

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Select</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Year</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workExperienceData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Checkbox
                  checked={selectedRows.includes(row.id)}
                  onChange={(event) => handleCheckboxChange(event, row.id)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  label="Company"
                  name={`company_${row.id}`}
                  value={workExperience[`company_${row.id}`] || ''}
                  onChange={handleChange}
                />
              </TableCell>
              <TableCell>
                <TextField
                  label="Position"
                  name={`position_${row.id}`}
                  value={workExperience[`position_${row.id}`] || ''}
                  onChange={handleChange}
                />
              </TableCell>
              <TableCell>
                <TextField
                  label="Year"
                  name={`year_${row.id}`}
                  value={workExperience[`year_${row.id}`] || ''}
                  onChange={handleChange}
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
