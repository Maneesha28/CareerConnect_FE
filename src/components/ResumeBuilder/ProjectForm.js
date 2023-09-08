import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';

const ProjectForm = ({ projects, handleChange, setSelectedProjects }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleCheckboxChange = (event, id) => {
    if (event.target.checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    }
  };

  useEffect(() => {
    //add selected row projects to selectedProjects
    setSelectedProjects(projects.filter((row) => selectedRows.includes(row.project_id)));
  }, [selectedRows]);

  return (
    <div>
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
