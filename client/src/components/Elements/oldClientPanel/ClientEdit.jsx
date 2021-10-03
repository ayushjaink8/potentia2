import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useClientData } from '../../../context/ClientContext';
import TabSwitch from './TabSwitch';
import MyGlass from '../MyGlass';
import { Link } from 'react-router-dom';

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
}));

export default function ClientEdit(props) {
  const classes = useStyles();

  const [clientId, setclientId] = useState(0);
  const [presClient, setpresclient] = useState(null);
  const { allClients, getClient } = useClientData();
  //   const history = useHistory();

  const handleChange = (event) => {
    setclientId(parseInt(event.target.value));
    // history.push(`/edit/${event.target.value}`);
  };

  useEffect(() => {
    setclientId(props.match.params.id);
  }, [props.match.params.id]);

  useEffect(() => {
    const fun = async () => {
      const res = await getClient(clientId);
      setpresclient(res[0]);
    };
    fun();
  }, [clientId, getClient]);


  return (
    <Container maxWidth="xl">
      <Box mb={3}>

        <Box display="flex" justifyContent="center">
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
                              {/* <MenuItem value={cid.ClientID}>
                                </MenuItem> */}
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
        </Box>
      </Box>

      <Box>
        <TabSwitch clientId={clientId} presClient={presClient} />
      </Box>

    </Container>
  );
}
