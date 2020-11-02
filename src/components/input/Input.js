import React from 'react'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import './Input.css'


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));

export default function Input({ props }) {
  const classes = useStyles();

  const [input, setInput] = React.useState('');
  const handleChange = e => setInput(e.target.value)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target)
    props.dispatchFunctions.createMessageProp(input)
    setInput('')
  }

  return (
    <div className='inputComponentContainer'>
      <form className={classes.root} onSubmit={handleFormSubmit} noValidate autoComplete="off">
          <TextField
          id="outlined-secondary"
          label="Keep it civil..."
          variant="outlined"
          color="primary"
          value={input}
          onChange={handleChange}
        />
      </form>
    </div>
  )
}
