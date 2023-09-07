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

  const educationData = [
    { id: 1, university: 'University A', degree: 'BSc', year: '2020' },
    { id: 2, university: 'University B', degree: 'MSc', year: '2022' },
    // Add more education data here
  ];

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Select</TableCell>
            <TableCell>University</TableCell>
            <TableCell>Degree</TableCell>
            <TableCell>Year</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {educationData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Checkbox
                  checked={selectedRows.includes(row.id)}
                  onChange={(event) => handleCheckboxChange(event, row.id)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  label="University"
                  name={`university_${row.id}`}
                  value={education[`university_${row.id}`] || ''}
                  onChange={handleChange}
                />
              </TableCell>
              <TableCell>
                <TextField
                  label="Degree"
                  name={`degree_${row.id}`}
                  value={education[`degree_${row.id}`] || ''}
                  onChange={handleChange}
                />
              </TableCell>
              <TableCell>
                <TextField
                  label="Year"
                  name={`year_${row.id}`}
                  value={education[`year_${row.id}`] || ''}
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

export default EducationForm;
