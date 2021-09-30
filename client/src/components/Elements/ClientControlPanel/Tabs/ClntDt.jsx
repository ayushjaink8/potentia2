import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import {
  Box,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@material-ui/core';
import { useClientData } from '../../../../context/ClientContext';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  trow: {
    padding: theme.spacing(0),
    height: 'fit-content',
  },
  tcell: {
    padding: '0px',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    border: 'none',
  },
  tfield: {
    width: 350,
  },
  save: {
    textAlign: 'center',
  },
}));

const intialState = {
  ClntFirstName: '',
  ClntMiddleInitial: '',
  ClntLastName: '',
  ClntCrmReference: '',
  ClntCrmSyncStatus: false,
  LastSyncedDate: '',
  ClientPhoto: '',
  ClientNotes1: '',
  ClientNotes2: '',
  Gender: '',
  DateOfBirth: '',
  BizTypeID: 0,
  BizOperatorID: 0,
  ClientFirmRelateID: 0,
};

const ClntDt = ({ presClient, clientId }) => {
  const classes = useStyles();

  const { updateClient } = useClientData();

  const [currentClient, setcurrentClient] = useState(intialState);
  const parseDate = (date) => {
    date = new Date(date);
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
  };
  const sendData = async (e) => {
    e.preventDefault();
    const res = await updateClient(currentClient, clientId);
    console.log(res);
    if (res) alert('Client Details Updated');
  };
  useEffect(() => {
    if (presClient) {
      const {
        ClntFirstName,
        ClntMiddleInitial,
        ClntLastName,
        ClntCrmReference,
        ClntCrmSyncStatus,
        LastSyncedDate,
        ClientPhoto,
        ClientNotes1,
        ClientNotes2,
        Gender,
        DateOfBirth,
        BizTypeID,
        BizOperatorID,
        ClientFirmRelateID,
      } = presClient;
      setcurrentClient({
        ClntFirstName,
        ClntMiddleInitial,
        ClntLastName,
        ClntCrmReference,
        ClntCrmSyncStatus,
        LastSyncedDate,
        ClientPhoto,
        ClientNotes1,
        ClientNotes2,
        Gender,
        DateOfBirth,
        BizTypeID,
        BizOperatorID,
        ClientFirmRelateID,
      });
    }
  }, [presClient]);
  // console.log('==>', currentClient);
  const handleChange = (e) => {
    // console.log(e.target.name, e.target.value);
    setcurrentClient({
      ...currentClient,
      [e.target.name]: [e.target.value][0],
    });
  };
  // console.log(currentClient);
  return (
    <Box>
      {currentClient ? (
        <form id="client-details" onSubmit={sendData}>
          <TableContainer>
            <Table className={classes.table} aria-label="simple table">
              <TableBody className={classes.tbody}>
                <TableRow className={classes.trow}>
                  <TableCell
                    className={classes.tcell}
                    align="right"
                    component="th"
                    scope="row"
                  >
                    Client's First Name
                  </TableCell>
                  <TableCell className={classes.tcell}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      value={
                        currentClient.ClntFirstName === null
                          ? ''
                          : currentClient.ClntFirstName
                      }
                      id="firstname"
                      className={classes.tfield}
                      size="small"
                      label="First Name"
                      name="ClntFirstName"
                      onChange={handleChange}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    className={classes.tcell}
                    align="right"
                    component="th"
                    scope="row"
                  >
                    Client's Middle Name Inital
                  </TableCell>
                  <TableCell className={classes.tcell}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      value={
                        currentClient.ClntMiddleInitial === null
                          ? ''
                          : currentClient.ClntMiddleInitial
                      }
                      id="middlename"
                      size="small"
                      className={classes.tfield}
                      label="Middle Initial"
                      name="ClntMiddleInitial"
                      onChange={handleChange}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    className={classes.tcell}
                    align="right"
                    component="th"
                    scope="row"
                  >
                    Client's Last Name
                  </TableCell>
                  <TableCell className={classes.tcell}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      value={
                        currentClient.ClntLastName === null
                          ? ''
                          : currentClient.ClntLastName
                      }
                      id="lastname"
                      size="small"
                      className={classes.tfield}
                      label="Last Name"
                      name="ClntLastName"
                      onChange={handleChange}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    className={classes.tcell}
                    align="right"
                    component="th"
                    scope="row"
                  >
                    Gender
                  </TableCell>
                  <TableCell className={classes.tcell}>
                    <RadioGroup
                      row
                      aria-label="gender"
                      name="Gender"
                      value={
                        currentClient.Gender === null
                          ? ''
                          : currentClient.Gender
                      }
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio />}
                        label="Other"
                      />
                    </RadioGroup>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    className={classes.tcell}
                    align="right"
                    component="th"
                    scope="row"
                  >
                    ClntCrmReference
                  </TableCell>
                  <TableCell className={classes.tcell}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      value={
                        currentClient.ClntCrmReference === null
                          ? ''
                          : currentClient.ClntCrmReference
                      }
                      id="ClntCrmReference"
                      size="small"
                      className={classes.tfield}
                      label="ClntCrmReference"
                      name="ClntCrmReference"
                      onChange={handleChange}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    className={classes.tcell}
                    align="right"
                    component="th"
                    scope="row"
                  >
                    ClntCrmSyncStatus
                  </TableCell>
                  <TableCell className={classes.tcell}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      value={
                        currentClient.ClntCrmSyncStatus === null
                          ? ''
                          : currentClient.ClntCrmSyncStatus
                      }
                      id="ClntCrmSyncStatus"
                      size="small"
                      className={classes.tfield}
                      label="ClntCrmSyncStatus"
                      name="ClntCrmSyncStatus"
                      onChange={handleChange}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    className={classes.tcell}
                    align="right"
                    component="th"
                    scope="row"
                  >
                    LastSyncedDate
                  </TableCell>
                  <TableCell className={classes.tcell}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      value={
                        currentClient.LastSyncedDate === null
                          ? ''
                          : parseDate(currentClient.LastSyncedDate)
                      }
                      type="date"
                      id="LastSyncedDate"
                      size="small"
                      className={classes.tfield}
                      name="LastSyncedDate"
                      onChange={handleChange}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    className={classes.tcell}
                    align="right"
                    component="th"
                    scope="row"
                  >
                    ClientPhoto
                  </TableCell>
                  <TableCell className={classes.tcell}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      value={
                        currentClient.ClientPhoto === null
                          ? ''
                          : currentClient.ClientPhoto
                      }
                      id="ClientPhoto"
                      size="small"
                      className={classes.tfield}
                      label="ClientPhoto"
                      name="ClientPhoto"
                      onChange={handleChange}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    className={classes.tcell}
                    align="right"
                    component="th"
                    scope="row"
                  >
                    ClientNotes1
                  </TableCell>
                  <TableCell className={classes.tcell}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      value={
                        currentClient.ClientNotes1 === null
                          ? ''
                          : currentClient.ClientNotes1
                      }
                      id="ClientNotes1"
                      size="small"
                      className={classes.tfield}
                      label="ClientNotes1"
                      name="ClientNotes1"
                      onChange={handleChange}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    className={classes.tcell}
                    align="right"
                    component="th"
                    scope="row"
                  >
                    ClientNotes2
                  </TableCell>
                  <TableCell className={classes.tcell}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      value={
                        currentClient.ClientNotes2 === null
                          ? ''
                          : currentClient.ClientNotes2
                      }
                      id="ClientNotes2"
                      size="small"
                      className={classes.tfield}
                      label="ClientNotes2"
                      name="ClientNotes2"
                      onChange={handleChange}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    className={classes.tcell}
                    align="right"
                    component="th"
                    scope="row"
                  >
                    DateOfBirth
                  </TableCell>
                  <TableCell className={classes.tcell}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      value={
                        currentClient.DateOfBirth === null
                          ? ''
                          : parseDate(currentClient.DateOfBirth)
                      }
                      type="date"
                      id="DateOfBirth"
                      size="small"
                      className={classes.tfield}
                      name="DateOfBirth"
                      onChange={handleChange}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    className={classes.tcell}
                    align="right"
                    component="th"
                    scope="row"
                  >
                    BizTypeID
                  </TableCell>
                  <TableCell className={classes.tcell}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      value={
                        currentClient.BizTypeID === null
                          ? ''
                          : currentClient.BizTypeID
                      }
                      type="number"
                      id="BizTypeID"
                      size="small"
                      className={classes.tfield}
                      label="BizTypeID"
                      name="BizTypeID"
                      onChange={handleChange}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    className={classes.tcell}
                    align="right"
                    component="th"
                    scope="row"
                  >
                    BizOperatorID
                  </TableCell>
                  <TableCell className={classes.tcell}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      value={
                        currentClient.BizOperatorID === null
                          ? ''
                          : currentClient.BizOperatorID
                      }
                      type="number"
                      id="BizOperatorID"
                      size="small"
                      className={classes.tfield}
                      label="BizOperatorID"
                      name="BizOperatorID"
                      onChange={handleChange}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    className={classes.tcell}
                    align="right"
                    component="th"
                    scope="row"
                  >
                    ClientFirmRelateID
                  </TableCell>
                  <TableCell className={classes.tcell}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      value={
                        currentClient.ClientFirmRelateID === null
                          ? ''
                          : currentClient.ClientFirmRelateID
                      }
                      type="number"
                      id="ClientFirmRelateID"
                      size="small"
                      disabled
                      className={classes.tfield}
                      label="ClientFirmRelateID"
                      name="ClientFirmRelateID"
                      onChange={handleChange}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <br />
            <div className={classes.save}>
              <Button variant="contained" type="submit" color="secondary">
                SAVE
              </Button>
            </div>
          </TableContainer>
        </form>
      ) : (
        <></>
      )}
    </Box>
  );
};
export default ClntDt;
