import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { useDispatch, useSelector } from 'react-redux'
import { fetchBUStart } from '../../../../redux/config_bu/config_bu.actions';
import { selectBUList } from '../../../../redux/config_bu/config_bu.selector';
import Modal from '@material-ui/core/Modal';
import BUdelForm from './bu.del.form'
import Fade from '@material-ui/core/Fade';

const columns = [
  { id: 'name', label: 'Available Business Units', minWidth: 170 },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
    },
    table1: {
        minWidth: '35em',
        maxHeight: 300,
        overflowY: 'auto',
    },
    tablecell: {
        fontSize: "1.1em",
    },
    delIcon: {
        fontSize: '2em',
        '&:hover': {
            cursor: 'pointer',
            color: '#D90429',
        }
    },
}));

export default function StickyHeadTable({rows}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
 
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState({});


  const handleOpen = (id) => {
    setOpen(
        {
            [`setOpen-${id}`]: true
        }
    );
};

const handleClose = () => {
    setOpen(false);
};

const body = (rows) => (
    <div style={modalStyle} className={classes.paper}>
        <BUdelForm setOpen={setOpen} rows={rows} />
    </div>
);

const handleBackdropClick = () => {
    setOpen(false);
};



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function rand() {
    return Math.round(Math.random() * 10) - 10;
}

function getModalStyle() {
    const top = 40 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.table1} component={Paper} style={{ marginTop: "1.5em" }}>
        <Table stickyHeader aria-label="sticky table" classes={{root: classes.customTable}}>
          
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow key={row.id}>
                            <TableCell component="th" scope="row" className={classes.tablecell}>
                                {row.bussname}
                            </TableCell>
                            <TableCell>

                                <DeleteForeverIcon onClick={() => handleOpen(row.id)} fontSize="default" className={classes.delIcon} />


                                <Modal
                                    aria-labelledby="transition-modal-title"
                                    aria-describedby="transition-modal-description"
                                    className={classes.modal}
                                    open={open[`setOpen-${row.id}`]}
                                    onClose={handleClose}
                                    closeAfterTransition
                                    onBackdropClick={handleBackdropClick}
                                    BackdropProps={{
                                        timeout: 500,
                                    }}

                                >
                                    <Fade in={open}>
                                        {body(row)}
                                    </Fade>
                                </Modal>
                            </TableCell>
                        </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
