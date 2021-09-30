import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/styles';
import { InputAdornment, Typography } from '@material-ui/core';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import Box from '@material-ui/core/Box';
import { useClientData } from '../../../context/ClientContext';

const useStyles = makeStyles((theme) => ({
  btnColor: {
    backgroundColor: theme.palette.secondary.light,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
    textTransform: 'capitalize',
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function FormDialog({ cdata, sLevel }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [pname, setpname] = React.useState(cdata?.personName);
  const [dname, setdname] = React.useState('');

  const { editName } = useClientData();

  useEffect(() => {
    // console.log('cdata: ', cdata.personID, cdata.personName, cdata)
    setdname(cdata?.personName);
  }, [cdata]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose1 = (e) => {
    setpname(cdata.personName);
    setOpen(false);
  };
  const handleClose2 = (e) => {
    // const changeName = async () => {
    //   const res = await editName(cdata.id, pname);
    //   if (res) {
    //     setdname(pname);
    //     setOpen(false);
    //   }
    // };
    // changeName();
    alert('Change Name Function is yet to be added !')
  };

  const handleChange = (e) => {
    setpname(e.target.value);
    // console.log(pname);
  };

  return (
    <>

      {cdata ? (
        parseInt(sLevel) === -100 ? (
          <Box p={1}>
            <Button
              className={classes.btnColor}
              variant="contained"
              onClick={handleClickOpen}
            >
              <Box>
                <Typography component="p" align="center">
                  {dname}{' '}
                </Typography>

                <Typography
                  variant="caption"
                  display="block"
                  align="center"
                >
                  {/* ( {cdata.relation} ) */}

                  {Math.abs(parseInt(cdata.gLevel)) > 0 ? (
                    <>
                      Level: {Math.abs(parseInt(cdata.gLevel))}
                    </>
                  ) : (
                    <>
                        Level: {Math.abs(parseInt(cdata.siblingLevel))}
                    </>
                  )}

                </Typography>
              </Box>
            </Button>
          </Box>
        ) : (
          <>
            {parseInt(sLevel) === Math.abs(parseInt(cdata.siblingLevel)) ? (
              <>
                <Box p={1}>
                  <Button
                    className={classes.btnColor}
                    variant="contained"
                    onClick={handleClickOpen}
                  >
                    <Box>
                      <Typography component="p" align="center">
                        {dname}{' '}
                      </Typography>

                      <Typography
                        variant="caption"
                        display="block"
                        align="center"
                      >

                        {/* ( {cdata.relation} ) */}

                        {Math.abs(parseInt(cdata.level)) > 0 ? (
                          <>
                            Level: {Math.abs(parseInt(cdata.level))}
                          </>

                        ) : (
                          <>
                            Level: {Math.abs(parseInt(cdata.siblingLevel))}
                          </>
                        )}

                      </Typography>
                    </Box>
                  </Button>
                </Box>
              </>
            ) : (
              <></>
            )}
          </>
        )
      ) : (
        <></>
      )}


      <Dialog
        open={open}
        onClose={handleClose1}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Person</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Change the name of the person below
          </DialogContentText>
          <div className={classes.margin}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Edit Name"
              type="email"
              value={pname}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EditRoundedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button value="cancel" onClick={handleClose1} color="primary">
            Cancel
          </Button>
          <Button value="change" onClick={handleClose2} color="primary">
            Change
          </Button>
        </DialogActions>
      </Dialog>



    </>
  );
}
