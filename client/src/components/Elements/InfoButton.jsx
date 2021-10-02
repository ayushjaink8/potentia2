import React from 'react';
import {
  Box,
  Button,
  IconButton
 } from '@material-ui/core';
import Info_icon from './info_icon.svg';

const InfoButton = ({height}) => {
  return (
    <>
      <IconButton
        value="close"
        color="primary"
        style={{minWidth:"fit-content"}}
      >
        <img src={Info_icon} style={{height: height}}/>
      </IconButton>
    </>
  );
};

export default InfoButton;