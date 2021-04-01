import React, { useState } from 'react';
import styled from 'styled-components';
import useKeyup from '../Hooks/useKeyup';
import TextField from '@material-ui/core/TextField';
import OldPaper from '../images/OldPaper.png';
import SignUp from '../images/Signup.png';
import LogIn from '../images/Login.png'

export default function Login({ show, utils }) {
  const [log, setLog] = useState(true);
  const [loginHovered, setLoginHovered] = useState('');
  const [signinHovered, setSigninHovered] = useState('');

  useKeyup('Escape', () => show(false));
  useKeyup("`", () => setLog(!log));
  useKeyup('Enter', () => {
    log ? 
    utils.handleLogin() :
    utils.handleSignUp();
  });

  return (
    <LoginContainer>
      {log ?
        <Log>
          <TextField id="email" error={!utils.email} label="email" value={utils.email} onChange={utils.updateProperty(utils.setEmail)} />
          <TextField id="password" error={!utils.password} label="password" type='password' value={utils.password} onChange={utils.updateProperty(utils.setPassword)} />
          <br/>
          <Button src={LogIn} className={loginHovered} 
          onMouseEnter={() => setLoginHovered(`animate__animated animate__tada animate__infinite`)} 
          onMouseLeave={() => setLoginHovered('')} 
          onClick={() => utils.handleLogin()}/>
          <Button src={SignUp} className={signinHovered} 
          onMouseEnter={() => setSigninHovered(`animate__animated animate__tada animate__infinite`)} 
          onMouseLeave={() => setSigninHovered('')} 
          onClick={() => {setLog(!log); setSigninHovered('')}}/>
        </Log> :
        <Sign>
          <TextField id="email" error={!utils.email} label="email" value={utils.email} onChange={utils.updateProperty(utils.setEmail)} />
          <TextField id="password" error={!utils.password} label="password" type='password' value={utils.password} onChange={utils.updateProperty(utils.setPassword)} />
          <TextField id="confPass" error={!utils.confirmPassword} label="Confirm Password" type='password' value={utils.confirmPassword} onChange={utils.updateProperty(utils.setConfirmPassword)} />
          <TextField id="fName" error={!utils.firstName} label="First Name" value={utils.firstName} onChange={utils.updateProperty(utils.setFirstName)} />
          <TextField id="lName" error={!utils.lastName} label="Last Name" value={utils.lastName} onChange={utils.updateProperty(utils.setLastName)} />
          <br/>
          <Button src={SignUp} className={signinHovered} 
          onMouseEnter={() => setSigninHovered(`animate__animated animate__tada animate__infinite`)} 
          onMouseLeave={() => setSigninHovered('')}
          onClick={() => utils.handleSignUp()}/>
          <Button src={LogIn} className={loginHovered} 
          onMouseEnter={() => setLoginHovered(`animate__animated animate__tada animate__infinite`)} 
          onMouseLeave={() => setLoginHovered('')} 
          onClick={() => {setLog(!log); setLoginHovered('')}}/>
        </Sign>}

      <Instructions onClick={() => show(false)}>
        Press Esc To Exit <br />
        Press ` To Switch View <br />
        Press Enter to Submit
        </Instructions>
    </LoginContainer>
  )
}
const LoginContainer = styled.div`
position:relative;
width: 35%;
height: 80%;
background-image: url(${OldPaper});
background-size: 100% 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;
const Instructions = styled.div`
position: fixed;
bottom: 2em;
left: 2em;
border: 1px solid #4e4e4e;
padding: 12px 16px;
z-index: 1;
background-color: #1d1d1d;
color: white;
font-size: 1.7vh;
cursor: pointer;
`;
const Log = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
`;
const Sign = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
`;
const Button = styled.img`
cursor: pointer;
padding: 2px 0;
`;
