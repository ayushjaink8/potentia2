import React from 'react';

import {
  Grid,
  Box
} from '@material-ui/core';

import ClientData from '../Elements/clientDetails/ClientData';
import SearchBar from '../Elements/SearchBar';

const ClientDetails = () => {
  return (
    <>
      <Box m={2} textAlign="center">
        <SearchBar/>
        <br/>
        <ClientData/>
      </Box>
    </>
  );
};

export default ClientDetails;
