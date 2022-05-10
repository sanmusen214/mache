import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

/**
 * @param headdata
 * @param rowsdata
 * @param render
 */
export default function BasicTablemy(props) {
    const headdata=props.headdata||[]
    const rowsdata=props.rowsdata||[]
    const render=props.render||function(e){return e}
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
              {headdata.map((each,index)=>{
                  return <TableCell key={index}>{each}</TableCell>
              })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsdata.map((row) => {
            return render(row)
        })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
