import React from 'react';
import {Redirect} from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import Avatar from '@material-ui/core/Avatar';
import { sizing } from '@material-ui/system';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ChatIcon from '@material-ui/icons/Chat';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import RoomIcon from '@material-ui/icons/Room';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './HomePage.css'
import ChatContainer from '../chat/ChatContainer'
import FriendMenu from '../FriendMenu/FriendMenu'
import Members from '../members/Members'
import Pinned from '../pinned/Pinned'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: "100%",
    backgroundColor: `#4b5d67`,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
      // backgroundColor: '#322f3d'
    }),
  },
  appBarShiftLeft: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarShiftRight: {
    marginRight: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  // menuButton: {
  //   marginRight: 36,
  // },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    paper: {
      backgroundColor: `#4b5d67`,
    },
    overflowY: 'scroll',
  },
  drawerOpen: {
    width: drawerWidth,
    zIndex: theme.zIndex.drawer + 2,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,

  },
  rightToolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(7),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#322f3d'
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  hidden: {
    display: 'none'
  },
  lightBackground: {
    backgroundColor: `#59405c`,
  },
  formBackground: {
    backgroundColor: `#59405c`,
  }
}));

export default function Home({ props }) {

  const classes = useStyles();
  const theme = useTheme();
  const [leftOpen, setLeftOpen] = React.useState(false);
  const [rightOpen, setRightOpen] = React.useState(false);
  const [channelsOpen, setChannelsOpen] = React.useState(true);
  const [groupsOpen, setGroupsOpen] = React.useState(true);
  const [profile, setProfile] = React.useState(false);
  const [friendsOpen, setFriendsOpen] = React.useState(true);
  const [membersOpen, setMembersOpen] = React.useState(true);
  const [pinnedOpen, setPinnedOpen] = React.useState(true);

  const handleRightDrawerOpen = () => {
    setRightOpen(true);
  };
  const handleRightDrawerClose = () => {
    setRightOpen(false);
  };
  const handleLeftDrawerOpen = () => {
    setLeftOpen(true);
  };
  const handleLeftDrawerClose = () => {
    setLeftOpen(false);
  };
  const handleChannelToggle = () => {
    const channelList = document.querySelector('.channelList')
    if(channelsOpen){
      channelList.classList.add('hidden')
      setChannelsOpen(false)
    }else{
      channelList.classList.remove('hidden')
      setChannelsOpen(true)
    }
  }

  const handleFriendToggle = () => {
    const friendList = document.querySelector('.friendList')
    if(friendsOpen){
      friendList.classList.add('hidden')
      setFriendsOpen(false)
    }else{
      friendList.classList.remove('hidden')
      setFriendsOpen(true)
    }
  }
  const handleMembersToggle = () => {
    const membersDiv = document.querySelector('.membersDiv')
    if(membersOpen){
      membersDiv.classList.add('hidden')
      setMembersOpen(false)
    }else{
      membersDiv.classList.remove('hidden')
      setMembersOpen(true)
    }
  }
  const handlePinnedToggle = () => {
    const pinnedDiv = document.querySelector('.pinnedDiv')
    if(pinnedOpen){
      pinnedDiv.classList.add('hidden')
      setPinnedOpen(false)
    }else{
      pinnedDiv.classList.remove('hidden')
      setPinnedOpen(true)
    }
  }
  const handleSelected = (className) => {
    document.querySelectorAll('.selectedChat').forEach(e => e.classList.remove('selectedChat'))
    document.querySelector(`.${className}`).classList.add('selectedChat')
  }

  //CREATE CHANNEL MODUL
  const [channelFormDisplay, setChannelFormDisplay] = React.useState(false);
  const [inputChannel, setInputChannel] = React.useState('');
  const [inputChannelAvatar, setInputChannelAvatar] = React.useState('');
  const handleChannelInputChange = e => setInputChannel(e.target.value)
  const handleChannelAvatarInputChange = e => setInputChannelAvatar(e.target.value)
  const handleChannelForm = () => {
    setChannelFormDisplay(true);
  };
  const handleChannelFormClose = () => {
    setChannelFormDisplay(false);
  };
  const handleChannelCreate = async () => {
    await props.dispatchFunctions.createChannelProp({name: inputChannel, avatarUrl: inputChannelAvatar, userId: props.user.user.id})
    setChannelFormDisplay(false);
    props.dispatchFunctions.reload();
  }
  if(profile){
    return <Redirect to='/profile' />;
    
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Dialog open={channelFormDisplay} classes={{paper: classes.formBackground}}onClose={handleChannelFormClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create Your Channel</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a channel, please enter your channel's name here.
          </DialogContentText>
          <TextField
            error={inputChannel === ''}
            autoFocus
            margin="dense"
            id="channelName"
            label="Channel Name"
            type="text"
            fullWidth
            value={inputChannel}
            onChange={handleChannelInputChange}
          />
          <TextField
            margin="dense"
            id="channelAvatar"
            label="Channel Avatar Url"
            type="text"
            fullWidth
            value={inputChannelAvatar}
            onChange={handleChannelAvatarInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleChannelFormClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleChannelCreate} disabled={inputChannel === ''} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShiftLeft]: leftOpen,
          [classes.appBarShiftRight]: rightOpen,
        })}
      >
        <Toolbar className={classes.topBar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleLeftDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: leftOpen,
            })}
          >
            <MenuIcon />
          </IconButton>
          <div></div>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleRightDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: rightOpen,
            })}
          >
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, 'hideScroll', {
          [classes.drawerOpen]: leftOpen,
          [classes.drawerClose]: !leftOpen,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: leftOpen,
            [classes.drawerClose]: !leftOpen,
          }, classes.lightBackground),
        }}>
        <div className={classes.toolbar}>
          <IconButton onClick={handleLeftDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <ListItem button onClick={handleChannelToggle}>
          <ListItemIcon><ChatBubbleIcon /></ListItemIcon>
          <ListItemText primary={'Your Channels'} />
        </ListItem>
        <Divider />
        <List className='channelList' >
          {props.user.channels.map((channel) => (
            <div className={"channels" + channel.id} onClick={() => handleSelected("channels" + channel.id)} key={channel.id} >
              <ListItem button
                        onClick={ () => props.dispatchFunctions.getChat('channels', channel.id)}
                        key={channel.id}>
                <ListItemIcon>{channel.avatar ? <Avatar src={channel.avatar} className={classes.small} /> : <ChatBubbleIcon />}</ListItemIcon>
                <ListItemText primary={channel.name} />
              </ListItem>
            </div>
          ))}
          <ListItem button onClick={handleChannelForm}>
            <ListItemIcon><AddIcon /></ListItemIcon>
            <ListItemText primary={'Create Channel'} />
          </ListItem>

        </List>
        {/* <Divider />
        <ListItem button onClick={handleGroupToggle}>
            <ListItemIcon><ChatBubbleOutlineIcon /></ListItemIcon>
            <ListItemText primary={'Your Groups'} />
        </ListItem>
        <Divider />
        <List className='groupList'>
          {props.user.groups.map((group) => (
            <div className={"groups" + group.id} onClick={() => handleSelected("groups" + group.id)} key={group.id} >
              <ListItem button
                        onClick={ () => props.dispatchFunctions.getChat('groups', group.id)}
                        key={group.id}>
                <ListItemIcon><ChatIcon /></ListItemIcon>
                <ListItemText primary={group.name} />
              </ListItem>
            </div>
          ))}
          <ListItem button onClick={handleGroupForm}>
            <ListItemIcon><AddIcon /></ListItemIcon>
            <ListItemText primary={'Create Group'} />
          </ListItem>
        </List> */}
        <Divider />
        <ListItem button onClick={handleFriendToggle}>
            <ListItemIcon><AccountCircleIcon /></ListItemIcon>
            <ListItemText primary={'Your Friends'} />
        </ListItem>
        <Divider />
        <FriendMenu props={props} />
      </Drawer>

      <main className={classes.content}>
        <ChatContainer />
      </main>

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: rightOpen,
          [classes.drawerClose]: !rightOpen,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: rightOpen,
            [classes.drawerClose]: !rightOpen,
          }, classes.lightBackground),
        }}
        anchor= "right">
        <div className={classes.rightToolbar}>
          <IconButton onClick={handleRightDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />

          <ListItem button onClick={() => setProfile(true)}>
            <ListItemIcon>{props.user.user.avatarUrl ? <Avatar src={props.user.user.avatarUrl} className={classes.small} /> : <AccountCircleIcon />}</ListItemIcon>
            <ListItemText primary={props.user.user.userName ? props.user.user.userName : `${props.user.user.firstName} ${props.user.user.lastName}`} />
          </ListItem>

        <Divider />
        <ListItem button onClick={handleMembersToggle}>
          <ListItemIcon><SupervisedUserCircleIcon /></ListItemIcon>
          <ListItemText>Members</ListItemText>
        </ListItem>
        <Divider />
        <div className='membersDiv'>
          <Members props={props} />
        </div>
        <Divider />
        <ListItem button onClick={handlePinnedToggle}>
          <ListItemIcon><RoomIcon /></ListItemIcon>
          <ListItemText>Pinned Messages</ListItemText>
        </ListItem>
        <Divider />
        <div className='pinnedDiv'>
          <Pinned props={props} />
        </div>
        <Divider />
        <List>
          <ListItem onClick={() => props.dispatchFunctions.logOut()} button>
            <ListItemIcon> <ExitToAppIcon /> </ListItemIcon>
            <ListItemText primary={ "Logout" } />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
