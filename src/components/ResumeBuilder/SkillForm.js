import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';

const SkillForm = ({ skills, handleChange, setSelectedSkills }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleCheckboxChange = (event, id) => {
    if (event.target.checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    }
  };

  useEffect(() => {
    //add selected row skills to selectedSkills
    setSelectedSkills(skills.filter((row) => selectedRows.includes(row.skill_id)));
  }, [selectedRows]);

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
            <TableCell>{row.skill_name}</TableCell>
            <TableCell>{row.expertise_level}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      </Table>
    </div>
  );
};

export default SkillForm;
