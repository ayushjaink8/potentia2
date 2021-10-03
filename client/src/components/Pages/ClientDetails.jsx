import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  Grid,
  Box,
  Card,
} from '@material-ui/core';

import MyGlass from '../Elements/MyGlass';
import ClientData from '../Elements/clientDetails/ClientData';
import SearchBar from '../Elements/SearchBar';

const useStyles = makeStyles((theme) => ({
  card: {
    margin: 'auto',
    transition: '0.3s',
    boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
    borderRadius: 10,
    position: 'relative',
  },
}));


const ClientDetails = () => {
  const classes = useStyles();

  const [selectedClient, setselectedClient] = useState(0);

  return (
    <>
      <Box m={2} textAlign="center">
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
        <br/>
        <ClientData selectedClient={selectedClient} />
      </Box>
    </>
  );
};

export default ClientDetails;
