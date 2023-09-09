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

const ProjectForm = ({ projects, setSelectedProjects }) => {
  const [selectedRows, setSelectedRows] = useState(projects.map(row => row.project_id)); // Initially, all rows are selected

  const handleCheckboxChange = (event, id) => {
    if (event.target.checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    }
  };

  useEffect(() => {
    // Add selected row projects to setSelectedProjects
    setSelectedProjects(projects.filter((row) => selectedRows.includes(row.project_id)));
  }, [selectedRows]);

  const handleSelectAll = () => {
    if (selectedRows.length === projects.length) {
      // If all rows are selected, clear the selection
      setSelectedRows([]);
    } else {
      // Otherwise, select all rows
      setSelectedRows(projects.map(row => row.project_id));
    }
  };

  return (
    <div>
      <Button onClick={handleSelectAll}>
        {selectedRows.length === projects.length ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Select</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Technologies</TableCell>
            <TableCell>Link</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {projects.map((row) => (
          <TableRow key={row.project_id}>
            <TableCell>
              <Checkbox
                checked={selectedRows.includes(row.project_id)}
                onChange={(event) => handleCheckboxChange(event, row.project_id)}
              />
            </TableCell>
            <TableCell>{row.title}</TableCell>
            <TableCell>{row.description}</TableCell>
            <TableCell>{row.technologies}</TableCell>
            <TableCell>{row.project_link ? row.project_link : 'n/a'}</TableCell>
            <TableCell>{new Date(row.start_date).toLocaleDateString('en-CA')}</TableCell>
            <TableCell>{row.end_date ? new Date(row.end_date).toLocaleDateString('en-CA') : 'Present'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      </Table>
    </div>
  );
};

export default ProjectForm;
