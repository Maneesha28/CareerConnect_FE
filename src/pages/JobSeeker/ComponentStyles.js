import { TableCell, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#800080",
    color: theme.palette.common.white,
    fontSize: 22,
    fontWeight: 700,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 20,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const commonStyles = {
  box: {
    display: 'flex',
    alignItems: 'center',
    padding: 2, 
    borderBottom: '1px solid #ccc'
  },
  label: {
    minWidth: '120px', // Adjust width as needed
    marginRight: '16px', // Adjust margin as needed
  },
  typography: {
    fontSize: '20px', // Adjust font size as needed
    fontWeight: 'bold'
  },
  
};

