import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';

const AchievementForm = ({ achievements, handleChange, setSelectedAchievements }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleCheckboxChange = (event, id) => {
    if (event.target.checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    }
  };

  useEffect(() => {
    //add selected row achievements to selectedAchievements
    setSelectedAchievements(achievements.filter((row) => selectedRows.includes(row.achievement_id)));
  }, [selectedRows]);

  return (
    <div>
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
