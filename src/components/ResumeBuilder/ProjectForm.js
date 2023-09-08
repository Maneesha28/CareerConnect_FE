import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';

const ProjectForm = ({ projects, handleChange }) => {
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
            <TableCell>
              <TextField
                name={row.title}
                value={row.title || ''}
                onChange={handleChange}
              />
            </TableCell>
            <TableCell>
              <TextField
                name={row.description}
                value={row.description || ''}
                onChange={handleChange}
              />
            </TableCell>
            <TableCell>
              <TextField
                name={row.technologies}
                value={row.technologies || ''}
                onChange={handleChange}
              />
            </TableCell>
            <TableCell>
              <TextField
                name={row.link}
                value={row.link || ''}
                onChange={handleChange}
              />
            </TableCell>
            <TableCell>
              <TextField
                name={row.start_date}
                value={new Date(row.start_date).toLocaleDateString('en-CA') || ''}
                onChange={handleChange}
                type='date'
              />
            </TableCell>
            <TableCell>
              <TextField
                name={row.end_date}
                value={new Date(row.end_date).toLocaleDateString('en-CA') || ''}
                onChange={handleChange}
                type='date'
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      </Table>
    </div>
  );
};

export default ProjectForm;
