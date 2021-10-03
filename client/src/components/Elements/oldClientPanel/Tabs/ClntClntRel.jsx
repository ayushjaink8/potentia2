import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, TextField, Grid } from '@material-ui/core';
import SelectClientID from './SelectClientID';
import { useClientData } from '../../../../context/ClientContext';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';


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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  relations: {
    color: '#eabc33',
    fontSize: 20,
    fontWeight: '600',
    // textAlign: "center",
    margin: theme.spacing(1.5),
  },
  relationValue: {
    color: '#585858',
    display: 'inline',
    marginLeft: theme.spacing(1.5),
  },
  formTable:{
    width: '100%',
  }
}));
const ClntClntRel = ({ clientId, presClient }) => {
  const classes = useStyles();

  const { getRelationTable, updateRelationTable } = useClientData();

  const [client1, setclient1] = useState([]);
  const [allClients, setallClients] = useState([]);
  const [client2, setclient2] = useState([]);
  const [relation, setrelation] = useState(null);

  const [CCrelname, setCCrelname] = useState('');

  const [ClntClntDt, setClntClntDt] = useState(null);
  const [BtnDetails, setBtnDetails] = useState('Get Details');

  const handleChange = (event) => {
    if (event.target.name === 'clientId1') {
      const clnt1 = allClients.find(
        (client) => client.personID === event.target.value
      );
      setclient1(clnt1);
    }

    if (event.target.name === 'clientId2') {
      const clnt2 = allClients.find(
        (client) => client.personID === event.target.value
      );
      setclient2(clnt2);
    }
  };

  const giveRelation = () => {
    if (relation) {
      if (relation.rel > 0) {
        setCCrelname(`Parent-level-${relation.rel}`);
      } else if (relation.rel < 0) {
        setCCrelname(`Child-level-${relation.rel}`);
      } else {
        setCCrelname('Same Generation Level');
      }
    }
    return '';
  };

  useEffect(() => {
    if (client1 && client2) {
      if (client1.length !== 0 && client2.length !== 0) {
        const rel = {
          rel: client1.gLevel - client2.gLevel,
          c1: client1.personName,
          c2: client2.personName,
        };
        setrelation(rel);
      }
    } else {
      setrelation(null);
    }
  }, [client1, client2]);

  useEffect(() => {
    setclient1([]);
    setclient2([]);
    setrelation(null);
  }, [clientId]);

  const fetchRelationTable = async () => {

    document.getElementById('getDetailsBtn').disabled = true;
    document.getElementById('getDetailsBtn').style.backgroundColor = '#e5e5e5';
    setBtnDetails('Loading');

    if (client1 && client2 && clientId) {
      const res = await getRelationTable(
        client1.personID,
        client2.personID,
        clientId
      );
      setClntClntDt(res.data);
      giveRelation();
    }


    document.getElementById('getDetailsBtn').disabled = false;
    document.getElementById('getDetailsBtn').style.backgroundColor = '#eabc33';
    setBtnDetails('Get Details');
  };

  const sendData = async (e) => {
    e.preventDefault();
    const res = await updateRelationTable(e.target.ClntClntRelateID.value, e.target.CCRelateName.value, e.target.CCRelateDescription.value);
    if(res) alert('Details Updated');
  }

  const handleFormChange = (e) => {
    setClntClntDt({
      ...ClntClntDt,
      [e.target.name]: [e.target.value][0]
    })
  }

  useEffect(() => {
    if (ClntClntDt) {
      if (
        !client1 ||
        !client2 ||
        client1?.personID !== ClntClntDt.ClientID_1 ||
        client2?.personID !== ClntClntDt.ClientID_2
      ) {
        setClntClntDt(null);
      }
    }
  }, [client1, client2, ClntClntDt]);

  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <Grid className={classes.relations} item xs={12}>
            Total No. of Relations:{' '}
            <Box className={classes.relationValue}>{allClients.length}</Box>
          </Grid>
          <Box>
            <SelectClientID
              clientId={clientId}
              client1={client1}
              client2={client2}
              allClients={allClients}
              setallClients={setallClients}
              handleChange={handleChange}
            />{' '}
            {/* SelectClientID.jsx in ../Elements */}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            {/* Shows relation between selected client 1 and the given relation */}
            <Grid className={classes.relations} item xs={12}>
              <Box display="flex" justifyContent="center">
                Relation:
                <Box className={classes.relationValue}>
                  {relation ? '' : 'Select clients to get relation'}
                  {relation?.rel > 0
                    ? `'${relation?.c1}' is parent-level-${relation?.rel} of '${relation?.c2}'.`
                    : ''}
                  {relation?.rel === 0
                    ? `'${relation?.c1}' and '${relation?.c2}' are in same Generation level.`
                    : ''}
                  {relation?.rel < 0
                    ? `'${relation?.c1}' is child-level-${
                        0 - relation?.rel
                      } of '${relation?.c2}'.`
                    : ''}
                </Box>
              </Box>
            </Grid>
            {relation ? (
              <Grid item xs={12}>
                <Box mb={3} display="flex" justifyContent="center">
                  <Button
                    id="getDetailsBtn"
                    variant="contained"
                    color="secondary"
                    onClick={fetchRelationTable}
                  >
                    {BtnDetails}
                  </Button>
                </Box>
              </Grid>
            ) : null}
            {/* <Grid className={classes.relations} item xs={12}>
              Client 1 relation with {client1?.relatedTo}:
              <Box
                className={classes.relationValue}
                style={{ textTransform: 'capitalize' }}
              >
                {client1?.relation}
              </Box>
            </Grid> */}

            {/* Shows relation between selected client 2 and the given relation */}

            {/* <Grid className={classes.relations} item xs={12}>
              Client 2 relation with {client2?.relatedTo}:
              <Box
                className={classes.relationValue}
                style={{ textTransform: 'capitalize' }}
              >
                {client2?.relation}
              </Box>
            </Grid> */}
            {ClntClntDt ? (
              <form className={classes.formTable} id="client-details" onSubmit={sendData}>
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
                          ClntClntRelateID
                        </TableCell>
                        <TableCell className={classes.tcell}>
                          <TextField
                            variant="outlined"
                            type="number"
                            margin="normal"
                            value={
                              ClntClntDt?.ClntClntRelateID === null
                                ? ''
                                : ClntClntDt?.ClntClntRelateID
                            }
                            disabled
                            id="ClntClntRelateID"
                            className={classes.tfield}
                            size="small"
                            label="ClntClntRelateID"
                            name="ClntClntRelateID"
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
                          ClientFirmRelateID
                        </TableCell>
                        <TableCell className={classes.tcell}>
                          <TextField
                            variant="outlined"
                            type="number"
                            margin="normal"
                            value={
                              ClntClntDt?.ClientFirmRelateID === null
                                ? ''
                                : ClntClntDt?.ClientFirmRelateID
                            }
                            disabled
                            id="ClientFirmRelateID"
                            className={classes.tfield}
                            size="small"
                            label="ClientFirmRelateID"
                            name="ClientFirmRelateID"
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
                          CCRelateName
                        </TableCell>
                        <TableCell className={classes.tcell}>
                          <TextField
                            variant="outlined"
                            margin="normal"
                            id="CCRelateName"
                            value={
                              ClntClntDt?.CCRelateName === null
                                ? CCrelname
                                : ClntClntDt?.CCRelateName
                            }
                            className={classes.tfield}
                            size="small"
                            label="CCRelateName"
                            name="CCRelateName"
                            onChange={handleFormChange}
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
                          CCRelateDescription
                        </TableCell>
                        <TableCell className={classes.tcell}>
                          <TextField
                            variant="outlined"
                            margin="normal"
                            id="CCRelateDescription"
                            className={classes.tfield}
                            size="small"
                            value={
                              ClntClntDt?.CCRelateDescription === null
                                ? ''
                                : ClntClntDt?.CCRelateDescription
                            }
                            label="CCRelateDescription"
                            name="CCRelateDescription"
                            onChange={handleFormChange}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <br />
                  <Box display="flex" justifyContent="center" className={classes.save}>
                    <Button variant="contained" type="submit" color="secondary">
                      SAVE
                    </Button>
                  </Box>
                </TableContainer>
              </form>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default ClntClntRel;
