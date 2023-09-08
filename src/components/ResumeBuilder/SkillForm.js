import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';

const SkillForm = ({ skills, handleChange }) => {
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
            <TableCell>Name</TableCell>
            <TableCell>Expertise Level</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {skills.map((row) => (
          <TableRow key={row.skill_id}>
            <TableCell>
              <Checkbox
                checked={selectedRows.includes(row.skill_id)}
                onChange={(event) => handleCheckboxChange(event, row.skill_id)}
              />
            </TableCell>
            <TableCell>
              <TextField
                name={row.skill_name}
                value={row.skill_name || ''}
                onChange={handleChange}
              />
            </TableCell>
            <TableCell>
              <TextField
                name={row.expertise_level}
                value={row.expertise_level || ''}
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

export default SkillForm;
