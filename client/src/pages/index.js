import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardMedia,
  FormControl,
  FormLabel,
  Input,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 345,
    backgroundColor: '#eee',
  },
  media: {
    height: 100,
    paddingTop: '56.25%', // 16:9
  },
  title: {
    height: 20,
    width: '100%',
    textAlign: 'center',
  },
  display_grid: {
    display: 'flex',
    minWidth: 345,
    gap: 5,
    marginTop: 30,
  },
  flex: {
    display: 'flex',
    minHeight: 300,
    flexDirection: 'column',
    width: '25%',
    gap: 30,
    paddingLeft: 100,
    paddingRight: 100,
  },
}));

const IndexPage = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const formRef = useRef(null);
  const submit = e => {
    e.preventDefault();
    const url = 'http://localhost:3030/submit';

    let form_data = new FormData(formRef.current);

    axios({
      url,
      method: 'post',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: form_data,
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.error(err));
    window.location.reload();
  };

  useEffect(() => {
    axios
      .get('http://localhost:3030/posts')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <form onSubmit={submit} ref={formRef}>
        <Box className={classes.flex}>
          <h1 style={{ margin: 0, padding: 0 }}>Form</h1>
          <FormControl>
            <FormLabel>Text</FormLabel>
            <Input type='text' name='text' id='text' />
          </FormControl>
          <FormControl>
            <FormLabel>File</FormLabel>
            <Input type='file' name='test' id='test' />
          </FormControl>
          <FormControl>
            <Button type='submit' color='primary' variant='contained'>
              Submit
            </Button>
          </FormControl>
        </Box>
      </form>
      <Box className={classes.display_grid}>
        {data.map(obj => (
          <Card className={classes.root} key={obj._id}>
            <h2 className={classes.title}>{obj.description}</h2>
            <CardMedia
              className={classes.media}
              image={`http://localhost:3030/${obj.file_path.replace(
                '\\',
                '/'
              )}`}
            />
          </Card>
        ))}
      </Box>
    </div>
  );
};

export default IndexPage;
