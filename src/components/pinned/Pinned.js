import React from 'react'
import { useSelector } from 'react-redux'
import ChatIcon from '@material-ui/icons/Chat';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './Pinned.css'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '10px',
    backgroundColor: `#59405c`,
    '& > *': {
      margin: theme.spacing(1),
      backgroundColor: `#59405c`,
    },
    large: {
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
    delete: {
      paddingTop: '10px',
    },
    backButton: {
      alignSelf: 'flex-end'
    },
  },
}));

export default function Pinned({ props }) {
  const classes = useStyles();
  const messages = useSelector(state => state.chatMessages.messages)

  const [open, setOpen] = React.useState(false);
  const [userName, setUserName] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [avatarUrl, setAvatarUrl] = React.useState('');
  const [message, setMessage] = React.useState('');

  const displayMessage = (message) => {
    setUserName(message.User.userName)
    setFirstName(message.User.firstName)
    setLastName(message.User.lastName)
    setAvatarUrl(message.User.avatarUrl)
    setMessage(message.message)
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false);
  };

  if(!messages) return null;
  return (
    <div>
      <Dialog onClose={handleClose} id={'pinnedMsgDiologue'} PaperProps={{style: {backgroundColor: '#59405c', width: '50em', heigth: 'auto'}}} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" className={'formBackground'} onClose={handleClose}>
          <ListItemIcon>{avatarUrl ? <Avatar src={avatarUrl} /> : <AccountCircleIcon />}</ListItemIcon>
          {userName ? userName : `${firstName} ${lastName}`}
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom >
            {message}
          </Typography>
        </DialogContent>
        <DialogActions>

        </DialogActions>
      </Dialog>
      {messages.map(message => {
        if(message.pinned){
          return(
            <ListItem key={`pinnedMessage${message.id}`} button onClick={() => displayMessage(message)}>
              <ListItemIcon><ChatIcon /></ListItemIcon>
              <ListItemText>{message.message}</ListItemText>
            </ListItem>
            )
        }else{
          return null
        }
      })}
    </div>
  )
}
