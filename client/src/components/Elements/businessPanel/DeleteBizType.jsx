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
import { useBusinessData } from '../../../context/BusinessContext';
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

export default function DeleteRows({ setselectedRows, selectedRows, selectedClient, getData }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { removeClientBizType } = useBusinessData();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose1 = (e) => {
    setOpen(false);
  };

  const deleteRows = async () => {
    if (selectedClient) await removeClientBizType(selectedRows, selectedClient);
    setselectedRows([]);
    getData();
  };

  return (
    <>
      <Button onClick={handleClickOpen}>
        <DeleteRounded /> Delete
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
              All the Biz types with the below BizTypeID(s) will be deleted{' '}
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
