import React from 'react';
import UploadCsv from '../Elements/DataControlPanel/UploadCsv';
import ClientPanel from '../Elements/DataControlPanel/ClientPanel';

import {Grid, Box} from '@material-ui/core';
const DataControl = () => {
  return (
    <>
      <Grid
        container
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <UploadCsv />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <ClientPanel />
        </Grid>
      </Grid>
    </>
  );
};

export default DataControl;
