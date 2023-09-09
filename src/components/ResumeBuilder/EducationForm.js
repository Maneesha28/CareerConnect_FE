import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const EducationForm = ({ education, setSelectedEducation }) => {
  const [selectedRows, setSelectedRows] = useState(education.map(row => row.degree_id)); // Initially select all rows

  const handleCheckboxChange = (event, id) => {
    if (event.target.checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    }
  };

  useEffect(() => {
    // Add selected row educations to setSelectedEducation
    setSelectedEducation(education.filter((row) => selectedRows.includes(row.degree_id)));
  }, [selectedRows]);

  const handleSelectAll = () => {
    if (selectedRows.length === education.length) {
      // If all rows are selected, clear the selection
      setSelectedRows([]);
    } else {
      // Otherwise, select all rows
      setSelectedRows(education.map(row => row.degree_id));
    }
  };

  return (
    <div>
      <Button onClick={handleSelectAll}>
        {selectedRows.length === education.length ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
      </Button>
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
              <TableCell>{row.degree}</TableCell>
              <TableCell>{row.subject}</TableCell>
              <TableCell>{row.institution}</TableCell>
              <TableCell>{row.result}</TableCell>
              <TableCell>{new Date(row.start_date).toLocaleDateString('en-CA')}</TableCell>
              <TableCell>{new Date(row.end_date).toLocaleDateString('en-CA')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EducationForm;
