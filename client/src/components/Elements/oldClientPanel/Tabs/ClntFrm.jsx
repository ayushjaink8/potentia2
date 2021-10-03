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

const initialState = {
  ClientFirmRelateID: null,
  CFRelateName: null,
  CFRelateDescription: null,
  CFRelateBizStatus: null,
  CFRelateBizPotential: null,
  CFRelateOwnerID: null,
  BizTypeID: null,
};

const ClntFrm = ({ presClient } ) => {
  const classes = useStyles();
  const { host } = useClientData();
  const [ClntFrmDt, setClntFrm] = useState(initialState);

  useEffect(() => {
    async function fun() {
      const res = await axios.post(host + '/api/client/getClntFrm', {
        ClientFirmRelateID: presClient?.ClientFirmRelateID,
      });
      setClntFrm(res.data[0]);
    }
    fun();
  }, [host, presClient]);

  const handleChange = (e) => {
    setClntFrm({
      ...ClntFrmDt,
      [e.target.name]: [e.target.value][0],
    });
  };

  const sendData = async (e) => {
    e.preventDefault();
    const res = await axios.post(host + '/api/client/updateClntFrm', ClntFrmDt);
    console.log(res);
    if (res) alert('Client Firm Details Updated');
  };
  return (
    <Box>
      {ClntFrmDt ? (
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
                    ClientFirmRelateID
                  </TableCell>
                  <TableCell className={classes.tcell}>
                    <TextField
                      variant="outlined"
                      type="number"
                      margin="normal"
                      value={
                        ClntFrmDt.ClientFirmRelateID === null
                          ? ''
                          : ClntFrmDt.ClientFirmRelateID
                      }
                      disabled
                      id="ClientFirmRelateID"
                      className={classes.tfield}
                      size="small"
                      label="ClientFirmRelateID"
                      name="ClientFirmRelateID"
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
                    CFRelateName
                  </TableCell>
                  <TableCell className={classes.tcell}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      id="CFRelateName"
                      value={
                        ClntFrmDt.CFRelateName === null
                          ? ''
                          : ClntFrmDt.CFRelateName
                      }
                      className={classes.tfield}
                      size="small"
                      label="CFRelateName"
                      name="CFRelateName"
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
                    CFRelateDescription
                  </TableCell>
                  <TableCell className={classes.tcell}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      id="CFRelateDescription"
                      className={classes.tfield}
                      size="small"
                      value={
                        ClntFrmDt.CFRelateDescription === null
                          ? ''
                          : ClntFrmDt.CFRelateDescription
                      }
                      label="CFRelateDescription"
                      name="CFRelateDescription"
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
                    CFRelateBizStatus
                  </TableCell>
                  <TableCell className={classes.tcell}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      id="CFRelateBizStatus"
                      value={
                        ClntFrmDt.CFRelateBizStatus === null
                          ? ''
                          : ClntFrmDt.CFRelateBizStatus
                      }
                      className={classes.tfield}
                      size="small"
                      label="CFRelateBizStatus"
                      name="CFRelateBizStatus"
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
                    CFRelateBizPotential
                  </TableCell>
                  <TableCell className={classes.tcell}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      id="CFRelateBizPotential"
                      value={
                        ClntFrmDt.CFRelateBizPotential === null
                          ? ''
                          : ClntFrmDt.CFRelateBizPotential
                      }
                      className={classes.tfield}
                      size="small"
                      label="CFRelateBizPotential"
                      name="CFRelateBizPotential"
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
                    CFRelateOwnerID
                  </TableCell>
                  <TableCell className={classes.tcell}>
                    <TextField
                      variant="outlined"
                      type="number"
                      margin="normal"
                      id="CFRelateOwnerID"
                      value={
                        ClntFrmDt.CFRelateOwnerID === null
                          ? ''
                          : ClntFrmDt.CFRelateOwnerID
                      }
                      className={classes.tfield}
                      size="small"
                      label="CFRelateOwnerID"
                      name="CFRelateOwnerID"
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
                    BizTypeID
                  </TableCell>
                  <TableCell className={classes.tcell}>
                    <TextField
                      variant="outlined"
                      type="number"
                      margin="normal"
                      id="BizTypeID"
                      value={
                        ClntFrmDt.BizTypeID === null ? '' : ClntFrmDt.BizTypeID
                      }
                      className={classes.tfield}
                      size="small"
                      label="BizTypeID"
                      name="BizTypeID"
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
export default ClntFrm;
