import React from 'react'
import {useSelector} from 'react-redux'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { baseUrl } from '../../config/config'

export default function FriendMenu({ props }) {
  const token = useSelector(state => state.authentication.token)
  const currentChat = useSelector(state => state.chatMessages.chat)

  const [anchorFriendMenu, setAnchorFriendMenu] = React.useState(null);
  const [selectedFriend, setSelectedFriend] = React.useState(null)
  const handleFriendMenuClick = (event) => {
    setAnchorFriendMenu(event.currentTarget);
  };
  const handleFriendMenuClose = () => {
    setAnchorFriendMenu(null);
    setSelectedFriend(null)
  };
  const handleFriendSelect = (id) => {
    setSelectedFriend(id)
  }

  //CREATE FRIEND
  const [friendFormDisplay, setFriendFormDisplay] = React.useState(false);
  const [inputFriend, setInputFriend] = React.useState('');
  const handleFriendInputChange = e => setInputFriend(e.target.value)
  const handleFriendForm = () => {
    setFriendFormDisplay(true);
  };
  const handleFriendFormClose = () => {
    setFriendFormDisplay(false);
  };
  const handleFriendCreate = async () => {
    await props.dispatchFunctions.createFriendProp({email: inputFriend})
    setFriendFormDisplay(false);
    props.dispatchFunctions.reload();
  }
  const handleRemoveFriend = async (id) => {
    await fetch(`${baseUrl}/users/delete/${id}`,{
      method: 'delete',
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json"},
    })
    props.dispatchFunctions.reload();
  }
  const handleAddToChat = async (id) => {
    await fetch(`${baseUrl}/users/joinChannel/${id}/${currentChat.id}`,{
      method: 'post',
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json"},
    })
    props.dispatchFunctions.reload();
  }

  //STYLES
  const useStyles = makeStyles((theme) => ({
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    background : {
      backgroundColor: `#59405c`,
    }
  }));
  const classes = useStyles();
  const theme = useTheme();

  //RETURN DISPLAY
  return (
    <div>
      <Dialog open={friendFormDisplay} classes={{paper: classes.background}}onClose={handleFriendFormClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Friend</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a friend, please enter your friend's email here.
          </DialogContentText>
          <TextField
            error={inputFriend === ''}
            autoFocus
            margin="dense"
            id="friendName"
            label="Friend's Email"
            type="text"
            fullWidth
            value={inputFriend}
            onChange={handleFriendInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFriendFormClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFriendCreate} disabled={inputFriend === ''} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <List className='friendList'>
          {props.user.friends.map((friend) => (
            <div key={`friendWrapper${friend.id}`}>
            <Menu
              id={`friendMenu${friend.id}`}
              anchorEl={anchorFriendMenu}
              keepMounted
              open={friend.id === selectedFriend}
              classes={{paper: classes.background}}
              onClose={handleFriendMenuClose}>
              <MenuItem onClick={handleFriendMenuClose}>
                {friend.avatarUrl ? <Avatar src={friend.avatarUrl} className={classes.small} /> : <AccountCircleIcon /> }
                {friend.userName ? `${friend.userName}` : `${friend.firstName} ${friend.lastName}`}
              </MenuItem>
              <div onClick={() => handleAddToChat(friend.id)}>
                <MenuItem disabled={!currentChat} onClick={handleFriendMenuClose}>Invite to curren Chat</MenuItem>
              </div>
              <div onClick={() => handleRemoveFriend(friend.id)}>
                <MenuItem onClick={handleFriendMenuClose}>Remove Friend</MenuItem>
              </div>
            </Menu>
            <div key={`div${friend.id}`} onClick={handleFriendMenuClick}>
              <ListItem button onClick={() => handleFriendSelect(friend.id)}>
                <ListItemIcon>{friend.avatarUrl ? <Avatar src={friend.avatarUrl} className={classes.small} /> : <AccountCircleIcon /> }</ListItemIcon>
                <ListItemText primary={friend.userName ? friend.userName : `${friend.firstName} ${friend.lastName}`} />
              </ListItem>
            </div>
            </div>
          ))}
          <ListItem button onClick={handleFriendForm} >
            <ListItemIcon><AddIcon /></ListItemIcon>
            <ListItemText primary={'Find Friends'} />
          </ListItem>
        </List>
    </div>
  )
}
