import React from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import moviesData from '../../common/moviesData';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

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

              </div>
            </div>
        </>);
    }
}

export default Home;