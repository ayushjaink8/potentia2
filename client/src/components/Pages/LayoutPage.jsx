import React, {useEffect} from 'react';
import LoginPage from './LoginPage';
import Sidebar from './../Elements/Sidebar';
import { useClientData } from '../../context/ClientContext';
import { Box, CircularProgress } from '@material-ui/core';
import  Cookies from 'universal-cookie';

const LayoutPage = () => {

  const { loginThroughCookies } = useClientData();
  const { loggedin } = useClientData();
  const {loading, setloading} = useClientData();

  const cookies = new Cookies();

  useEffect(() => {
    if(cookies.get('token')){
      setloading(true);
      const token = cookies.get('token');   // getting token from cookies and validating
      loginThroughCookies({token});
    }
    console.log("testing");
  }, []);

  let loadPage;
  loadPage= <>
              <Box m={2} fontSize={30} fontWeight={900}  color="text.primary" display="flex" justifyContent="center">
                <Box mx={2}><CircularProgress color="secondary" /></Box>
                Loading ...
              </Box>
            </>

  return(
      <>
        {/* {loggedin ? <Sidebar /> : <LoginPage />} */}
        {(loggedin)
          ? <Sidebar/>
          : <>
              { (loading)
                ? <>{loadPage}</>
                : <LoginPage />
              }
            </>
        }
      </>
  )

};

export default LayoutPage;
