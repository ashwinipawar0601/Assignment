import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import GoogleAuth from './GoogleAuth';
import { Link } from 'react-router-dom';
const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
};

const Headers = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            ToDoList
          </Typography>
          <GoogleAuth />
        </Toolbar>
      </AppBar>
    </div>
  );
};

Headers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Headers);
