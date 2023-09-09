import React, { useState, useEffect } from 'react';
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

const SkillForm = ({ skills, setSelectedSkills }) => {
  // Initially, all rows are selected
  const [selectedRows, setSelectedRows] = useState(skills.map(row => row.skill_id));

  const handleCheckboxChange = (event, id) => {
    if (event.target.checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    }
  };

  useEffect(() => {
    // Add selected row skills to setSelectedSkills
    setSelectedSkills(skills.filter((row) => selectedRows.includes(row.skill_id)));
  }, [selectedRows]);

  const handleSelectAll = () => {
    if (selectedRows.length === skills.length) {
      // If all rows are selected, clear the selection
      setSelectedRows([]);
    } else {
      // Otherwise, select all rows
      setSelectedRows(skills.map(row => row.skill_id));
    }
  };

  return (
    <div>
      <Button onClick={handleSelectAll}>
        {selectedRows.length === skills.length ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
      </Button>
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
