import React from 'react';

import {
  Grid,
  Box
} from '@material-ui/core';

import ClientData from '../Elements/clientDetails/ClientData';

const ClientDetails = () => {
  return (
    <>
      <Box m={2} textAlign="center">
        SearchBar here
        <br/>
        <ClientData/>
      </Box>
    </>
  );
};

export default ClientDetails;
