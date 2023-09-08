// WorkExperienceForm.js
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';

const WorkExperienceForm = ({ workExperience, handleChange, setSelectedWorkExperience }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleCheckboxChange = (event, id) => {
    if (event.target.checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    }
  };

  useEffect(() => {
    //add selected row workExperience to selectedWorkExperience
    setSelectedWorkExperience(workExperience.filter((row) => selectedRows.includes(row.exp_id)));
  }, [selectedRows]);

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
            <TableCell>{row.designation}</TableCell>
            <TableCell>{row.organization}</TableCell>
            <TableCell>{row.employment_type}</TableCell>
            <TableCell>{new Date(row.start_date).toLocaleDateString('en-CA')}</TableCell>
            <TableCell>{row.end_date ? new Date(row.end_date).toLocaleDateString('en-CA') : 'Present'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      </Table>
    </div>
  );
};

export default WorkExperienceForm;
