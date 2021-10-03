import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import { DeleteRounded } from '@material-ui/icons';
import { useClientData } from '../../../context/ClientContext';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  delBtn: {
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[800],
    },
    color: red[50],
  },
}));

export default function DeleteRows({ setselectedRows, selectedRows }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { deleteClients } = useClientData();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose1 = (e) => {
    setOpen(false);
  };

  const deleteRows = async () => {
    const res = await deleteClients(selectedRows);
    console.log('result here: ',res);
    setselectedRows([]);
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleClickOpen}>
        <DeleteRounded />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose1}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Delete Clients</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>
              {' '}
              All the clients with the below Client Id(s) will be deleted{' '}
            </Typography>
            {selectedRows.map((item, i) => (
              <Typography
                display="inline"
                variant="subtitle1"
                color="secondary"
                key={i}
              >
                {i !== 0 ? ', ' : ''}
                {item}
              </Typography>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            value="No"
            onClick={handleClose1}
            variant="outlined"
            color="primary"
          >
            No
          </Button>
          <Button
            value="Yes"
            variant="contained"
            onClick={deleteRows}
            className={classes.delBtn}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
