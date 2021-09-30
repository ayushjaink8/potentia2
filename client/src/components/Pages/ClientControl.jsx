import React from 'react';
import UploadCsv from '../Elements/ClientControlPanel/UploadCsv';
import ClientPanel from '../Elements/ClientControlPanel/ClientPanel';
import {Grid, Box} from '@material-ui/core';
const ClientControl = () => {
  return (
    <div>
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
    </div>
  );
};

export default ClientControl;
