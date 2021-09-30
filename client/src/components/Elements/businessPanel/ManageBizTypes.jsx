import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  CardContent,
 } from '@material-ui/core';
 import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { useBusinessData } from '../../../context/BusinessContext';
import {red} from '@material-ui/core/colors'


 const useStyles = makeStyles((theme) => ({
   ManageBizTypesBtn: {
     textTransform: 'capitalize',
     padding: theme.spacing(1),
     fontWeight: '700',
     paddingLeft: theme.spacing(6),
     paddingRight: theme.spacing(6),
   },
   delBtn: {
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[800],
    },
    color: red[50],
    marginLeft: 16,
  },
  root: {
    '& .buttonfield-header': {
      backgroundColor: 'white',
    },
  },
  content:{
    paddingBottom: "0 !important",
  }
}));

export default function ManageBizTypes(){

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [NewBizName, setNewBizName] = useState('')
  const [BizTypeData, setBizTypeData] = useState([])
  const { allBizTypes, deleteBizType, addCustomBizType} = useBusinessData();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setNewBizName(e.target.value);
  }

  const addBizType = (e) => {
    e.preventDefault();
    const res = addCustomBizType(NewBizName);
  }

  const delete_BizType = async (e) => {
    e.preventDefault();
    const id = e.target.parentElement.id;
    const msg = `BizType with ID ${id} will be removed from every client.${'\n'}Are you sure you want to delete?`
    if (window.confirm(msg)) {
      const res = await deleteBizType(id);
    }
  }


  const renderDeleteButton = (params) => {
    return (
      <strong>
        <Button
          id={params.id}
          variant="contained"
          size="small"
          onClick={delete_BizType}
          className={classes.delBtn}
        >
          Delete
        </Button>
      </strong>
    );
  };

  const columns = [
    { field: 'id',
      headerName: 'BizTypeID',
      width: 140,
      editable: false,
    },
    {
      field: 'BizTypeName',
      headerName: 'BizTypeName',
      width: 170,
      editable: false,
    },
    {
      field: '',
      headerClassName: 'buttonfield-header',
      headerName: 'Delete Row',
      width: 100,
      headerAlign: 'right',
      align: 'right',
      renderCell: renderDeleteButton,
      flex: 5,
      disableClickEventBubbling: true,
    },
  ];

  useEffect(()=>{
    const data = [];
    if(allBizTypes?.length){
      for (let i = 0; i < allBizTypes.length; i++) {
        data.push({
          id: allBizTypes[i].BizTypeID,
          BizTypeName: allBizTypes[i].BizTypeName,
        });
      }
    }
    setBizTypeData(data);
  },[allBizTypes])



  return(
    <>
      <Box>


        <Typography align="center">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            width="100%"
          >
            <Button
              id="BizTypeBtn"
              variant="contained"
              color="secondary"
              type="submit"
              className={classes.ManageBizTypesBtn}
              onClick={handleClickOpen}
            >
                Manage BizTypes
            </Button>
          </Box>
        </Typography>


        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth="true"
          maxWidth='sm'
          aria-labelledby="form-dialog-title"
        >

          <DialogTitle id="form-dialog-title">
            Manage BizTypes
            <Box style={{float:'right'}}>
              <Button
                value="close"
                onClick={handleClose}
                color="secondary"
                variant="contained"
                style={{minWidth:"fit-content", fontWeight:"800"}}
              >
                X
              </Button>
            </Box>
          </DialogTitle>



          <DialogContent>
            <DialogContentText>

              <Typography>
                {' '}List of BizTypes currently present in the Database:{' '}
              </Typography>

              <CardContent className={classes.content}>
                {BizTypeData.length === 0 ? (
                  <Typography> No BizTypes Found </Typography>
                ) : (
                  <div style={{ height: '55vh'}} className={classes.root}>
                    <DataGrid
                      rows={BizTypeData}
                      columns={columns}
                    />
                  </div>
                )}
              </CardContent>

            </DialogContentText>
          </DialogContent>


          <Box m={1}>
            <form className={classes.root} onSubmit={addBizType} >
              <Box display="flex" justifyContent="center">

                <Box display="flex">
                  <TextField
                    id="outlined-basic"
                    label="Add New BizType"
                    variant="outlined"
                    onChange={handleChange}
                    required
                  />
                </Box>


                <Box display="flex" m={0.75}>
                  <Button
                    type="submit"
                    value="ADD"
                    color="secondary"
                    variant="contained"
                  >
                    Add
                  </Button>
                </Box>

              </Box>

            </form>
          </Box>


        </Dialog>


      </Box>
    </>
  )
}