import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { login } from '../store/authentication';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const LoginForm = ({ props }) => {
  const classes = useStyles();
  const [email, setEmail] = useState('demo@email.com');
  const [password, setPassword] = useState('password');
  const token = useSelector((state) => state.authentication.token);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const updateProperty = (callback) => (e) => {
    callback(e.target.value);
  };

  if (token) {
    return <Redirect to='/' />;
  }

  return (
    <main>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateProperty(setEmail)}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={updateProperty(setPassword)}
        />
        <button type='submit'>Login</button>
      </form>

      <Dialog onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
        <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
          Sign In
        </DialogTitle>
        <DialogContent dividers>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField id="standard-secondary" label="Standard secondary" color="secondary" />
            <TextField
              id="filled-secondary"
              label="Filled secondary"
              variant="filled"
              color="secondary"
            />
            <TextField
              id="outlined-secondary"
              label="Outlined secondary"
              variant="outlined"
              color="secondary"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Link to='/'>
            <Button autoFocus onClick={props.handleClose} color="primary">
              Sign In
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </main>
  )
};

export default LoginForm;
