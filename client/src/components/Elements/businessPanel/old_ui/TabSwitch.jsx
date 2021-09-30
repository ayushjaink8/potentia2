import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import BizTypeDt from './BizTypeDt';
import WbAcsRights from '../WbAcsRights';
import BizOperatorDt from './BizOperatorDt';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  selectMsg: {
    color: '#585858',
    display: 'inline',
    marginLeft: theme.spacing(1.5),
  },
}));

export default function NavTabs(selectedClient) {
  const classes = useStyles();

  const SelectClientMsg = () => <>
                                  <Box  display="flex" justifyContent="center">
                                    <Box className={classes.selectMsg}>
                                      Please Select a Client ID
                                    </Box>


                                  </Box>
                                </>

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Biz-Type-Dt" {...a11yProps(0)} />
          <LinkTab label="Web-Acs-Rights" {...a11yProps(1)} />
          <LinkTab label="Biz-Operator-Dt" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      {/* {console.log('sssss',selectedClient.selectedClient)} */}
      <TabPanel value={value} index={0}>
        {/* <ClntClntRel clientId={clientId} presClient={presClient} /> */}
        {(selectedClient.selectedClient===0)? <SelectClientMsg/> : <BizTypeDt presClient={selectedClient.selectedClient}/>}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* <ClntFrm clientId={clientId} presClient={presClient}/> */}
        {(selectedClient.selectedClient===0)? <SelectClientMsg/> : <WbAcsRights/>}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {/* <ClntDt clientId={clientId} presClient={presClient} /> */}
        {(selectedClient.selectedClient===0)? <SelectClientMsg/> : <BizOperatorDt/>}
      </TabPanel>
    </div>
  );
}