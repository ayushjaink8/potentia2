import React from 'react';
import {
  Grid,
  Box
} from '@material-ui/core';
import Info_icon from '../info_icon.svg'
const ClientData = () => {
  return (
    <>
      <Box m={3} textAlign="center">
        <img src={Info_icon} style={{height:'20px'}}/>
        "Selected Client Data here"  // notes and all other data if it is required
      </Box>
    </>
  );
};

export default ClientData;