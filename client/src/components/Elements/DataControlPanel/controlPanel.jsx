import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useClientData } from '../../../context/ClientContext';

const useStyles = makeStyles((theme) => ({
  card: {
    margin: 'auto',
    transition: '0.3s',
    boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
    borderRadius: 10,
    position: 'relative',
  },
  content: {
    textAlign: 'left',
    padding: theme.spacing(3),
  },
}));

const ControlPanel = () => {
  const classes = useStyles();

  const { allClients, clientRelations } = useClientData();

  const [clients, setclients] = useState([]);

  useEffect(() => {

    let data = [];
    if (allClients.length) {
      for (let i = 0; i < allClients.length; i++) {
        data.push({
          id: allClients[i].ClientID,
          ClntFirstName: allClients[i].ClntFirstName,
          ClntLastName: allClients[i].ClntLastName,
        });
      }
    }
    setclients(data);
  }, [clientRelations, allClients]);

  return (
    <Container maxWidth="xl">
      <Box mt={3}>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            { clients.length === 0
              ? (
                <Typography> No Data Found. </Typography>
              ) : (
                <>
                  <Typography> No Data Found. </Typography>
                </>
              )
            }
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default ControlPanel;
