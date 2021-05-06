import './App.css';
import { React, useState } from 'react';
import { makeStyles } from '@material-ui/core';
// import Image from './images/forrest.png'; // Import using relative path
import Card from '@material-ui/core/Card';

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
  app: {
    // backgroundImage: `url(${Image})`,
    backgroundColor: 'black',
    // backgroundSize: 'cover',
    // backgroundPosition: 'top',
    textAlign: 'center'
  },
  main: {
    minHeight: '100vh',
    paddingTop: theme.spacing(10),
  },
  card: {
    width: 500,
    margin: 'auto',
    minHeight: 100,
  },
  location: {
    margin: theme.spacing(5),
    fontSize: 25,
    textShadow: '2px 2px grey',
  },
  date: {
    margin: theme.spacing(5),
    fontSize: 18,
  },
  temp: {
    margin: theme.spacing(5),
    fontSize: 30,
  },
  weather: {
    margin: theme.spacing(5),
    fontSize: 18,
  },

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
        <Card className={classes.card}>
          <input
             className={classes.search}
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
            type="text"
            placeholder="search any city"
          />
          {(typeof weather.main != "undefined") ? (
            <div className={classes.locationBox}>
              <div className={classes.location}><strong>{weather.name}, {weather.sys.country}</strong></div>
              <div className={classes.date}><strong>Date: </strong>{dateBuilder(new Date())}</div>
              <div className={classes.temp}>
                {weather.main.temp} °C
              </div>
              <div className={classes.weather}>
                {weather.weather[0].main}
              </div>
              <div className={classes.temp}>
                feels like: {weather.main.feels_like} °C
              </div>
              <div className={classes.temp}>
                humidity: {weather.main.humidity} %
              </div>
              <div className={classes.temp}>
                wind speed: {weather.wind.speed} km/h
              </div>
            </div>
          ) : (<div>Please enter a city with correct spelling</div>)}
        </Card>
      </main>
    </div>
  );
}

export default App;
