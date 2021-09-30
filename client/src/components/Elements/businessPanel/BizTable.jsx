import React, { useEffect, useState } from 'react';
import { useBusinessData } from '../../../context/BusinessContext';
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
import { DeleteRounded} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import DeleteRows from './DeleteBizType';

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


const BizTable = ({selectedClient, AvailableBizTypes, getData}) => {
  const classes = useStyles();

  const [ClientBizTypes, setClientBizTypes] = useState([]);
  const [selectedRows, setselectedRows] = useState([]);

  const { getClientBizType } = useBusinessData();

  const handleSelection = (newSelection) => {
    setselectedRows(newSelection.selectionModel);
  };


  const renderDetailsButton = (params) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
          component={Link}
          to={`/biz/edit/${selectedClient}$${params.id}`}
        >
          Edit
        </Button>
      </strong>
    );
  };


  const columns = [
    { field: 'id',
      headerName: 'BizTypeID',
      width: 150,
      editable: false,
    },
    {
      field: 'BizTypeName',
      headerName: 'BizTypeName',
      width: 200,
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


  const fetchData = async () => {

    let data = [];
    const FullData = await getClientBizType(selectedClient);
    if (FullData.length) {
      for (let i = 0; i < FullData.length; i++) {
        data.push({
          id: FullData[i].BizTypeID,
          BizTypeName: FullData[i].BizTypeName,
        });
      }
    }
    setClientBizTypes(data);

  }

  useEffect(() => {

    fetchData();

  }, [selectedClient, AvailableBizTypes]);

  return (
    <Container maxWidth="xl">
      <Box mt={3}>
        <Card className={classes.card}>
          <Box className={classes.editButtons}>
            {selectedRows.length === 0 ? (
                <Button disabled>
                  <DeleteRounded /> Delete
                </Button>
              ) : (
                <DeleteRows
                  selectedRows={selectedRows}
                  setselectedRows={setselectedRows}
                  selectedClient={selectedClient}
                  getData={getData}
                />
              )
            }
          </Box>
          <CardContent className={classes.content}>
            {ClientBizTypes.length === 0 ? (
              <Typography> No BizTypes Found </Typography>
            ) : (
              <div style={{ height: '60vh' }} className={classes.root}>
                <DataGrid
                  rows={ClientBizTypes}
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

export default BizTable;
