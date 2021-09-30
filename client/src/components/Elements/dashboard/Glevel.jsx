import React, { useState } from 'react';
import { useEffect } from 'react';
import { Typography, Slider } from '@material-ui/core';
// import { useClientData } from '../../../context/ClientContext';

const Glevel = ({ clientId, setgLevel, clientFamilyData }) => {


  const [maxLevel, setmaxLevel] = useState(0);
  const [minLevel, setminLevel] = useState(0);

  function valuetext(value) {
    setgLevel(value);
    return `${value}`;
  }
  const fun = async () => {

    let min=0, max=0;

    await clientFamilyData.forEach((item) => {
        let currentLevel = parseInt(item.value.gLevel) + 1;
        max = Math.max(max, currentLevel);
        min = Math.min(min, currentLevel);
        return;
    });

    setmaxLevel(max);
    setminLevel(min);

  };

  useEffect(() => {

    if (parseInt(clientId) !== 0) fun();

    // eslint-disable-next-line
  }, [clientId, clientFamilyData]);

  return (
    <>
      <Typography>Select Generation Level: </Typography>
      <Slider
        defaultValue={0}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={minLevel}
        max={maxLevel}
      />
    </>
  );
};

export default Glevel;
