import React from 'react';

import WarningIcon from '@material-ui/icons/WarningRounded';

import {
  Box
} from '@material-ui/core';

import ClientData from '../Elements/clientDetails/ClientData';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  error: {
    color: '#585858',
    fontSize: 20,
    fontWeight: '600',
  }
}));

const Page_404 = () => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.error}>
        <Box mt={10}
          display="flex"
          textAlign="center"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Box>
            <WarningIcon style={{ fontSize: '4em' }}/>
          </Box>
          Error 404
          <br/>
          Page not Found !
        </Box>
      </Box>
    </>
  );
};

export default Page_404;
