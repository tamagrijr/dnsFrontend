import React, {useEffect} from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Input from '@material-ui/core/Input';
import Avatar from '@material-ui/core/Avatar';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import './Profile.css'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '10px',
    backgroundColor: `#4b5d67`,
    '& > *': {
      margin: theme.spacing(1),
      backgroundColor: `#4b5d67`,
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

export default function Profile({ props }) {
  const classes = useStyles();
  const theme = useTheme();

  const [avatarUrl, setAvatarUrl] = React.useState(props.avatarUrl);
  const [email, setEmail] = React.useState(props.email);
  const [userName, setUserName] = React.useState(props.userName);
  const [firstName, setFirstName] = React.useState(props.firstName);
  const [lastName, setLastName] = React.useState(props.lastName);
  const [bio, setBio] = React.useState(props.bio);


  const userObj = {avatarUrl, email, userName, firstName, lastName, bio}


  const handleAvatarChange = e => setAvatarUrl(e.target.value)
  const handleEmailChange = e => setEmail(e.target.value)
  const handleUserNamechange = e => setUserName(e.target.value)
  const handleFirstNameChange = e => setFirstName(e.target.value)
  const handleLastNameChange = e => setLastName(e.target.value)
  const handleBioChange = e => setBio(e.target.value)

  return (
    <Container className={classes.root}>
      <Avatar src={props.avatarUrl} className={classes.large} />
      <FormControl>
        <InputLabel>Avatar URL</InputLabel>
        <Input value={avatarUrl} onChange={handleAvatarChange} />
      </FormControl>
      <FormControl>
        <InputLabel>Email</InputLabel>
        <Input value={email} error={email === ''} onChange={handleEmailChange} />
      </FormControl>
      <FormControl>
        <InputLabel>User Name</InputLabel>
        <Input value={userName} onChange={handleUserNamechange} />
      </FormControl>
      <FormControl>
        <InputLabel>First Name</InputLabel>
        <Input value={firstName} error={firstName === ''} onChange={handleFirstNameChange} />
      </FormControl>
      <FormControl>
        <InputLabel>Last Name</InputLabel>
        <Input value={lastName} error={lastName === ''} onChange={handleLastNameChange} />
      </FormControl>
      <FormControl>
        <InputLabel>Bio</InputLabel>
        <Input value={bio} onChange={handleBioChange} />
      </FormControl>
      <span>
        <Button disabled={email === '' || firstName === '' || lastName ===''} onClick={() => props.updateAccountProp(props.token, userObj)} >Submit Changes</Button>
        <a href='/'><Button><KeyboardBackspaceIcon /></Button></a>
      </span>


      <Button className={classes.delete} onClick={() => props.deleteAccountProp(props.token)}>Delete Profile</Button>

    </Container>
  )
}
