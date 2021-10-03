import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
 } from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountCircleRounded';
import Autocomplete from '@mui/material/Autocomplete';
import { useClientData } from '../../context/ClientContext';

const SearchBar = ({inputData, setSelectedClient}) => {

  const [DropdownData, setDropdownData] = useState([{}]);
  const { allClients } = useClientData();

  const onInputChange = (e) => {
    var selectedID = parseInt(e.target.textContent.split(" - ")[0]);
    if(e.target.textContent=='') {
      setSelectedClient(0);
    }
    else if (selectedID) {
      setSelectedClient(selectedID);
    }
  }

  let defaultProps = {};

  useEffect(() => {
    let data = [];
    allClients.forEach((node)=>{
      data.push({
        ClientID: node.ClientID,
        Name: node.ClntFirstName + " " + node.ClntLastName
      })
    })
    defaultProps = {
      options: data,
      getOptionLabel: (option) => String(option.ClientID + ' - ' + option.Name),
    };
    setDropdownData({...defaultProps});
  }, [allClients]);

  return (
    <>
      <Box display="flex" justifyContent="center">

        <Box pt={1.5} pr={1}>
          <AccountBoxIcon fontSize="large" sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        </Box>

        <Autocomplete
          fullWidth
          {...DropdownData}
          id="clientSearchDropdown"
          onChange={onInputChange}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              id="clientSearchInput"
              label="Search Client using either ID or Name"
              variant="standard"
            />
          )}
        />

      </Box>
    </>
  );
};

export default SearchBar;