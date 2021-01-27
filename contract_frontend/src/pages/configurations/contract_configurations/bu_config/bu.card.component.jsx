import React, {useEffect}  from "react";
import { makeStyles } from "@material-ui/core/styles";
import ConfigBUTable from "./bu.table2.component";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import BusinessIcon from '@material-ui/icons/Business';
import Modal from '@material-ui/core/Modal';
import BUAddForm from './bu.form';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux'
import { fetchBUStart } from '../../../../redux/config_bu/config_bu.actions';
import { selectBUList } from '../../../../redux/config_bu/config_bu.selector';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #fff',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    table: {
        width: '100%',
        maxHeight: 650,
    },
}));


function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

export default function ConfigBUMainPage() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const buData = useSelector(state => selectBUList(state))

    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [searchResult, setSearchResult] = React.useState("");
    const [rows, setRows] = React.useState([]);


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <BUAddForm setOpen={setOpen} />
        </div>
    );

    useEffect(() => {
        dispatch(fetchBUStart())
        
        if (searchResult) {
            const filteredData = buData.filter((cty) =>
              cty.bussname.toLowerCase().includes(searchResult.toLowerCase())
            );
            console.log(filteredData);
            setRows(filteredData);
          } else {
            setRows(buData);
          }
    }, [searchResult])

    const handleChange = (event) => {
        console.log(event.target.value);
        setSearchResult(event.target.value);
      };

    return (
        <React.Fragment>
            <Grid container sm={6} xs={12} justify='space-between'>
                <Grid container item>
                    <Grid container justify="space-between" style={{ minWidth: '35em' }}>
                        <Grid item>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <BusinessIcon fontSize="large" />
                                </Grid>
                                <Grid item>
                                    <Typography variant="h3" style={{ marginLeft: "0.2em" }}>
                                        Business Units
                  </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Button onClick={handleOpen} variant="contained" color="primary">
                                Add BU <AddIcon />
                            </Button>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                            >
                                {body}
                            </Modal>
                        </Grid>
                    </Grid>
                    <Grid item>
                  
                    <TextField id="standard-search" label="Search Business Unit" type="search" className={classes.search} onChange={handleChange} />
                    </Grid>
                </Grid>
                <Grid item>
                    <ConfigBUTable rows={rows} />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
