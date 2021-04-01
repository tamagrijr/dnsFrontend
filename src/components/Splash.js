import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, signUp } from '../store/authentication';
import styled, { keyframes } from 'styled-components';
import SmokeText from './SmokeText';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import Warren from '../images/Warren.png';
import DnS from '../images/DnS.png';
import Login from '../images/Login.png';
import DungeonBackground from '../images/DungeonBackground.jpg';
import DungeonConstruction from '../images/DungeonConstruction.png';
import underConstruction from '../images/underConstruction.png';
import underText from '../images/Under.png';
import DungeonDemo from '../images/DungeonDemo.png';
import { DungeonsAndSlack } from '../images/baseSixtyFour';

export default function Splash() {
  const [showIntro, setShowIntro] = useState(true);
  useEffect(() => void setTimeout(() => setShowIntro(false), 16000), []);

  const [constructionMessage, setConstructionMessage] = useState(true);
  useEffect(() => {
    let flashing = setInterval(() => {
      setConstructionMessage(!constructionMessage)
    }, 5000);
    return () => clearInterval(flashing)
  })



  const [email, setEmail] = React.useState('demo@email.com');
  const [password, setPassword] = React.useState('password');
  const [loginHovered, setLoginHovered] = React.useState('')

  const token = useSelector((state) => state.authentication.token);
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();

    const res = dispatch(login(email, password));
    if (!res.ok) {
      setPassword('');
      setEmail('');
    };
  };

  if (token) {
    return <Redirect to='/' />;
  }
  return (
    <>

      {showIntro &&
        <IntroPage onClick={() => setShowIntro(false)} className="animate__animated animate__fadeOut animate__delay-5s">
          <SmokeText w={650} h={600} baseSixtyFour={DungeonsAndSlack} id={'DnS'} />
        </IntroPage>}

      <SplashPage>
        <TopBar>
          <NavBox>
            <img src={DnS} />
          </NavBox>
          <NavBox style={{ cursor: 'pointer' }}>
            <img src={Login} className={loginHovered} onMouseEnter={() => setLoginHovered(`animate__animated animate__tada animate__infinite`)} onMouseLeave={() => setLoginHovered('')} />
          </NavBox>
        </TopBar>
        {constructionMessage ?
          <Overlap src={DungeonConstruction} z={2} /> :
          <Overlap src={underText} z={2} />}
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
const Overlap = styled.img`
position: absolute;
top: 50%;
left: 20%;
height: 20%;
width: 20%;
transform: translate(-50%, -50%);
${props => props.z ? `z-index: ${props.z};` : `z-index: 0;`}
`;
