import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { Box, TextField, Button } from '@material-ui/core';
import axios from 'axios';
import {useClientData} from '../../../../context/ClientContext';


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
  WbAcsRightsID: null,
  WbAcsRightsName: null,
  WbAcsRightsDesc: null
};

const WbAcsRights = ({ presClient } ) => {
  const classes = useStyles();
  const { host } = useClientData();
  const [WbAcsRights, setWbAcsRights] = useState(intialState);

  // useEffect(() => {
  //   async function fun() {
  //     // console.log(presClient.ClientFirmRelateID);
  //     const res = await axios.post(host + '/api/client/getClntFrm', {
  //       ClientFirmRelateID: presClient?.ClientFirmRelateID,
  //     });
  //     setClntFrm(res.data[0]);
  //     console.log(res.data[0]);
  //   }
  //   fun();
  // }, [host, presClient]);

  const handleChange = (e) => {
    setWbAcsRights({
      ...WbAcsRights,
      [e.target.name]: [e.target.value][0],
    });
  };

  const sendData = async (e) => {
    e.preventDefault();
    console.log('save button clicked to send data')
    // const res = await axios.post(host + '/api/client/updateClntFrm', ClntFrmDt);
    // console.log(res);
    // if (res) alert('Business Details Updated');
  };

  return (
    <Box>
      {WbAcsRights ? (
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
                    WbAcsRightsID
                  </TableCell>
                  <TableCell className={classes.tcell}>
                    <TextField
                      variant="outlined"
                      type="number"
                      margin="normal"
                      id="WbAcsRightsID"
                      value={
                        WbAcsRights.WbAcsRightsID === null ? '' : WbAcsRights.WbAcsRightsID
                      }
                      className={classes.tfield}
                      size="small"
                      label="WbAcsRightsID"
                      name="WbAcsRightsID"
                      onChange={handleChange}
                    />
                  </TableCell>
                </TableRow>

                <TableRow className={classes.trow}>
                  <TableCell
                    className={classes.tcell}
                    align="right"
                    component="th"
                    scope="row"
                  >
                   WbAcsRightsName
                  </TableCell>
                  <TableCell className={classes.tcell}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      id="WbAcsRightsName"
                      value={
                        WbAcsRights.WbAcsRightsName === null
                          ? ''
                          : WbAcsRights.WbAcsRightsName
                      }
                      className={classes.tfield}
                      size="small"
                      label="WbAcsRightsName"
                      name="WbAcsRightsName"
                      onChange={handleChange}
                    />
                  </TableCell>
                </TableRow>

                <TableRow className={classes.trow}>
                  <TableCell
                    className={classes.tcell}
                    align="right"
                    component="th"
                    scope="row"
                  >
                   WbAcsRightsDesc
                  </TableCell>
                  <TableCell className={classes.tcell}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      id="WbAcsRightsDesc"
                      className={classes.tfield}
                      size="small"
                      value={
                        WbAcsRights.WbAcsRightsDesc === null
                          ? ''
                          : WbAcsRights.WbAcsRightsDesc
                      }
                      label="WbAcsRightsDesc"
                      name="WbAcsRightsDesc"
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
export default WbAcsRights;
