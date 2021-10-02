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

import SearchBar from '../Elements/SearchBar';


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

  // useEffect(() => {

  // }, [selectedClient])

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
            <Box mb={3} mr={20} ml={20}>
              <Card className={classes.card}>
                <MyGlass
                  comp={
                    <Box m={2}>
                      <SearchBar setSelectedClient={setselectedClient}/>
                    </Box>
                  }
                />
              </Card>
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
