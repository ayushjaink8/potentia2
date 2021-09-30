import React, { useState } from 'react';
import { useEffect } from 'react';
import { Typography, Slider } from '@material-ui/core';
// import { useClientData } from '../../../context/ClientContext';

const SLevel = ({ clientId, sLevel, setsLevel, clientFamilyData}) => {

  const [maxLevel, setmaxLevel] = useState(-1);

  function valuetext(value) {
    if (value === -1) setsLevel(-100);
    else setsLevel(value);
    return `${value}`;
  }
  const fun = () => {
    let data = 0;
    // clientRelations.forEach((item) => {
    //   if (item.id === clientId) {
    //     item.value.forEach((rel) => {
    //       if (rel.level === 0) data = Math.max(data, rel.siblinglevel);
    //     });
    //     return;
    //   }
    // });

    clientFamilyData.forEach((item) => {
      let currentLevel = parseInt(item.value.siblingLevel);
      data = Math.max(data, currentLevel);
      return;
    });

    setmaxLevel(data);
  };

  useEffect(() => {

    if (parseInt(clientId) !== 0) fun();

    // eslint-disable-next-line
  }, [clientId, clientFamilyData, fun]);


  return (
    <>
      <Typography>Select Sibling Level: </Typography>
      <Slider
        defaultValue={-100}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={-1}
        max={maxLevel}
      />
    </>
  );
};

export default SLevel;
