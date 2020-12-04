import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Context as LogsContext } from "../../context/LogsContext";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ActionLogs = () =>{
  const classes = useStyles();
  const {state:{logs}} = useContext(LogsContext);
  return (
    <div>
      <h2>Logs:</h2>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell align="right">Code</TableCell>
            <TableCell align="right">ID&nbsp;(g)</TableCell>
            <TableCell align="right">Date&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.user}
              </TableCell>
              <TableCell align="right">{row.code}</TableCell>
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
    </div>
  );
}
export default ActionLogs;