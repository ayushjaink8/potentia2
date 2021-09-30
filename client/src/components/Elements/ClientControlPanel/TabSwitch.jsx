import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ClntClntRel from './Tabs/ClntClntRel';
import ClntFrm from './Tabs/ClntFrm';
import ClntDt from './Tabs/ClntDt';

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
}));

export default function NavTabs({ presClient, clientId }) {
  const classes = useStyles();
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
          <LinkTab label="Client-Client-Relate" {...a11yProps(0)} />
          <LinkTab label="ClientFirmRelateDt" {...a11yProps(1)} />
          <LinkTab label="ClientDt" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ClntClntRel clientId={clientId} presClient={presClient} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ClntFrm clientId={clientId} presClient={presClient}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ClntDt clientId={clientId} presClient={presClient} />
      </TabPanel>
    </div>
  );
}
