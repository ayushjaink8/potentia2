import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';
import { useFamilyPanelData } from '../../../context/FamilyPanelContext';


const useStyles = makeStyles((theme) => ({
  NodeBtnColor: {
    border: '1px solid #008000',
    color: 'black',
    '&:hover': {
      // backgroundColor: theme.palette.secondary.main,
      backgroundColor: "#f3d98b",
      border: '2px solid #008000',
    },
    textTransform: 'capitalize',
  },
}));



const NodeMember = ({setUpdateDataToggle, FamilyId, personID, personName, relation, notes}) => {

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [Notes, setNotes] = useState('');
  const { updateMemberNotes } = useFamilyPanelData();


  useEffect(() => {

    if(notes) setNotes(notes);
    else setNotes('');

  }, [personID, open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange = (e) => {
    setNotes(e.target.value);
  };

  const handleClose = (e) => {
    setOpen(false);
  }

  const saveNotes = async (e)=>{

    e.preventDefault();

    let res = await updateMemberNotes(FamilyId, personID, Notes);
    if (res) {
      let msg = res.message;
      setUpdateDataToggle(1);
      alert(`Notes ${msg}`);
      handleClose();
    }

  }


  return (
  <>

    <Tooltip title={relation} placement="top" arrow>
      <Button className={classes.NodeBtnColor} size="small" variant="outlined" onClick={handleClickOpen}>
        {personName}
      </Button>
    </Tooltip>


    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth="true"
      maxWidth="sm"
      aria-labelledby="form-dialog-title"
    >

      <DialogTitle id="form-dialog-title">
        {personName} Notes:
        <Box style={{ float: 'right' }}>
          <Button
            value="close"
            onClick={handleClose}
            color="secondary"
            variant="contained"
            style={{ minWidth: 'fit-content', fontWeight: '800' }}
          >
            X
          </Button>
        </Box>
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          <form className={classes.root} onSubmit={saveNotes} >
            <Box display="flex" justifyContent="center" flexDirection='column'>

              <TextField
                id="notes_field"
                label="Add Client Notes"
                name="textValue"
                multiline
                inputProps={{ maxLength: 500 }}
                rows={10}
                value={Notes}
                onChange={handleChange}
                variant="outlined"
                required
              />

              <Box pt={2} display="flex" justifyContent='center'>
                <Button
                  variant="contained"
                  type="submit"
                  color="secondary"
                  textAlign="center"
                >
                  SAVE
                </Button>
              </Box>

            </Box>

          </form>
        </DialogContentText>
      </DialogContent>

    </Dialog>


  </>);
}

export default NodeMember;