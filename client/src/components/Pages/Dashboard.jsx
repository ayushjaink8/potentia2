import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Box, Card, CardContent } from '@material-ui/core';
import ClientVisualizer from '../Elements/dashboard/ClientVisualizer';
import Glevel from '../Elements/dashboard/Glevel';
import SLevel from '../Elements/dashboard/SLevel';
import MyGlass from '../Elements/MyGlass';
import { useClientData } from '../../context/ClientContext';
import { formulate } from '../Elements/dashboard/logics';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  card: {
    transition: '0.3s',
    boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
    borderRadius: 10,
    position: 'relative',
  },
  content: {
    padding: '0',
    paddingBottom: '0 !important',
    textAlign: 'left',
  },
  selectClientid: {
    color: theme.palette.primary.dark,
    fontSize: 16,
  },
  FamilyHead: {
    color: '#eabc33',
    fontSize: 20,
    fontWeight: '600',
    // textAlign: "center",
    margin: theme.spacing(1.5),
  },
  FamilyHeadValue: {
    color: '#585858',
    display: 'inline',
    marginLeft: theme.spacing(1.5),
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const { allClients, clientRelations } = useClientData();
  const [clientId, setclientId] = useState(0);
  const [clientName, setclientName] = useState('');
  const [gLevel, setgLevel] = useState(0);
  const [sLevel, setsLevel] = useState(-100);
  const [clientFamilyData, setclientFamilyData] = useState([]);

  const handleChange = (event) => {
    // console.log(event);
    if (event.target.name === 'clientId'){
      setclientId(event.target.value);
      setclientName(event.nativeEvent.srcElement.attributes.clientName?.value)
    }
    else if (event.target.name === 'gLevel') setgLevel(event.target.value);
    else if (event.target.name === 'sLevel') setsLevel(event.target.value);
  };

  const setData = async () => {

    if(clientId !== 0 && clientRelations !== []) {

      const clientFamily = await clientRelations.find(e => e.id === clientId);
      // console.log(clientId, clientFamily);
      if(clientFamily){
        const result = await formulate(clientFamily);
        setclientFamilyData(result)
      }
      else setclientFamilyData([]);
      // console.log('result: ',result)
    }

  }

  useEffect(() => {

    setData();

  }, [clientId, clientRelations])

  return (
    <>
      <Box mb={3}>
        <Grid container spacing={2} wrap="wrap">
          <Grid item xs={12} sm={6} md={4}>
            <Box display="flex" justifyContent="center">
              <MyGlass
                comp={
                  <>
                    <Card className={classes.card}>
                      <CardContent className={classes.content}>
                        <Box p={0.8}>
                          <FormControl className={classes.formControl}>
                            <FormHelperText className={classes.selectClientid}>
                              Select Client ID:
                            </FormHelperText>
                            <Select
                              labelId="clientId"
                              id=""
                              className={classes.selectClientidDropdown}
                              name="clientId"
                              value={clientId}
                              clientName={clientName}
                              onChange={handleChange}
                            >
                              <MenuItem clientName={'No Client Selected'} value={0}>
                                <em>None</em>
                              </MenuItem>
                              {allClients?.map((cid) => (
                                <MenuItem
                                  key={cid.ClientID}
                                  value={cid.ClientID}
                                  clientName={
                                    cid.ClntFirstName +
                                    (cid.ClntLastName ? ' ' + cid.ClntLastName : '')
                                  }
                                >
                                  {cid.ClientID + ' - ' + cid.ClntFirstName}
                                  {cid.ClntLastName
                                    ? ' ' + cid.ClntLastName
                                    : ''}
                                </MenuItem>
                              ))}
                            </Select>
                            <FormHelperText>Select Client Id</FormHelperText>
                          </FormControl>
                        </Box>
                      </CardContent>
                    </Card>
                  </>
                }
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box display="flex" justifyContent="center">
              <MyGlass
                comp={
                  <Card className={classes.card}>
                    <CardContent className={classes.content}>
                      <Box p={1}>
                        <FormControl className={classes.formControl}>
                          <Glevel
                            clientId={clientId}
                            clientFamilyData={clientFamilyData}
                            setgLevel={setgLevel}
                            gLevel={gLevel}
                            handleChange={handleChange}
                          />
                          <FormHelperText>
                            Select Generation Level
                          </FormHelperText>
                        </FormControl>
                      </Box>
                    </CardContent>
                  </Card>
                }
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box display="flex" justifyContent="center">
              <MyGlass
                comp={
                  <>
                    <Card className={classes.card}>
                      <CardContent className={classes.content}>
                        <Box p={1}>
                          <FormControl className={classes.formControl}>
                            <SLevel
                              clientId={clientId}
                              clientFamilyData={clientFamilyData}
                              sLevel={sLevel}
                              gLevel={gLevel}
                              setsLevel={setsLevel}
                              handleChange={handleChange}
                            />
                            <FormHelperText>
                              Select Sibling Level
                            </FormHelperText>
                          </FormControl>
                        </Box>
                      </CardContent>
                    </Card>
                  </>
                }
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      {
        clientId ?
          <Box>
            <Grid style={{justifyContent:'center'}} container>
              <Grid className={classes.FamilyHead} item xs={4}>
                Family/Client ID:{' '}
                <Box className={classes.FamilyHeadValue}>
                  {clientId}
                </Box>
              </Grid>
              <Grid className={classes.FamilyHead} item xs={6}>
                Head of the Family:{' '}
                <Box className={classes.FamilyHeadValue}>
                  {clientName}
                </Box>
              </Grid>
            </Grid>
          </Box>
        : ''
      }
      <ClientVisualizer clientId={clientId} clientFamilyData={clientFamilyData} clientName={clientName} gLevel={gLevel} sLevel={sLevel} />
    </>
  );
};

export default Dashboard;
