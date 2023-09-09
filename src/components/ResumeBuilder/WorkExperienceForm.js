import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const WorkExperienceForm = ({ workExperience, setSelectedWorkExperience }) => {
  // Initially, all rows are selected
  const [selectedRows, setSelectedRows] = useState(workExperience.map(row => row.exp_id));

  const handleCheckboxChange = (event, id) => {
    if (event.target.checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    }
  };

  useEffect(() => {
    // Add selected row workExperience to setSelectedWorkExperience
    setSelectedWorkExperience(workExperience.filter((row) => selectedRows.includes(row.exp_id)));
  }, [selectedRows]);

  const handleSelectAll = () => {
    if (selectedRows.length === workExperience.length) {
      // If all rows are selected, clear the selection
      setSelectedRows([]);
    } else {
      // Otherwise, select all rows
      setSelectedRows(workExperience.map(row => row.exp_id));
    }
  };

  return (
    <div>
      <Button onClick={handleSelectAll}>
        {selectedRows.length === workExperience.length ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
      </Button>
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
