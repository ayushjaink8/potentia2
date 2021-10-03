import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  Grid,
  Box
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    margin: 'auto',
    transition: '0.3s',
    boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
    borderRadius: 10,
    position: 'relative',
  },
}));


const ClientData = ({selectedClient}) => {
  const classes = useStyles();

  return (
    <>
      <Box m={3} textAlign="center">
        SelectedClient ID: {selectedClient}
        <br/>
        "Selected Client Data here"  // notes and all other data if it is required
      </Box>
    </>
  );
};

export default ClientData;