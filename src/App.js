import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import VideoRecorder from 'react-video-recorder'
import {Paper, Typography, Grid} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import {useState, useEffect} from 'react';

const BACKEND = 'http://7b708aa1b533.ngrok.io';

const useStyles = makeStyles({
  root: {
    padding: '10px 10px'
  },
  header: {
    padding: '40px 30px',
  },
  video: {
    height: window.innerWidth/2,
    padding: '30px 30px'
  },
  paper: {
    height: '100%',
    padding: '30px 30px',
    margins: '5px 5px',
  },
  type: {
    alignItems: 'left',
    justifyContent: 'left',
  },
  grid: {
    display: 'flex',
  }

});


function App() {
  const classes = useStyles();
  const [predictions, setPredictions] = useState({});
  const [havePred, setHavePred] = useState(false);


  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Header/>
      </div>
      
      <Grid className={classes.grid} container spacing={3}>
        <Grid item xs={7}>
          <Paper className={classes.video}>
            <VideoRecorder
              constraints={{
                audio: false,
                video: true
              }}
              onRecordingComplete={videoBlob => {
                console.log(URL.createObjectURL(videoBlob));
                const formData = new FormData();
                const file = new File([videoBlob], 'recording.mp4', {
                  type: 'video/mp4',
                })
                formData.append('file', file)
                fetch(`${BACKEND}/post_video/`, {
                  method: 'POST',
                  body: formData
                })
                .then(response => response.json())
                .then((data) => {
                  console.log(data)
                  setPredictions(data);
                  setHavePred(true);
                })
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <div>
            {havePred ? 
            <div> 
              <Paper className={classes.paper} align='left'>
                <Typography variant='h4' color='primary'> Predictions: </Typography>
                <Typography variant='h6'> 1. {predictions[1]} </Typography>
                <Typography variant='h6'> 2. {predictions[2]} </Typography>
                <Typography variant='h6'> 3. {predictions[3]} </Typography>
                <Typography variant='h6'> 4. {predictions[4]} </Typography>
                <Typography variant='h6'> 5. {predictions[5]} </Typography>
              </Paper>
            </div> : <></>}
          </div>
        </Grid>
      </Grid>
      

    </div>


  );
}

export default App;