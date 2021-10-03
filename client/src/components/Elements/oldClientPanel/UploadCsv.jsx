import React, { useState } from 'react';
import {
  Grid,
  Button,
  Card,
  CardContent,
  TextField,
  Box,
  CircularProgress
} from '@material-ui/core';
import { CloudUpload } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core';
import { useClientData } from '../../../context/ClientContext';

const useStyles = makeStyles({
  upload: {
    borderRadius: 10,
    whiteSpace: 'nowrap',
    textTransform: 'capitalize',
  },
  uploadText: {
    borderRadius: 30,
    textAlign: 'center',
  },
  card: {
    margin: 'auto',
    transition: '0.3s',
    boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
    borderRadius: 10,
    position: 'relative',
  },
  content: {
    textAlign: 'left',
  },
});

const UploadCsv = () => {
  const classes = useStyles();

  const { uploadClient } = useClientData();

  const [csvData, setcsvData] = useState(null);
  const [csvFileName, setcsvFileName] = useState('Select a CSV/XLSX File');
  const [showLoading, setShowLoading] = useState(false);

  const [loadingBtn, setloadingBtn] = useState('Submit');
  const getFile = (e) => {
    setcsvData(e.target.files[0]);
    if (e.target.files[0] !== undefined) setcsvFileName(e.target.files[0].name);
    else setcsvFileName('Select a CSV/XLSX File');
  };
  const sendData = async (e) => {
    e.preventDefault();
    setloadingBtn('Uploading...');
    setShowLoading(true);
    document.getElementById('uploadBtn').disabled = true;
    document.getElementById('uploadBtn').style.backgroundColor = '#e5e5e5';
    if (
      ( csvData.name.split('.')[1] === 'csv' ||
        csvData.name.split('.')[1] === 'xlsx' ||
        csvData.name.split('.')[1] === 'xls'
      ) &&
      ( csvData.type === 'text/csv' ||
        csvData.type === 'application/vnd.ms-excel' ||
        csvData.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      )
    ) {
      let formData = new FormData(e.target);
      console.log('start');
      const res = await uploadClient(formData);
      console.log('end');
      if (res === 'UPLOADED') {
        setloadingBtn('Submitted');
        alert(res);
        setloadingBtn('Submit');
      } else {
        setloadingBtn('Failed');
        alert(res);
        setloadingBtn('Submit');
      }
    } else {
      setloadingBtn('Failed');
      alert('Invalid File Type!\nOnly .csv/ .xlsx/ .xls formats are allowed!');
      setloadingBtn('Submit');
    }
    setShowLoading(false);
    document.getElementById('uploadBtn').disabled = false;
    document.getElementById('uploadBtn').style.backgroundColor = '#eabc33';
    // console.dir(e.target);
    e.target.elements[0].value = '';
    e.target.elements[1].value = '';
    setcsvFileName('Select a CSV File');
  };
  return (
    <>
      <Card className={classes.card}>
        <CardContent className={classes.content} style={{minWidth:"200px"}}>
          <form encType="multipart/form-data" id="csv-form" onSubmit={sendData}>
            <Grid container spacing={2}>
              <Grid item xs={9}>
                <TextField
                  variant="outlined"
                  value={csvFileName}
                  disabled
                  fullWidth
                  inputProps={{
                    style: {marginRight: '10px'},
                  }}
                  InputProps={{
                    endAdornment: (
                      <label htmlFor="csvfile">
                        <input
                          type="file"
                          accept="csv"
                          id="csvfile"
                          name="csvfile"
                          onChange={getFile}
                          aria-describedby="Client Relations CSV File"
                          required
                          hidden
                        />
                        <Button
                          color="secondary"
                          variant="contained"
                          disableElevation
                          component="span"
                          size="small"
                          className={classes.upload}
                          startIcon={<CloudUpload />}
                        >
                          UPLOAD
                        </Button>
                      </label>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                >
                  {showLoading ? (
                    <CircularProgress color="secondary" />
                  ) : (
                    <Button
                      id="uploadBtn"
                      variant="contained"
                      color="secondary"
                      type="submit"
                    >
                      {loadingBtn}
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default UploadCsv;
