import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, signUp } from '../store/authentication';
import styled, { keyframes } from 'styled-components';
import SmokeText from './SmokeParticle';
import SlideShow from './SlideShow';
import Login from './Login';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import Warren from '../images/Warren.png';
import DnS from '../images/DnS.png';
import LoginTxt from '../images/Login.png';
import DungeonBackground from '../images/DungeonBackground.jpg';
import DungeonConstruction from '../images/DungeonConstruction.png';
import underConstruction from '../images/underConstruction.png';
import underText from '../images/Under.png';
import DungeonDemo from '../images/DungeonDemo.png';
import { DungeonsAndSlack } from '../images/baseSixtyFour';

export default function Splash() {
  //Hide intro animation after set time
  const [showIntro, setShowIntro] = useState(true);
  useEffect(() => void setTimeout(() => setShowIntro(false), 16000), []);

  //set up react state (demo user pre selected)
  const [email, setEmail] = useState('demo@email.com');
  const [password, setPassword] = useState('password');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  //handle login state / actions
  const [loginHovered, setLoginHovered] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  //grab the token from local storage if it exists
  const token = useSelector((state) => state.authentication.token);
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    // e.preventDefault();
    const res = dispatch(login(email, password));
    if (!res.ok) { setPassword(''); setEmail(''); };
  };
  const handleSignUp = e => {
    // e.preventDefault();
    const newUser = { firstName, lastName, email, password, confirmPassword };
    const res = dispatch(signUp(newUser))
    if (!res.ok) { setPassword(''); setEmail(''); setConfirmPassword(''); }
  };
  const updateProperty = (callback) => (e) => {
    callback(e.target.value);
  };
  //set up object to pass to Login component
  const loginUtils = {
    email, password, firstName, lastName, confirmPassword, setEmail, 
    setPassword, setFirstName, setLastName, setConfirmPassword,
    handleLogin, handleSignUp, updateProperty
  }

  if (token) {
    return <Redirect to='/' />;
  }

  return (
    <>

      {showIntro &&
        <IntroPage onClick={() => setShowIntro(false)} className="animate__animated animate__fadeOut animate__delay-5s">
          <SmokeText w={650} h={600} baseSixtyFour={DungeonsAndSlack} id={'DnS'} />
        </IntroPage>}

      {showLogin &&
        <Modal>
          <Login show={setShowLogin} utils={loginUtils}/>
        </Modal>}

      <SplashPage>
        <TopBar>
          <NavBox>
            <img src={DnS} />
          </NavBox>
          <NavBox style={{ cursor: 'pointer' }} onClick={() => setShowLogin(true)}>
            <img src={LoginTxt} className={loginHovered} onMouseEnter={() => setLoginHovered(`animate__animated animate__tada animate__infinite`)} onMouseLeave={() => setLoginHovered('')} />
          </NavBox>
        </TopBar>
        <Overlap z={2}>
          <SlideShow images={[DungeonConstruction, underText]} w={`100%`} h={`100%`} ></SlideShow>
        </Overlap>
        <Overlap src={underConstruction} z={1} />
        <Bounce onClick={handleLogin} >
          <img src={DungeonDemo} />
        </Bounce>
        <BottomBar>
          <NavBox>
            <img src={Warren} />
          </NavBox>
          <NavBox>
            <Icon href="https://www.linkedin.com/in/warren-tamagri-5648a71ba/" target="_blank">
              <FiLinkedin size={'2.5em'} />
            </Icon>
            <Icon href="https://github.com/tamagrijr" target="_blank">
              <FiGithub size={'2.5em'} />
            </Icon>
          </NavBox>
        </BottomBar>
      </SplashPage>
    </>
  )
};

//CSS STYLING Styled Components React
const bounce_animate = keyframes`
0% {
  transform: translateY(0);
}
100% {
  transform: translateY(-20px);
}
`;
const SplashPage = styled.div`
position: fixed;
z-index: 0;
left: 0;
top: 0;
width: 100%;
height: 100%;
background-image: url(${DungeonBackground});
background-size: 100% 100%;
`;
const IntroPage = styled.div`
background-color: rgba(0,0,0,1);
position: fixed;
z-index: 1;
left: 0;
top: 0;
width: 100%;
height: 100%;
`;
const TopBar = styled.div`
position: absolute;
top: 0;
width: 100%;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`;
const BottomBar = styled.div`
position: absolute;
bottom: 0;
width: 100%;
height: 4em;
display: flex;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`;
const NavBox = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: .5em;
`;
const Icon = styled.a`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: .5em;
color: #FFFFFF;
cursor: pointer;
&:hover {
  color: #1B5193;
}
`;
const Bounce = styled.div`
animation: ${bounce_animate} 2s infinite alternate;
position: absolute;
top: 40%;
left:40%;
transform: translate(-50%, -50%);
cursor: pointer;
`;
const Overlap = styled.div`
position: absolute;
top: 50%;
left: 20%;
height: 20%;
width: 20%;
transform: translate(-50%, -50%);
${props => props.z ? `z-index: ${props.z};` : `z-index: 0;`};
${props => props.src ? `background-image: url(${props.src})` : ''};
background-size: 100% 100%;
`;
const Modal = styled.div`
background-color: rgba(0,0,0,0.4);
position: fixed;
z-index: 1;
left: 0;
top: 0;
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
`;
