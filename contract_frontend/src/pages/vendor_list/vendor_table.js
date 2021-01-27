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
import Chip from '@material-ui/core/Chip';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DoneIcon from '@material-ui/icons/Done';

const columns = [
  { id: 'supp_name', label: 'Supplier Name', minWidth: 100 },
  { id: 'active', label: 'Active', minWidth: 100 },
  {
    id: 'contact_person',
    label: 'Contact Person Information',
    minWidth: 100,
  },
  {
    id: 'supplier_address',
    label: 'Supplier Address',
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
    minWidth: 100,
  },
];



const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  tableHead: {
    color: "#fff",
  },
  active: {
    backgroundColor:"#4CAF50",
    color:"#fff",
  },
  inactive: {
    backgroundColor:"#F44336",
    color:"#fff",
  },
  icon:{
    color: '#fff',
  },
  customTable: {
    "& .MuiTableCell-stickyHeader": {
      backgroundColor: "#4782DA" 
    }
  },
});



const VendorListTable = ({rows, count, rowsPerPage,setRowsPerPage, page, setPage}) => {
  const classes = useStyles();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log(event.target.value);
    setRowsPerPage(event.target.value);
    setPage(0);
  };
  console.log(rowsPerPage);
  
  console.log(rows);

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" classes={{root: classes.customTable}}>
          <TableHead className={classes.tableHead}  >
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, color: "#fff", }}
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
              <TableCell scope="row">
                {row.supp_name}
              </TableCell>
              <TableCell scope="row">
                {JSON.stringify(row.active) === "true" && (
                          <Chip
                          label="Active"
                          className={classes.active}
                          size="small"
                            mr={1}
                            mb={1}
                            icon={<DoneIcon className={classes.icon} />}
                        />
                        )}
                        {JSON.stringify(row.active) === "false" && (
                          <Chip
                          icon={<HighlightOffIcon className={classes.icon} />}
                          label="Inactive"
                          className={classes.inactive}
                          size="small"
                            mr={1}
                            mb={1}
                        />
                        )}
                        
              </TableCell>
              <TableCell style={{ width: 300 }} align="left">
                {row.contact_name}<br />
                {row.contact_email}<br />
                {row.mobile}
              </TableCell>
              <TableCell style={{ width: 250 }} align="left">
                {row.address_line} <br />
                {row.address_state} <br />
                {row.supp_city}, {row.supplier_country}
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                {row.abn}
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                {row.primary_buyer_contact.first_name}
              </TableCell>
              
              
            </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
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

export default VendorListTable;