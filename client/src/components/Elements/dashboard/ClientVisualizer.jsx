import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Card,
  CardContent,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ModalName from './ModalName';
// import { useClientData } from '../../../context/ClientContext';

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
    // "&:hover": {
    //   boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    // }
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
}));

const ClientVisualizer = ({ clientId, clientFamilyData, gLevel, sLevel }) => {

  const classes = useStyles();
  const [clientsLevels, setclientsLevels] = useState([]);

  const getLevels = () => {

    let data = [];

    clientFamilyData.forEach((item) => {
        data.push(item.value);
        return;
    });

    // console.log('data: ', data, data[0]);

    if (data.length) {
      let prev = data[0].gLevel;
      let reqdata = [], temData = [];

      data.forEach((item) => {
        if (item.gLevel !== prev) {
          reqdata.push(temData);
          temData = [];
          prev = item.gLevel;
        }
        temData.push(item);
      });

      if (temData.length) {
        reqdata.push(temData);
        temData = [];
      }
      // console.log('reqdata', reqdata);
      setclientsLevels(reqdata);
    }

  };

  useEffect(() => {
    console.log('clientRelations: ', clientFamilyData)

    if (parseInt(clientId) !== 0) {
      getLevels();
    } else {
      setclientsLevels([]);
    }

  }, [clientId, clientFamilyData]);
  return (
    <>
      <Container maxWidth="md">
        <Box mt={2}>
          <Box>
            <Grid container>
              <Grid item xs={12}>
                <Card className={classes.card}>
                  <CardContent className={classes.content}>
                    {/* <Box key = {1} py={1} border={1} borderColor="primary.light" borderRadius={10}  > */}
                    {clientsLevels.length > 0 ? (
                      clientsLevels.map((item, i) => (
                        <>
                          {parseInt(gLevel) === 0 ? (
                            <>
                              <Grid key={i} item xs={12}>
                                <Grid container>
                                  <Grid item xs={12}>
                                    {item[0]?.gLevel > 0 ? (
                                      <Typography
                                        className={'MuiTypography--heading'}
                                        gutterBottom
                                        component="p"
                                        align="center"
                                      >
                                        {' '}
                                        Fore-Generation Level :{' '}
                                        {Math.abs(parseInt(item[0]?.gLevel))}
                                      </Typography>
                                    ) : item[0]?.gLevel < 0 ? (
                                      <Typography
                                        className={'MuiTypography--heading'}
                                        gutterBottom
                                        component="p"
                                        align="center"
                                      >
                                        {' '}
                                        After-Generation Level :{' '}
                                        {Math.abs(
                                          parseInt(item[0]?.gLevel)
                                        )}{' '}
                                      </Typography>
                                    ) : (
                                      <Typography
                                        className={'MuiTypography--heading'}
                                        gutterBottom
                                        component="p"
                                        align="center"
                                      >
                                        {' '}
                                        Sibling-Relations
                                      </Typography>
                                    )}
                                  </Grid>


                                  <Box display="flex" flexWrap="wrap" width="100%" >
                                    {item?.map((cdata, j) => (
                                      <Grid key={j} item>
                                        {cdata.relation !== '' ? (
                                          <ModalName
                                            key={cdata.id}
                                            cdata={cdata}
                                            sLevel={sLevel}
                                            gLevel={gLevel}
                                          />
                                        ) : (
                                          <Box p={1}>
                                            <Paper
                                              className={`${classes.paper} ${classes.paperError}`}
                                              variant="outlined"
                                              elevation={3}
                                              boxShadow={3}
                                            >
                                              <Typography
                                                component="p"
                                                align="center"
                                              >
                                                {cdata.personName}{' '}
                                              </Typography>
                                              <Typography
                                                variant="caption"
                                                display="block"
                                                align="center"
                                              >
                                                ( Head )
                                              </Typography>
                                            </Paper>
                                          </Box>
                                        )}
                                      </Grid>
                                    ))}
                                  </Box>
                                </Grid>
                              </Grid>
                            </>
                          ) : (
                            <>
                              {parseInt(gLevel) > 0 ? (
                                <>
                                  {item[0]?.gLevel === gLevel - 1 ? (
                                    <Grid key={i} item xs={12}>
                                      <Grid container>
                                        <Grid item xs={12}>
                                          {gLevel > 1 ? (
                                            <Typography
                                              className={'MuiTypography--heading'}
                                              gutterBottom
                                              component="p"
                                              align="center"
                                            >
                                              {' '}
                                              Fore-Generation Level :{' '}
                                              {Math.abs(
                                                parseInt(item[0]?.gLevel)
                                              )}{' '}
                                            </Typography>
                                          ) : (
                                            <Typography
                                              className={'MuiTypography--heading'}
                                              gutterBottom
                                              component="p"
                                              align="center"
                                            >
                                              {' '}
                                              Sibling Level :{' '}
                                            </Typography>
                                          )}
                                        </Grid>
                                        <Box
                                          display="flex"
                                          flexWrap="wrap"
                                          width="100%"
                                        >
                                          {item?.map((cdata, j) => (
                                            <>
                                              {cdata.relation !== '' ? (
                                                <Grid key={j} item>
                                                  <Box p={1}>
                                                    <ModalName
                                                      key={cdata.id}
                                                      cdata={cdata}
                                                      sLevel={sLevel}
                                                      gLevel={gLevel}
                                                    />
                                                  </Box>
                                                </Grid>
                                              ) : (
                                                <Grid key={j} item>
                                                  <Box p={1}>
                                                    <Paper
                                                      className={`${classes.paper} ${classes.paperError}`}
                                                      variant="outlined"
                                                      elevation={3}
                                                    >
                                                      <Typography
                                                        component="p"
                                                        align="center"
                                                      >
                                                        {cdata.personName}{' '}
                                                      </Typography>
                                                      <Typography
                                                        variant="caption"
                                                        display="block"
                                                        align="center"
                                                      >
                                                        ( Head )
                                                      </Typography>
                                                    </Paper>
                                                  </Box>
                                                </Grid>
                                              )}
                                            </>
                                          ))}
                                        </Box>
                                      </Grid>
                                    </Grid>
                                  ) : (
                                    <></>
                                  )}
                                </>
                              ) : (
                                <>
                                  {item[0]?.gLevel === gLevel ? (
                                    <Grid key={i} item xs={12}>
                                      <Grid container>
                                        <Grid item xs={12}>
                                          <Typography
                                            className={'MuiTypography--heading'}
                                            gutterBottom
                                            component="p"
                                            align="center"
                                          >
                                            {' '}
                                            After-Generation Level :{' '}
                                            {Math.abs(
                                              parseInt(item[0]?.gLevel)
                                            )}{' '}
                                          </Typography>
                                        </Grid>
                                        <Box
                                          display="flex"
                                          flexWrap="wrap"
                                          width="100%"
                                        >
                                          {item?.map((cdata, j) => (
                                            <>
                                              {cdata.relation !== '' ? (
                                                <Grid key={j} item>
                                                  <Box p={1}>
                                                    <ModalName
                                                      key={cdata.id}
                                                      cdata={cdata}
                                                      sLevel={sLevel}
                                                      gLevel={gLevel}
                                                    />
                                                  </Box>
                                                </Grid>
                                              ) : (
                                                <Grid key={j} item>
                                                  <Box p={1}>
                                                    <Paper
                                                      className={`${classes.paper} ${classes.paperError}`}
                                                      variant="outlined"
                                                      elevation={3}
                                                    >
                                                      <Typography
                                                        component="p"
                                                        align="center"
                                                      >
                                                        {cdata.personName}{' '}
                                                      </Typography>
                                                      <Typography
                                                        variant="caption"
                                                        display="block"
                                                        align="center"
                                                      >
                                                        ( Head )
                                                      </Typography>
                                                    </Paper>
                                                  </Box>
                                                </Grid>
                                              )}
                                            </>
                                          ))}
                                        </Box>
                                      </Grid>
                                    </Grid>
                                  ) : (
                                    <></>
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </>
                      ))
                    ) : (
                      <Typography
                        className={'MuiTypography--heading'}
                        variant={'h5'}
                        gutterBottom
                        align="center"
                      >
                        {' '}
                        No Client is selected{' '}
                        {/* {Math.abs(parseInt(item[0]?.level))} */}
                      </Typography>
                    )}
                    {/* </Box> */}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ClientVisualizer;
