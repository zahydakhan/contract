import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import axios from '../../utils1.js/axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchROWSStart, addROWSStart } from '../../redux/vendor/vendor.actions';

const columnss = [
  { id: 'supp_name', label: 'Supplier Name', minWidth: 100 },
  { id: 'active', label: 'Active', minWidth: 100 },
  {
    id: 'contact_person',
    label: 'Contact Person Information',
    minWidth: 100,
  },
  {
    id: 'abn',
    label: 'ABN',
    minWidth: 100,
  },
  {
    id: 'buyer_contact',
    label: 'Buyer Contact Information',
    minWidth: 170,
  },
];


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);
  const [rows, setRows] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const dispatch = useDispatch()

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log(event.target.value);
    const newVal = parseInt(event.target.value);
    
    
    setRowsPerPage(event.target.value);
    setPage(0);
  };
  console.log(rowsPerPage);

    useEffect(() => {
		axios.get(`/vendor/vendorlist/?p=${page+1}&records=${rowsPerPage}`).then((res) => {

			console.log(res.data);
            console.log(res.data.results);
            //console.log(res.data.count);
            setCount(res.data.count);
            setRows(res.data.results)
            //setPage(res.data.next);
            //setPagenew(res.data);
		});
  }, [page, rowsPerPage]);
  
  console.log(rows);

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.supp_name}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.abn}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.address_state}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.address_line}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.address_suburb}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.buyer_annual_spend_apprx}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.company_email}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.contact_email}
              </TableCell>
            </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2, 5, 8]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
