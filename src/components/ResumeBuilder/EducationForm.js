import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';

const EducationForm = ({ education, handleChange, setSelectedEducation }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleCheckboxChange = (event, id) => {
    if (event.target.checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    }
  };

  useEffect(() => {
    //add selected row educations to selectedEducation
    setSelectedEducation(education.filter((row) => selectedRows.includes(row.degree_id)));
  }, [selectedRows]);

  const divStyle = {
    fontSize: '24px',
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
