import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './App.css';

import MonumentsMap from './components/map/MonumentsMap';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const App = () => {
  const classes = useStyles();

  return (
	<div className={classes.root}>
		<Grid container spacing={1}>
			<Grid item xs={12}>
				<Paper className={classes.paper}>
					<Typography variant="h6" gutterBottom>
						Prueba Monumentos
					</Typography>
					<Typography variant="subtitle1" gutterBottom>
						Tomas Yañez
					</Typography>
				</Paper>
			</Grid>
			<Grid item xs={12}>
				<Paper className={classes.paper}>
					<MonumentsMap />
				</Paper>
			</Grid>
		</Grid>
	</div>
  );
}

export default App;