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
  BizTypeID: null,
  BizTypeName: null,
  BizTypeDesc: null,
};

const BizTypeDt = ({ presClient } ) => {
  const classes = useStyles();
  const { host } = useClientData();
  const [BizTypeDt, setBizTypeDt] = useState(intialState);

  useEffect(() => {
    async function fun() {
      console.log('getting data')
      const res = await axios.post(host + '/api/biz/getBizData', {FamilyID: presClient});
      setBizTypeDt(res.data);
    }
    fun();
  }, [host, presClient]);

  const handleChange = (e) => {
    setBizTypeDt({
      ...BizTypeDt,
      [e.target.name]: [e.target.value][0],
    });
  };

  const sendData = async (e) => {
    e.preventDefault();
    console.log("save clicked!")
    const res = await axios.post(host + '/api/biz/updateBizData', {...BizTypeDt, FamilyID: presClient});
    console.log(res);
    if (res) alert('Business Details Updated');
  };

  return (
    <Box>
      {BizTypeDt ? (
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
                    BizTypeID
                  </TableCell>
                  <TableCell className={classes.tcell}>
                    <TextField
                      variant="outlined"
                      type="number"
                      margin="normal"
                      id="BizTypeID"
                      value={
                        BizTypeDt.BizTypeID === null ? '' : BizTypeDt.BizTypeID
                      }
                      className={classes.tfield}
                      size="small"
                      label="BizTypeID"
                      name="BizTypeID"
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
                    BizTypeName
                  </TableCell>
                  <TableCell className={classes.tcell}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      id="BizTypeName"
                      value={
                        BizTypeDt.BizTypeName === null
                          ? ''
                          : BizTypeDt.BizTypeName
                      }
                      className={classes.tfield}
                      size="small"
                      label="BizTypeName"
                      name="BizTypeName"
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
                    BizTypeDesc
                  </TableCell>
                  <TableCell className={classes.tcell}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      id="BizTypeDesc"
                      className={classes.tfield}
                      size="small"
                      value={
                        BizTypeDt.BizTypeDesc === null
                          ? ''
                          : BizTypeDt.BizTypeDesc
                      }
                      label="BizTypeDesc"
                      name="BizTypeDesc"
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
export default BizTypeDt;
