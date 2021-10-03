import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  FormHelperText,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from '@material-ui/core';

import MyGlass from '../../MyGlass';
import { useClientData } from '../../../../context/ClientContext';
import { ClntClntRelLogic } from './ClntClntRelLogic';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SelectClientID({
  clientId,
  client1,
  client2,
  setallClients,
  allClients,
  handleChange,
}) {

  const classes = useStyles();
  const { clientRelations, getFamilyRelations } = useClientData();

  const getData = async () => {
    if(clientId){
      const relations = await getFamilyRelations(clientId);
      if(relations) {
        const FamilyMembers = await ClntClntRelLogic(relations)
        await setallClients(FamilyMembers);
      }
    }
  }

  useEffect(() => {
    getData();
  }, [clientRelations, clientId]);

  return (
    <>
      <Grid container spacing={2} wrap="wrap">
        <Grid item xs={6}>
          <Box display="flex" justifyContent="center">
            <MyGlass
              comp={
                <>
                  <Box p={1}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="clientId">Client Id 1</InputLabel>
                      <Select
                        labelId="clientId"
                        id="clientSelect1"
                        name="clientId1"
                        value={ (client1.personID!==undefined) ? `${client1.personID}` : "" }
                        onChange={handleChange}
                      >
                        <MenuItem value="0">
                          <em>None</em>
                        </MenuItem>
                        {allClients?.map((cid) =>
                          client2 ? (
                            cid.personID !== client2.personID ? (
                              <MenuItem key={cid.personID} value={cid.personID}>
                                {cid.personID + ' - ' + cid.personName}
                              </MenuItem>
                            ) : null
                          ) : (
                            <MenuItem key={cid.personID} value={cid.personID}>
                              {cid.personID + ' - ' + cid.personName}
                            </MenuItem>
                          )
                        )}
                      </Select>
                      <FormHelperText>Select Client Id 1</FormHelperText>
                    </FormControl>
                  </Box>
                </>
              }
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="center">
            <MyGlass
              comp={
                <>
                  <Box p={1}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="clientId">Client Id 2</InputLabel>
                      <Select
                        labelId="clientId"
                        id="clientSelect2"
                        name="clientId2"
                        value={ (client2.personID!==undefined) ? `${client2.personID}` : "" }
                        onChange={handleChange}
                      >
                        <MenuItem value="0">
                          <em>None</em>
                        </MenuItem>
                        {allClients?.map((cid) =>
                          client1 ? (
                            cid.personID !== client1.personID ? (
                              <MenuItem key={cid.personID} value={cid.personID}>
                                {cid.personID + ' - ' + cid.personName}
                              </MenuItem>
                            ) : null
                          ) : (
                            <MenuItem key={cid.personID} value={cid.personID}>
                              {cid.personID + ' - ' + cid.personName}
                            </MenuItem>
                          )
                        )}
                      </Select>
                      <FormHelperText>Select Client Id 2</FormHelperText>
                    </FormControl>
                  </Box>
                </>
              }
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
