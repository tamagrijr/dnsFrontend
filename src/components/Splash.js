import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import SmokeText from './SmokeText';
import Warren from '../images/Warren.png';
import DnS from '../images/DnS.png';
import Login from '../images/Login.png';
import DungeonBackground from '../images/DungeonBackground.jpg';
import DungeonConstruction from '../images/DungeonConstruction.png';
import underConstruction from '../images/underConstruction.png';
import { DungeonsAndSlack, DungeonDemo } from '../images/baseSixtyFour';
import { FiGithub, FiLinkedin } from 'react-icons/fi';

export default function Splash() {
  const [showIntro, setShowIntro] = useState(true);
  useEffect(() => void setTimeout(() => setShowIntro(false), 30000), []);

  return (
    <>
      {showIntro ?

        <IntroPage onClick={() => setShowIntro(false)}>
          <SmokeText w={850} h={800} baseSixtyFour={DungeonsAndSlack} />
        </IntroPage> :

        <SplashPage>
          <TopBar>
            <NavBox>
              <img src={DnS} />
            </NavBox>
            <NavBox style={{cursor: 'pointer'}}>
              <img src={Login} />
            </NavBox>
          </TopBar>
          <Overlap src={DungeonConstruction} z={2} />
          <Overlap src={underConstruction} z={1} />
          <Bounce>
            <SmokeText w={400} h={250} baseSixtyFour={DungeonDemo} />
          </Bounce>
          <BottomBar>
            <NavBox>
              <img src={Warren} />
            </NavBox>
            <NavBox>
              <Icon>
                <FiLinkedin size={'2.5em'} />
              </Icon>
              <Icon>
                <FiGithub size={'2.5em'} />
              </Icon>
            </NavBox>
          </BottomBar>
        </SplashPage>}
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
const Icon = styled.div`
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
top: 50%;
left: 50%;
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
