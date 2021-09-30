import React, { useEffect, useState } from 'react';
import { useClientData } from '../../context/ClientContext';
import {
  Container,
  Box,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Typography,
  Card
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MyGlass from '../Elements/MyGlass';
import { Link } from 'react-router-dom';
import FamilyTree from '../Elements/familyPanel/FamilyTree';
// import ClientBizData from '../Elements/businessPanel/ClientBizData';
// import ManageBizTypes from '../Elements/businessPanel/ManageBizTypes';


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
    card: {
      margin: 'auto',
      transition: '0.3s',
      boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
      borderRadius: 10,
      position: 'relative',
    },
    selectMsg: {
      display: 'inline',
    },
}));

const FamilyTreePanel = () => {

  const classes = useStyles();

  const [clientId, setclientId] = useState(0);
  const [selectedClient, setselectedClient] = useState(0);
  const { allClients, getClient } = useClientData();

  const handleChange = (event) => {
    setselectedClient(parseInt(event.target.value));
    setclientId(parseInt(event.target.value));
  };

  const SelectClientMsg = () => <>
    <Box  display="flex" justifyContent="center">
      <Box className={classes.selectMsg}>
        <Typography
          className={'MuiTypography--heading'}
          variant={'h5'}
          gutterBottom
        >
            No Client is selected
        </Typography>
      </Box>
    </Box>
  </>

  return (
      <>
        <Container maxWidth="xl">
            <Box mb={3}>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >

                  <Grid item xs={12}>
                    <Box display="flex" justifyContent="center">
                      <Card className={classes.card}>
                      <MyGlass
                          comp={
                          <>
                              <Box p={1}>
                              <FormControl className={classes.formControl}>
                                  <Grid container direction="row">
                                  <Grid container item xs={5}>
                                      <Box
                                      display="flex"
                                      justifyContent="center"
                                      alignItems="center"
                                      height="100%"
                                      >
                                      <Typography className={classes.labelDropdown}>
                                          Select Client Id:{' '}
                                      </Typography>
                                      </Box>
                                  </Grid>
                                  <Grid container item xs={7}>
                                      <Select
                                      labelId="clientId"
                                      id=""
                                      className={classes.selectDropdown}
                                      name="clientId"
                                      value={clientId}
                                      onChange={handleChange}
                                      >
                                      <Link component={MenuItem} key={0} to='' value={0}>
                                          <em>Select Client</em>
                                      </Link>
                                      {allClients?.map((cid) => (
                                          <Link
                                          key={cid.ClientID}
                                          to={`/edit/${cid.ClientID}`}
                                          value={cid.ClientID}
                                          component={MenuItem}
                                          >
                                          {cid.ClientID + ' - ' + cid.ClntFirstName}
                                          {cid.ClntLastName
                                              ? ' ' + cid.ClntLastName
                                              : ''}
                                          </Link>
                                      ))}
                                      </Select>
                                  </Grid>
                                  </Grid>
                              </FormControl>
                              </Box>
                          </>
                          }
                      />
                      </Card>
                    </Box>
                  </Grid>

                </Grid>
            </Box>



            <Box>
                <Container maxWidth="xl">
                    <Card className={classes.card}>
                        <Box m={3} display="flex" justifyContent="center">
                            { (selectedClient===0)? <SelectClientMsg/> : <FamilyTree selectedClient={selectedClient}/> }
                        </Box>
                    </Card>
                </Container>
            </Box>

        </Container>
      </>
  )
}

export default FamilyTreePanel;
