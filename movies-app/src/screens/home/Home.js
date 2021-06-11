import React from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import moviesData from '../../common/moviesData';
import genres from '../../common/genre';
import artists from '../../common/artists';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';  
import InputLabel from '@material-ui/core/InputLabel';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';




const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    titleBar: {
      background:
        'rgba(0,0,0,0.5)',
    },
  }));

  const useStyles1 = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      overflow: 'default',
      backgroundColor: theme.palette.background.paper,
    },
    titleBar: {
      background:
        'rgba(0,0,0,0.5)',
    },
  }));

  const useStyles_filters = makeStyles((theme)=>({
    root: {
      minWidth: 240,
      maxWidth: 240,
      margin: theme.spacing.unit,
      display:'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      
    },
    setMargin: {
      margin: theme.spacing.unit,
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    heading: {
      color: theme.palette.primary.light,
    }
  }));
  
  export function SimpleCard() {
    const classes = useStyles_filters();
    const [genre, setGenre] = React.useState('');

    const handleChange = (event) => {
      setGenre(event.target.value);
    };
  
    const [state, setState] = React.useState({
      checked: false,
    });
  
    const handleChange_checkbox = (event) => {
      setState({ ...state, [event.target.name]: event.target.checked });
    };
    return (
      <Card className={classes.root}>
        <CardContent>
          <p className={classes.heading}>FIND MOVIES BY:</p>
        <FormControl>
          <InputLabel htmlFor="movie-name">Movie Name</InputLabel>
          <Input id="movie-name" type="text" />
          <TextField
          id="standard-select-genre"
          select
          label="Genres"
          value={genre}
          onChange={handleChange}
          className={classes.setMargin}
        >
          {genres.map((option) => (
            <FormGroup column>
              <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checked}
                      onChange={handleChange_checkbox}
                      name={"checked"+option.id}
                      color="primary"
                    />
                  }
                  label = {<MenuItem key={option.id} value={option.name}>
                  {option.name}
                </MenuItem>}
                />
              
            </FormGroup>
          ))}
        </TextField>
        <TextField
          id="standard-select-artist"
          select
          label="Artists"
          value={genre}
          onChange={handleChange}
          className={classes.setMargin}
        >
          {artists.map((option) => (
            <FormGroup column>
              <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checked}
                      onChange={handleChange_checkbox}
                      name="checked"
                      color="primary"
                    />
                  }
                  label = {<MenuItem key={option.id} value={option.first_name + ' ' + option.last_name}>
                  {option.first_name + ' ' + option.last_name}
                </MenuItem>}
                />
              
            </FormGroup>
          ))}
        </TextField>
        <TextField id="release-date" type="date" label="Release Date Start" InputLabelProps={{ shrink: true }} className={classes.setMargin}/>
        <TextField id="release-date" type="date" label="Release Date End" InputLabelProps={{ shrink: true }} className={classes.setMargin}/>
        </FormControl>
        </CardContent>
        <CardActions>
        <Button className="apply-btn" variant="contained" color="primary">
          APPLY 
        </Button> 
        </CardActions>
      </Card>
    );
  }
  




export function SingleLineGridList() {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <GridList cellHeight={250} className={classes.gridList} cols={6}>
          {moviesData.map((tile) => (
            <GridListTile key={tile.id}>
              <img src={tile.poster_url} alt={tile.title} />
              <GridListTileBar
                title={tile.title}
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }

  function getDate(dt) {
    var full_date = dt.split("T")[0];
    var year = full_date.split("-")[0];
    var mon = full_date.split("-")[1] - 1;
    var date = full_date.split("-")[2];
    var newDate = new Date(year, mon, date);
    return newDate.toDateString();
  }

  export function TitlebarGridList() {
    const classes = useStyles1();
  
    return (
      <div className={classes.root}>
        <GridList cellHeight={350} cols={4} className={classes.gridList}>
          {moviesData.map((tile) => (
              <GridListTile key={tile.id} className="movie-tile">
              <img src={tile.poster_url} alt={tile.title} />
              <GridListTileBar
                title={tile.title}
                subtitle={<span>Release Date: {getDate(tile.release_date)}</span>}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }

class Home extends React.Component {

    render(){
        return (
        <>
            <Header/>
            <div className="heading"><span>Upcoming Movies</span></div>
            <div>
                <SingleLineGridList/>
            </div>
            <div className="flex-container">
              <div className="left">
                <TitlebarGridList/>
              </div>
              <div className="right">
                <SimpleCard/>
              </div>
            </div>
        </>);
    }
}

export default Home;