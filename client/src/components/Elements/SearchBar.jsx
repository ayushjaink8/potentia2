import React from 'react';
import {
  Box,
  Button,
  Input,
  InputAdornment,
  InputLabel,
  TextField
 } from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountCircleRounded';

const SearchBar = ({height}) => {
  return (
    <>
      <Box m={2} display="flex">
        <Box pt={1.5} pr={1}>
          <AccountBoxIcon fontSize="large" sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        </Box>
        <TextField
         fullWidth
         id="input-with-sx"
         label="Search Client with ID or Name"
         variant="standard"
        />
      </Box>
    </>
  );
};

export default SearchBar;