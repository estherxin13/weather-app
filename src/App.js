import './App.css';
import { React, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import { Divider, Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Image from './images/nature1.png'; // Import using relative path


const api = {
  key: "8b1322f04ede553a7700d587b6619b96",
  base: "https://api.openweathermap.org/data/2.5/"
}

const useStyles = makeStyles(theme => ({
  root: {
    margin: 'auto',
    '& > *': {
      margin: theme.spacing(1),
      minWidth: '50ch',
    },
  },
  main: {
    minHeight: '100vh',
    paddingTop: theme.spacing(4),
  },
  app: {
    backgroundImage: `url(${Image})`,
    [theme.breakpoints.down('md')]: {
      backgroundImage: 'none',
    },
    
  },
  card: {
    backgroundColor: 'white',
    width: 700,
    margin: 'auto',
    minHeight: 100,
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  location: {
    fontSize: 30,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(6),
  },
  date: {
    marginTop: theme.spacing(5),
    color: 'grey',
    fontSize: 18,
  },
  temp: {
    margin: theme.spacing(5),
    fontSize: 30,
  },
  weather: {
    margin: theme.spacing(3),
    fontSize: 35,
    textAlign: 'center'
  },
  search: {
    paddingTop: theme.spacing(2),
    width: '100%',
    height: 50,
    fontSize: 20,
    outline: 'none',
    display: 'block',
    borderRadius: 6,
  },
  imageCloud: {
    width: 400,
  },
  imageSun: {
    width: 200,
  },
  imageRain: {
    width: 250,
  },
  center: {
    textAlign: 'center'
  },
  textRoot: {
    textAlign: 'center',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
    '& ul': {
      listStyle: 'none',
      padding: 0,
    },
    '& li': {
      paddingTop: theme.spacing(1),
    },
  },
  subtitle: {
    color: 'grey',
    fontSize: 20,
    marginTop: theme.spacing(1),
  }

}));

function App() {
  const classes = useStyles();

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={classes.app}>
      <main className={classes.main}>
        <Box boxShadow={3} className={classes.card}>
          <Input
            variant="outlined"
            className={classes.search}
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
            type="text"
            placeholder="search any city"
          />
          {(typeof weather.main != "undefined") && (
            <>
              <div className={classes.date}>
                {dateBuilder(new Date())}
              </div>
              <div className={classes.location}>
                <strong>{weather.name}, {weather.sys.country}</strong>
              </div>
              {weather.weather[0].main === "Rain" && 
              <div className={classes.center}>
                <img className={classes.imageRain} alt="logo" src="/rain.png" />
              </div>}
              {weather.weather[0].main === "Sunny" || weather.weather[0].main === "Clear" ?
              <div className={classes.center}>
                <img className={classes.imageSun} alt="logo" src="/sun.png" />
              </div>: <></>}
              {weather.weather[0].main === "Clouds" && 
              <div className={classes.center}>
                <img className={classes.imageCloud} alt="logo" src="/cloud.png" />
              </div>}
              <div className={classes.weather}>
                {weather.weather[0].main}
              </div>
              <div className={classes.textRoot}>
              <Divider />
                <Grid container spacing={0} justifyContent="space-around">
                  <Grid item xs={12} sm={4}>
                    <ul>
                      <li className={classes.subtitle}>
                        humidity
                      </li>
                      <li className={classes.weather}>
                        <strong>{weather.main.humidity} %</strong>
                      </li>
                    </ul>
                  </Grid>
                  <Divider orientation="vertical" flexItem />
                  <Grid item xs={12} sm={4}>
                    <ul>
                      <li className={classes.subtitle}>
                        temp
                      </li>
                      <li>
                        <div className={classes.weather}>
                          <strong>{Math.round(weather.main.temp)} °C</strong>
                        </div>
                      </li>
                    </ul>
                  </Grid>
                  <Divider orientation="vertical" flexItem />
                  <Grid item xs={12} sm={3}>
                    <ul>
                      <li className={classes.subtitle}>
                        wind
                      </li>
                      <li className={classes.weather}>
                        <strong>{weather.wind.speed}</strong>
                      </li>
                    </ul>
                  </Grid>
                </Grid>
              </div>
            </>
          )}
        </Box>
      </main>
    </div>
  );
}

export default App;
