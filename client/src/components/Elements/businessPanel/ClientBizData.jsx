import React, { useEffect, useState } from 'react';
import { useBusinessData } from '../../../context/BusinessContext';
import axios from 'axios';
import {
  Container,
  Box,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Typography,
  Button,
  Card
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MyGlass from '../MyGlass';
import { Link } from 'react-router-dom';
import BizTable from './BizTable.jsx';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 270,
  },
  selectDropdown: {
    minWidth: 175,
    marginLeft: '1em',
  },
  labelDropdown: {
    fontSize: 15,
  },
  card: {
    margin: 'auto',
    transition: '0.3s',
    boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
    borderRadius: 10,
    position: 'relative',
  },
  addBtn: {
    borderRadius: 10,
    whiteSpace: 'nowrap',
    textTransform: 'capitalize',
    marginRight: theme.spacing(1),
  },
}));


export default function ClientBizData({selectedClient}) {

  const classes = useStyles();
  const [BizTypeId, setBizTypeId] = useState(0);
  const [AvailableBizTypes, setAvailableBizTypes] = useState([]);
  const { allBizTypes, getClientBizType, host } = useBusinessData();

  const handleChange = (event) => {
    event.preventDefault();
    setBizTypeId(parseInt(event.target.value));
  };

  const getData = async () => {

    const clientBiz = await getClientBizType(selectedClient);
    const available = allBizTypes.filter(e => {
      let flag = true;
      for(var i=0; i<clientBiz.length; i++){
        if(e.BizTypeID === clientBiz[i].BizTypeID){
          flag = false;
          break;
        }
      }
      return flag;
    });
    await setAvailableBizTypes(available);

  }


  const addTypeBtn = async (event) => {
    event.preventDefault();
    if ((!BizTypeId) || (!selectedClient)) alert('Select BizType to add to the current ClientID');
    else{
      const name = allBizTypes.find(e => e.BizTypeID == BizTypeId);
      const res = await axios.post(host + '/api/biz/addClientBizType', {
        ClientID: selectedClient,
        BizTypeID: name.BizTypeID,
        BizTypeName: name.BizTypeName,
        BizTypeDesc: ''
      });
      setBizTypeId(0);
      getData();
    }
  }


  useEffect(() => {
    getData();
  },[allBizTypes, selectedClient])


  return(
    <>
      <Container>

        <Box m={3}>
          <Box display="flex" justifyContent="center">
              <Card className={classes.card}>

              <MyGlass comp={
                  <>
                    <Box p={1}>
                      <FormControl className={classes.formControl}>
                        <Grid container direction="row">
                          <Grid container item xs={3}>
                              <Box
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                              height="100%"
                              >
                              <Typography className={classes.labelDropdown}>
                                  Add BizType{' '}
                              </Typography>
                              </Box>
                          </Grid>
                          <Grid container item xs={7}>
                              <Select
                              labelId="BizTypeId"
                              id=""
                              className={classes.selectDropdown}
                              name="BizTypeId"
                              value={BizTypeId}
                              onChange={handleChange}
                              >
                              <Link component={MenuItem} key={0} default to='' value={0}>
                                  <em>Select BizType</em>
                              </Link>
                              {AvailableBizTypes?.map((bizType) => (
                                  <Link
                                  key={bizType.BizTypeID}
                                  to={`/edit/${bizType.BizTypeID}`}
                                  value={bizType.BizTypeID}
                                  component={MenuItem}
                                  >
                                  {bizType.BizTypeID + ' - ' + bizType.BizTypeName}
                                  </Link>
                              ))}
                              </Select>
                          </Grid>
                          <Grid container item xs={1}>
                            <Button
                              color="secondary"
                              variant="contained"
                              disableElevation
                              component="span"
                              size="small"
                              onClick={addTypeBtn}
                              className={classes.addBtn}
                            >
                              ADD
                            </Button>
                          </Grid>
                        </Grid>
                      </FormControl>
                    </Box>
                  </>
              }/>

              </Card>
          </Box>
        </Box>

        <Box>
            <BizTable selectedClient={selectedClient} getData={getData} AvailableBizTypes={AvailableBizTypes}/>
        </Box>

      </Container>
    </>
  );

}