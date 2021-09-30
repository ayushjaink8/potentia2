import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { Link } from 'react-router-dom';
import { DeleteRounded, Edit } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useClientData } from '../../../context/ClientContext';
import DeleteRows from './DeleteRows';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.secondary.light,
  },
  paperError: {
    backgroundColor: 'tomato',
  },
  btnColor: {
    backgroundColor: theme.palette.secondary.light,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  divderColor: {
    backgroundColor: theme.palette.secondary.light,
  },
  card: {
    margin: 'auto',
    transition: '0.3s',
    boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
    borderRadius: 10,
    position: 'relative',
  },
  media: {
    paddingTop: '56.25%',
  },
  content: {
    textAlign: 'left',
    padding: theme.spacing(3),
  },
  divider: {
    margin: `${theme.spacing(3)}px 0`,
  },
  heading: {
    fontWeight: 'bold',
  },
  subheading: {
    lineHeight: 1.8,
  },
  avatar: {
    display: 'inline-block',
    border: '2px solid white',
    '&:not(:first-of-type)': {
      marginLeft: -theme.spacing(1),
    },
  },
  editButtons: {
    position: 'absolute',
    top: 0,
    'z-index': 1000,
    right: 0,
    padding: '2px 16px',
    background: 'white',
    'box-shadow': '0 4px 8px 0 rgba(0,0,0,0.2)',
    'border-radius': '0 0 0 5px',
  },
  root: {
    '& .buttonfield-header': {
      backgroundColor: 'white',
    },
  },
}));

const renderDetailsButton = (params) => {
  return (
    <strong>
      <Button
        variant="contained"
        color="primary"
        size="small"
        style={{ marginLeft: 16 }}
        component={Link}
        to={`/ccpanel/edit/${params.id}`}
      >
        Edit
      </Button>
    </strong>
  );
};

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'ClntFirstName',
    headerName: 'First name',
    width: 150,
    editable: false,
  },
  {
    field: 'ClntLastName',
    headerName: 'Last name',
    width: 150,
    editable: false,
  },
  {
    field: '',
    headerClassName: 'buttonfield-header',
    width: 100,
    type: 'number',
    renderCell: renderDetailsButton,
    flex: 5,
    disableClickEventBubbling: true,
  },
];

const ClientPanel = () => {
  const classes = useStyles();

  const { allClients, clientRelations } = useClientData();

  const [clients, setclients] = useState([]);
  const [selectedRows, setselectedRows] = useState([]);

  const handleSelection = (newSelection) => {
    setselectedRows(newSelection.selectionModel);
  };

  useEffect(() => {
    // console.log(clientRelations);
    // console.log('5');
    // console.log(allClients, '<== idhar update horha');
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
  }, [clientRelations, allClients, DeleteRows]);

  return (
    <Container maxWidth="xl">
      <Box mt={3}>
        <Card className={classes.card}>
          <Box className={classes.editButtons}>
            {selectedRows.length === 1 ? (
              <Button component={Link} to={`/ccpanel/edit/${selectedRows[0]}`}>
                <Edit />
              </Button>
            ) : (
              <Button disabled>
                <Edit />
              </Button>
            )}
            {selectedRows.length === 0 ? (
              <Button disabled>
                <DeleteRounded />
              </Button>
            ) : (
              <DeleteRows
                selectedRows={selectedRows}
                setselectedRows={setselectedRows}
              />
            )}
          </Box>
          <CardContent className={classes.content}>
            {clients.length === 0 ? (
              <Typography> No Data. </Typography>
            ) : (
              <div style={{ height: '60vh' }} className={classes.root}>
                <DataGrid
                  rows={clients}
                  columns={columns}
                  checkboxSelection
                  onSelectionModelChange={handleSelection}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default ClientPanel;
