import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Card,
  CardContent,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useBusinessData } from '../../../context/BusinessContext';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 270,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  selectDropdown: {
    minWidth: 140,
    marginLeft: '1em',
  },
  labelDropdown: {
    fontSize: 15,
  },
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
  card: {
    margin: 'auto',
    transition: '0.3s',
    boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
    borderRadius: 10,
  },
  content: {
    textAlign: 'left',
    padding: theme.spacing(3),
  },
}));

const BizTypeEdit = (props) => {

  const classes = useStyles();

  const initialState = {
    ClientID: '',
    BizTypeID: '',
    BizTypeName: '',
    BizTypeDesc: ''
  };

  const [ClientId, setClientId] = useState(0);
  const [BizTypeId, setBizTypeId] = useState(0);
  const { getClientBizType, host } = useBusinessData();
  const [NewData, setNewData] = useState(initialState);

  const urlID = props.match.params.id.split('$');


  const fetchData = async () => {

    await setClientId(parseInt(urlID[0]));
    await setBizTypeId(parseInt(urlID[1]));

    const res = await getClientBizType(ClientId);
    if(res){
      const Data = await res.find((e) => e.BizTypeID == BizTypeId);
      if(Data) setNewData(Data);
    }

  }

  useEffect(() => {

    fetchData();

  },[props.match.params.id, ClientId, BizTypeId]);


  const sendData = async (e) => {
    e.preventDefault();
    if(ClientId && BizTypeId){
      const data = {
        BizTypeDesc: NewData.BizTypeDesc,
        ClientID: NewData.ClientID,
        BizTypeID: NewData.BizTypeID
      };
      const res = await axios.post(host + '/api/biz/editClientBizType', data);
      console.log(res);
      if (res) alert('Business Type Details Updated');
    }
    else alert('Error occurred...');
  };

  const handleChange = (e) => {
    setNewData({
      ...NewData,
      [e.target.name]: [e.target.value][0],
    });
  };


  return (
    <Container maxWidth="xl">
      <Box m={3}>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <Box display="flex" justifyContent="center">
              {NewData ? (
                <form id="client-details" onSubmit={sendData}>

                    <Box m={2} mb={4}>
                      <Card className={classes.card}>
                        <CardContent className={classes.content}>
                          <Box display="flex" justifyContent="center">
                              <Typography
                                className={'MuiTypography--heading'}
                                variant={'h5'}
                              >
                                  BizType Details
                              </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Box>

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
                              ClientID
                            </TableCell>
                            <TableCell className={classes.tcell}>
                              <TextField
                                variant="outlined"
                                type="number"
                                margin="normal"
                                value={NewData.ClientID}
                                disabled
                                id="ClientID"
                                className={classes.tfield}
                                size="small"
                                name="ClientID"
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
                                value={NewData.BizTypeID}
                                disabled
                                id="BizTypeID"
                                className={classes.tfield}
                                size="small"
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
                                type="text"
                                margin="normal"
                                value={NewData.BizTypeName}
                                disabled
                                id="BizTypeName"
                                className={classes.tfield}
                                size="small"
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
                                value={NewData.BizTypeDesc}
                                className={classes.tfield}
                                size="small"
                                multiline
                                rows={4}
                                label="BizType Description"
                                name="BizTypeDesc"
                                onChange={handleChange}
                              />
                            </TableCell>
                          </TableRow>

                        </TableBody>
                      </Table>
                      <br />
                      <Box className={classes.save}>
                        <Button variant="contained" type="submit" color="secondary">
                          SAVE
                        </Button>
                      </Box>
                    </TableContainer>

                </form>
              ) : (
                <></>
              )}
            </Box>

          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default BizTypeEdit;
