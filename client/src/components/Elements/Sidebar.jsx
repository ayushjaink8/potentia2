import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Route, Switch, Link } from 'react-router-dom';
import clsx from 'clsx';

import {
  Box,
  Grid,
  Button,
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import GroupIcon from '@material-ui/icons/Group';
import WorkIcon from '@material-ui/icons/Work';
import StorageIcon from '@material-ui/icons/StorageRounded';


import Dashboard from '../Pages/Dashboard';
import DataControl from '../Pages/DataControl';
import BusinessPanel from '../Pages/BusinessPanel';
import ClientEdit from './DataControlPanel/ClientEdit';
import BizTypeEdit from './businessPanel/BizTypeEdit';
import FamilyPanel from '../Pages/FamilyPanel'
import ClientDetails from '../Pages/ClientDetails';
import Page_404 from '../Pages/page_404';


import { useClientData } from './../../context/ClientContext';
import  Cookies from 'universal-cookie';


const cookies = new Cookies();

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  deco: {
    textDecoration: 'none',
    color: theme.palette.primary.dark,
    // margin: "10px"
  },
  potentiaDiv: {
    backgroundColor: theme.palette.secondary.light,
  },
  sidebarContent: {
    backgroundColor: theme.palette.secondary.light,
    height: '100vh',
    overflowX: 'hidden',
    boxShadow: '4px 4px 2px #000',
    maxWidth: 250,
  },
  divi: {
    backgroundColor: theme.palette.primary.light,
    // height: 2
  },
  sidebar: {
    overflowX: 'hidden',
  },
  LogoutBtn: {
    // '&:hover': {
    //   backgroundColor: theme.palette.secondary.main,
    //   border: '2px solid #585858',
    //   color: '#585858'
    // },
  }
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const { loggedin, setloggedin } = useClientData();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const clicked = (e) => {
    console.log(e.target);
  };

  return (
    <div className={classes.root}>

      <CssBaseline />

      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >

        <Toolbar>
          <Grid container>
            <Grid item xs={6} md={5}>
              <Box display="flex" justifyContent="start" alignItems="center ">

                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, {
                    [classes.hide]: open,
                  })}
                >
                  <MenuIcon />
                </IconButton>

                <Switch>
                  <Route exact path="/">
                    <Typography variant="h6" noWrap>
                      Dashboard
                    </Typography>
                  </Route>
                  <Route exact path="/dcpanel">
                    <Typography variant="h6" noWrap>
                      Data Control Panel
                    </Typography>
                  </Route>
                  <Route exact path="/familyPanel">
                    <Typography variant="h6" noWrap>
                      Family Tree View
                    </Typography>
                  </Route>
                  <Route exact path="/business">
                    <Typography variant="h6" noWrap>
                      Business Control Panel
                    </Typography>
                  </Route>
                  <Route exact path="/clientDetails">
                    <Typography variant="h6" noWrap>
                      Client Details Panel
                    </Typography>
                  </Route>
                </Switch>

              </Box>
            </Grid>
            <Grid style={{alignSelf:'center'}} item xs={6} md={7}>
              {loggedin ? (
                <Box display="flex" alignItems="center" justifyContent="flex-end" >
                  <Typography noWrap ><Box mr={2}>Welcome Senthil!</Box></Typography>
                  <Button className={classes.LogoutBtn} variant="outlined" color="secondary" 
                    onClick={ () => {cookies.remove('token'); setloggedin(false)} } 
                  >
                    Logout
                  </Button>
                </Box>
              ) : (
                <></>
              )}
            </Grid>
          </Grid>
        </Toolbar>

      </AppBar>


      <Drawer
        variant="permanent"
        className={`${clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })} ${classes.sidebar}`}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >

        <Box
          boxShadow={2}
          className={`${classes.potentiaDiv}`}
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={64}
          py={4}
        >
          <Grid container>
            <Grid item xs={9}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height={50}
              >
                <Typography variant="h4" align="center">
                  Potentia
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </Grid>
          </Grid>
        </Box>
        <Box bgcolor="secondary.light">
          <Divider className={`${classes.divi}`} light={true} />
        </Box>


        <List className={classes.sidebarContent}>

          <Link to="/" className={`li-1 ${classes.toolbar} ${classes.deco}`} onClick={clicked} >
            <ListItem
              button
              data-list-type="dash"
              key={'Dashboard'}
              className={`li-1 ${classes.activeDeco}`}
              onClick={clicked}
            >
              <ListItemIcon
                className={`li-1 ${classes.activeDeco}`}
                data-list-type="dash"
              >
                <DashboardIcon className="li-1" data-list-type="dash" />
              </ListItemIcon>
              <ListItemText data-list-type="dash" primary={'Dashboard'} />
            </ListItem>
          </Link>

          <Link to="/dcpanel" className={`${classes.toolbar} ${classes.deco}`}>
            <ListItem
              button
              data-list-type="dcp"
              className="li-3"
              key={'Data Control Panel'}
            >
              <ListItemIcon className="li-3" data-list-type="dcp">
                <StorageIcon style={{border:"2px solid #6b5617", borderRadius:"4px"}} data-list-type="dcp" />
              </ListItemIcon>
              <ListItemText data-list-type="ccp" primary={'Data Control Panel'} />
            </ListItem>
          </Link>

          <Link to="/familyPanel" className={`${classes.toolbar} ${classes.deco}`}>
            <ListItem
              button
              data-list-type="family"
              className="li-3"
              key={'Family Panel'}
            >
              <ListItemIcon className="li-3" data-list-type="family">
                <GroupIcon data-list-type="family" />
              </ListItemIcon>
              <ListItemText primary={'Family Panel'} />
            </ListItem>
          </Link>

          <Link to="/business" className={`${classes.toolbar} ${classes.deco}`}>
            <ListItem
              button
              data-list-type="business"
              className="li-3"
              key={'Business Panel'}
            >
              <ListItemIcon className="li-3" data-list-type="business">
                <WorkIcon data-list-type="business" />
              </ListItemIcon>
              <ListItemText primary={'Business Panel'} />
            </ListItem>
          </Link>

          <Link to="/clientDetails" className={`${classes.toolbar} ${classes.deco}`}>
            <ListItem
              button
              data-list-type="client"
              className="li-3"
              key={'Client Details'}
            >
              <ListItemIcon className="li-3" data-list-type="client">
                <AccountBoxIcon data-list-type="client" />
              </ListItemIcon>
              <ListItemText primary={'Client Details'} />
            </ListItem>
          </Link>

        </List>



      </Drawer>


      <main className={`${classes.content}  contentBg-3`}>
        <div className={`${classes.toolbar}`} />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/dcpanel" component={DataControl} />
          <Route exact path="/business" component={BusinessPanel} />
          <Route exact path="/biz/edit/:id" component={BizTypeEdit} />
          <Route exact path="/ccpanel/edit/:id" component={ClientEdit} />
          <Route exact path="/familyPanel" component={FamilyPanel} />
          <Route exact path="/clientDetails" component={ClientDetails} />
          <Route exact path="/clientDetails/:id" component={ClientDetails} />
          <Route exact path="*" component={Page_404} ></Route>
        </Switch>
      </main>


    </div>
  );
}
