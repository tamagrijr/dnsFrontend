import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { login, signUp } from '../../store/authentication';
import Box from '@material-ui/core/Box';
import './Splash.css'


const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
}));

export default function Splash() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [signUpOpen, setSignUpOpen] = React.useState(false);
  const [email, setEmail] = React.useState('demo@email.com');
  const [password, setPassword] = React.useState('password');
  const [signUpEmail, setSignUpEmail] = React.useState('');
  const [signUpPassword, setSignUpPassword] = React.useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const token = useSelector((state) => state.authentication.token);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const res = dispatch(login(email, password));
    if(!res.ok) setPassword('')
  };
  const handleSignUpSubmit = e => {
    e.preventDefault();
    const newUser = {
      firstName,
      lastName,
      email: signUpEmail,
      password: signUpPassword,
      confirmPassword,
    };
    const res = dispatch(signUp(newUser))
    if(!res.ok){
      setSignUpPassword('')
      setSignUpEmail('')
      setConfirmPassword('')
    }

  }

  const updateProperty = (callback) => (e) => {
    callback(e.target.value);
  };

  if (token) {
    return <Redirect to='/' />;
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleSignUpOpen = () => {
    setOpen(false)
    setSignUpOpen(true)
  }
  const handleLogInOpen = () => {
    setSignUpOpen(false)
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false);
    setSignUpOpen(false);
  };

  return (
    <Box className='splash'>
      <Box onClick={handleClickOpen} className='.splashTextContainer'>
        <h1 className='splashText'>Dunegons<br/>&<br/>Slack</h1>
      </Box>

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} onSubmit={handleSubmit} PaperProps={{style: {backgroundColor: '#59405c', alignItems:'center', width: '35em', heigth: 'auto'}}}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Sign In
        </DialogTitle>
        <DialogContent dividers>
            <TextField id="email" error={!email} label="email" value={email} onChange={updateProperty(setEmail)} color="primary" /><br/>
            <TextField id="password" error={!password} type='password' label="password" value={password} onChange={updateProperty(setPassword)} color="primary" />
        </DialogContent>
          <DialogActions className={classes.dialogAct}>
            <Button color="primary" onClick={handleSignUpOpen} >
              Sign Up
            </Button>
            <Button disabled={!email || !password} onClick={handleSubmit} color="primary">
              Sign In
            </Button>
          </DialogActions>
      </Dialog>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={signUpOpen} onSubmit={handleSignUpSubmit} PaperProps={{style: {backgroundColor: '#59405c', alignItems:'center', width: '35em', heigth: 'auto'}}}>
        <DialogTitle id="customized-dialog-title"  onClose={handleClose}>
          Sign Up
        </DialogTitle>
        <DialogContent dividers>
            <TextField id="email" error={!signUpEmail} label="Email" value={signUpEmail} onChange={updateProperty(setSignUpEmail)} color="primary" /><br/>
            <TextField id="email" error={!firstName} label="First Name" value={firstName} onChange={updateProperty(setFirstName)} color="primary" /><br/>
            <TextField id="email" error={!lastName} label="Last Name" value={lastName} onChange={updateProperty(setLastName)} color="primary" /><br/>
            <TextField id="signUpPassword" error={!signUpPassword} type='password' label="Password" value={signUpPassword} onChange={updateProperty(setSignUpPassword)} color="primary" /><br/>
            <TextField id="email" error={!confirmPassword} label="Confirm Password" type='password' value={confirmPassword} onChange={updateProperty(setConfirmPassword)} color="primary" /><br/>
        </DialogContent>
          <DialogActions className={classes.dialogAct}>
            <Button color="primary" onClick={handleLogInOpen} >
              Sign In
            </Button>
            <Button color="primary" onClick={handleSignUpSubmit} >
              Sign Up
            </Button>
          </DialogActions>
      </Dialog>
    </Box>
  )
}
