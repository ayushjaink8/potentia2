import { useState, createContext, useContext, useEffect } from 'react';
import axios from 'axios';
import { host } from './BackendConnection';

const FamilyPanelContext = createContext();

export const useFamilyPanelData = () => useContext(FamilyPanelContext);


function FamilyPanelContextProvider(props) {


  const getAllFamilyNotes = async (FamilyId) => {
    const res = await axios.post(host + '/api/family/getAllFamilyNotes', {FamilyID: FamilyId});
    if(res) return res.data;
  };

  const updateMemberNotes = async (FamilyId, personID, Notes) => {
    const res = await axios.post(host +'/api/family/updateMemberNotes',
      {FamilyID: FamilyId, personID: personID, personNotes: Notes}
    );
    if(res) return res.data;
  }

  const deleteAllFamilyNotes = async (FamilyId) => {
    const res = await axios.post(host +'/api/family/deleteAllFamilyNotes', [FamilyId]);
    if(res) return res.data;
  }


  return (
    <FamilyPanelContext.Provider
      value={{
        getAllFamilyNotes,
        updateMemberNotes,
        deleteAllFamilyNotes
      }}
    >
      {props.children}
    </FamilyPanelContext.Provider>
  );

}



export default FamilyPanelContextProvider;