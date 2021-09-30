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
  BizOperatorID: null,
  BoFirstName: null,
  BoMiddleName: null,
  BoLastName: null,
  BoWebLogin: null,
  BoWebPswd: null,
  BoDesignation: null,
  WbAcsRightsID: null,
  BoEnrolDate: null,

};

const BizOperatorDt = ({ presClient } ) => {
  const classes = useStyles();
  const { host } = useClientData();
  const [BizOperatorDt, setBizOperatorDt] = useState(intialState);

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
    setBizOperatorDt({
      ...BizOperatorDt,
      [e.target.name]: [e.target.value][0],
    });
  };

  const sendData = async (e) => {
    e.preventDefault();
    console.log("save click")
    // const res = await axios.post(host + '/api/client/updateClntFrm', ClntFrmDt);
    // console.log(res);
    // if (res) alert('Business Details Updated');
  };

  return (
    <Box>
      {BizOperatorDt ? (
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
                    BizOperatorID
                  </TableCell>
                  <TableCell className={classes.tcell}>
                    <TextField
                      variant="outlined"
                      type="number"
                      margin="normal"
                      id="BizOperatorID"
                      value={
                        BizOperatorDt.BizOperatorID === null ? '' : BizOperatorDt.BizOperatorID
                      }
                      className={classes.tfield}
                      size="small"
                      label="BizOperatorID"
                      name="BizOperatorID"
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
                    BoFirstName
                  </TableCell>
                  <TableCell className={classes.tcell}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      id="BoFirstName"
                      value={
                        BizOperatorDt.BoFirstName === null
                          ? ''
                          : BizOperatorDt.BoFirstName
                      }
                      className={classes.tfield}
                      size="small"
                      label="BoFirstName"
                      name="BoFirstName"
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
                    BoMiddleName
                  </TableCell>
                  <TableCell className={classes.tcell}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      id="BoMiddleName"
                      value={
                        BizOperatorDt.BoMiddleName === null
                          ? ''
                          : BizOperatorDt.BoMiddleName
                      }
                      className={classes.tfield}
                      size="small"
                      label="BoMiddleName"
                      name="BoMiddleName"
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
                    BoLastName
                  </TableCell>
                  <TableCell className={classes.tcell}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      id="BoLastName"
                      value={
                        BizOperatorDt.BoLastName === null
                          ? ''
                          : BizOperatorDt.BoLastName
                      }
                      className={classes.tfield}
                      size="small"
                      label="BoLastName"
                      name="BoLastName"
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
                    BoWebLogin
                  </TableCell>
                  <TableCell className={classes.tcell}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      id="BoWebLogin"
                      value={
                        BizOperatorDt.BoWebLogin === null
                          ? ''
                          : BizOperatorDt.BoWebLogin
                      }
                      className={classes.tfield}
                      size="small"
                      label="BoWebLogin"
                      name="BoWebLogin"
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
                    BoWebPswd
                  </TableCell>
                  <TableCell className={classes.tcell}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      id="BoWebPswd"
                      value={
                        BizOperatorDt.BoWebPswd === null
                          ? ''
                          : BizOperatorDt.BoWebPswd
                      }
                      className={classes.tfield}
                      size="small"
                      label="BoWebPswd"
                      name="BoWebPswd"
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
                    BoDesignation
                  </TableCell>
                  <TableCell className={classes.tcell}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      id="BoDesignation"
                      value={
                        BizOperatorDt.BoDesignation === null
                          ? ''
                          : BizOperatorDt.BoDesignation
                      }
                      className={classes.tfield}
                      size="small"
                      label="BoDesignation"
                      name="BoDesignation"
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
                    WbAcsRightsID
                  </TableCell>
                  <TableCell className={classes.tcell}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      type="number"
                      id="WbAcsRightsID"
                      value={
                        BizOperatorDt.WbAcsRightsID === null
                          ? ''
                          : BizOperatorDt.WbAcsRightsID
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
                    BoEnrolDate
                  </TableCell>
                  <TableCell className={classes.tcell}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      id="BoEnrolDate"
                      value={
                        BizOperatorDt.BoEnrolDate === null
                          ? ''
                          : BizOperatorDt.BoEnrolDate
                      }
                      className={classes.tfield}
                      size="small"
                      label="BoEnrolDate"
                      name="BoEnrolDate"
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
export default BizOperatorDt;
