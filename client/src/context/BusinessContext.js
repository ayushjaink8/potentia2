import { useState, createContext, useContext, useEffect } from 'react';
import axios from 'axios';
import { host } from './BackendConnection';

const BusinessContext = createContext();

export const useBusinessData = () => useContext(BusinessContext);


function BusinessContextProvider(props) {


  const [allBizTypes, setallBizTypes] = useState([]);

  /// addCustomBizType getAllBizType deleteBizType  renameBizType     ---for global BizTypes


  const getAllBizTypes = async () => {
    const res = await axios.get(host + '/api/biz/getBusinessType');
    setallBizTypes(res.data);
  };

  const deleteBizType = async (BizTypeId) => {
    const res = await axios.post(host + '/api/biz/deleteBizType',{BizTypeID: BizTypeId});
    if(res) getAllBizTypes();
  }

  const addCustomBizType = async (BizTypeName) => {
    const res = await axios.post(host +'/api/biz/addCustomBizType',{BizTypeName: BizTypeName});
    if(res) getAllBizTypes();
  }


  /// addClientBizType  removeClientBizType  editClientBizType getClientBizType    ---for a particular client

  const getClientBizType = async (ClientId) => {
    const res = await axios.post(host + '/api/biz/getClientBizType', {ClientID: ClientId} );
    return res.data;
  }

  const removeClientBizType = async (selectedRows, selectedClient) => {
    const res = await axios.post(host + '/api/biz/removeClientBizType', [selectedRows, selectedClient] );
    return res.data;
  }


  useEffect(() => {
    getAllBizTypes();
  }, []);



  return (
    <BusinessContext.Provider
      value={{
        allBizTypes,
        getAllBizTypes,
        deleteBizType,
        addCustomBizType,
        host,
        getClientBizType,
        removeClientBizType,
      }}
    >
      {props.children}
    </BusinessContext.Provider>
  );

}



export default BusinessContextProvider;