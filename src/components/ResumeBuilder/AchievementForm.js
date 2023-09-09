import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const AchievementForm = ({ achievements, setSelectedAchievements }) => {
  const [selectedRows, setSelectedRows] = useState(achievements.map(row => row.achievement_id)); // Initially, all rows are selected

  const handleCheckboxChange = (event, id) => {
    if (event.target.checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    }
  };

  useEffect(() => {
    // Add selected row achievements to setSelectedAchievements
    setSelectedAchievements(achievements.filter((row) => selectedRows.includes(row.achievement_id)));
  }, [selectedRows]);

  const handleSelectAll = () => {
    if (selectedRows.length === achievements.length) {
      // If all rows are selected, clear the selection
      setSelectedRows([]);
    } else {
      // Otherwise, select all rows
      setSelectedRows(achievements.map(row => row.achievement_id));
    }
  };

  return (
    <div>
      <Button onClick={handleSelectAll}>
        {selectedRows.length === achievements.length ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Select</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Organizer</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {achievements.map((row) => (
          <TableRow key={row.achievement_id}>
            <TableCell>
              <Checkbox
                checked={selectedRows.includes(row.achievement_id)}
                onChange={(event) => handleCheckboxChange(event, row.achievement_id)}
              />
            </TableCell>
            <TableCell>{row.achievement_name}</TableCell>
            <TableCell>{row.position}</TableCell>
            <TableCell>{row.organized_by}</TableCell>
            <TableCell>{new Date(row.achievement_date).toLocaleDateString('en-CA')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      </Table>
    </div>
  );
};

export default AchievementForm;
