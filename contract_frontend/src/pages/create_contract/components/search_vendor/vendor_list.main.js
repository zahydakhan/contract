import React, {useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import VendorListTable from './vendor_table';
import axios from '../../../../utils1.js/axios';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import FindInPageIcon from '@material-ui/icons/FindInPage';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  search:{
    minWidth: 300,
  }
}));

export default function FormPropsTextFields() {
  const classes = useStyles();
  const [search, setSearch] = React.useState('');
  const [searchId, setSearchId] = React.useState('');
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [count, setCount] = React.useState(0);
  const [filter, setFilter] = React.useState('');

  const handleSelectChange = (event) => {
    event.preventDefault();
    setFilter(event.target.value);
    console.log(event.target.value, filter);
    axios.get(`/vendor/vendorlist/?active=${event.target.value}`).then((res) => {
      console.log(res);
      if(res.data){
        setRows(res.data.results);
        setCount(res.data.count);
      }
    });
    
  };

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

  const handleChange = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value);

    axios.get(`/vendor/vendorlist/?search=${search}`).then((res) => {

      console.log(res.data);
      if(res.data){
        setRows(res.data.results);
        setCount(res.data.count);
      }
		});
  };
  
  const handleSearchID = (event) => {
    setSearchId(event.target.value);
    console.log(event.target.value);

    axios.get(`/vendor/vendorlist/?id=${event.target.value}`).then((res) => {

      console.log(res.data);
      if(res.data){
        setRows(res.data.results);
        setCount(res.data.count);
      }
		});
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Grid container >
        <Grid container>
          <Grid item>
            <FindInPageIcon fontSize='small' />
          </Grid>
          <Grid item>
          <Typography variant='h4' >Select Vendor</Typography>
          </Grid>
        </Grid>
        
      <Grid container justify='space-between' alignItems='flex-end' style={{marginBottom: '2em'}}>
      <Grid item>
        <Grid container direction='column'>
          <Grid item>
          <TextField id="standard-search" label="Search by Supplier ID" type="search" className={classes.searchbyid} onChange={handleSearchID} />
          </Grid>
          <Grid item>
        <TextField id="search-by-trade" label="Search by Supplier Name, Tags or Trade" type="search" className={classes.search} onChange={handleChange} />
        </Grid>
        </Grid>
        </Grid>

        

        <Grid item>
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Active Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filter}
          onChange={handleSelectChange}
        >
          <MenuItem value={'True'}>Active</MenuItem>
          <MenuItem value={'False'}>InActive</MenuItem>
        </Select>
      </FormControl>
        </Grid>
        
      </Grid>

      
        <VendorListTable rows={rows} count={count} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} page={page} setPage={setPage}/>
      </Grid>
    </form>
  );
}
