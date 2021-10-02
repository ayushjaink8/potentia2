import { useState, createContext, useContext, useEffect } from 'react';
import axios from 'axios';
import { host } from './BackendConnection';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const ClientContext = createContext();

export const useClientData = () => useContext(ClientContext);

function ClientContextProvider(props) {
  const [allClients, setallClients] = useState([]);
  const [clientRelations, setclientRelations] = useState([]);
  // const [crelations, setcrelations] = useState([]);

  const [loggedin, setloggedin] = useState(false);

  const [loading, setloading] = useState(false); // control the 0.1 sec loading page before automatic login through cookies

  const getClientsData = async () => {
    const res = await axios.get(host + '/api/client/getAllClients');
    setallClients(res.data);
  };

  /////  Check difference between getAllRelations and getFamilyRelations again and check their used cases...

  const getAllRelations = async () => {
    // const res = await axios.get(host + '/api/client/getAllRelations');
    // console.log("4");
    // setclientRelations(res.data);
    const res = await axios.get(host + '/api/client/getAllRelations');
    setclientRelations(res.data);
  };


  const getFamilyRelations = async (FamilyId) => {
    const res = await axios.post(host + '/api/client/getFamilyRelations', {FamilyId});
    if(res) return res.data[0];
  };


  const deleteClients = async (selectedRows) => {
    const res = await axios.post(
      host + '/api/client/deleteclients',
      selectedRows
    );
    const res2 = await axios.post(
      host + '/api/biz/deleteClientBizData',
      selectedRows
    )
    const res3 = await axios.post(
      host + '/api/family/deleteAllFamilyNotes',
      selectedRows
    )

    if (res.data.message === 'DELETED' || res2.data.message === 'DELETED' || res3.data.message === 'DELETED') {
      await getClientsData();
      await getAllRelations();
      return 'DELETED';
    }
    else return 'Error Occurred! [ClientContext.js]';
  };

  const uploadClient = async (formData) => {
    console.log("1");
    const res = await axios.post(host + '/api/client/uploadcsv', formData);
    console.log("2");
    if (res) {
      console.log(res.data);
      await getClientsData();
      await getAllRelations();
      return res.data.message;
    }
  };

  const loginThroughCookies = async (token) => {
    const res = await axios.post(host + '/api/login/loginThroughCookies', token);
    if (res.data.status === true) {
      setloggedin(true);
      setloading(false);
    } else {
      setloading(false);
      setloggedin(false);
    }
  }

  const getLogin = async (creds) => {

    const res = await axios.post(host + '/api/login/', creds);
    if (res.data.status === true) {
      setloggedin(true);
      setloading(false);
      cookies.set('token', String(res.data.token), {maxAge: 10e9});  // expiry date of cookie is set to be practically infinite (~ 1200 years)
    } else {
      alert(res.data.error);
    }
  };

  const editName = async (id, pname) => {
    const res = await axios.post(host + '/api/dashboard/editname', {
      id,
      name: pname,
    });
    if (res) {
      await getClientsData();
      await getAllRelations();

      // after getting client_rel_id
      return res;
    }
  };

  const updateClient = async (data, clientId) => {
    const res = await axios.post(host + '/api/client/updateclientdt', {
      data,
      clientId,
    });
    if (res) {
      await getClientsData();
      await getAllRelations();

      // after getting client_rel_id
      return res;
    }
  };

  const getClient = async (id) => {
    const res = await axios.post(host + `/api/client/getclientDt`, { id });
    if (res) {
      return res.data;
    }
  };

  const getRelationTable = async (client1, client2, clientId) => {
    const res = await axios.post(host + '/api/client/getRelationTable', {
      client1,
      client2,
      clientId,
    });
    if (res) return res;
  };

  const updateRelationTable = async(ClntClntRelateID,CCRelateName, CCRelateDescription) => {
    const res = await axios.post(host + '/api/client/updateRelationTable', {
      ClntClntRelateID,
      CCRelateName,
      CCRelateDescription
    })
    if(res) return res;
  }


  useEffect(() => {
    getClientsData();
    getAllRelations();
  }, []);

  return (
    <ClientContext.Provider
      value={{
        allClients,
        clientRelations,
        // crelations,
        getFamilyRelations,
        deleteClients,
        uploadClient,
        loggedin,
        setloggedin,
        loading,
        setloading,
        getLogin,
        getClient,
        editName,
        updateClient,
        getRelationTable,
        updateRelationTable,
        loginThroughCookies,
        host,
      }}
    >
      {props.children}
    </ClientContext.Provider>
  );
}

export default ClientContextProvider;
