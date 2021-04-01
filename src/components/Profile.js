import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import SlideShow from './SlideShow';
import DungeonBackground from '../images/DungeonBackground.jpg';
import OldPaper from '../images/OldPaper.png';
import Character1 from '../images/Character1.png';
import Character2 from '../images/Character2.png';
import Character3 from '../images/Character3.png';
import Character4 from '../images/Character4.png';
import Character5 from '../images/Character5.png';
import Character6 from '../images/Character6.png';
import { GiQuillInk } from "react-icons/gi";

export default function Profile() {
  const [back, setBack] = useState(false);
  const [submitHover, setSubmitHover] = useState('');

  if (back) return <Redirect to='/' />
  return (
    <>
      <ProfilePage>
        <SSContainer>
          <SlideShow images={[Character1, Character2, Character3]} w={`100%`} h={`100%`} />
        </SSContainer>
        <CharacterSheet>
          <Submit onClick={() => setBack(true)} className={submitHover} onMouseEnter={() => setSubmitHover(`animate__animated animate__pulse animate__infinite`)} onMouseLeave={() => setSubmitHover('')}>
            <SubmitChild>Confirm</SubmitChild>
            <SubmitChild><GiQuillInk size={'2.5em'} /></SubmitChild>
          </Submit>
        </CharacterSheet>
        <SSContainer>
          <SlideShow images={[Character4, Character5, Character6]} w={`100%`} h={`100%`} />
        </SSContainer>
      </ProfilePage>
    </>
  )
}
const ProfilePage = styled.div`
position: fixed;
z-index: 0;
left: 0;
top: 0;
width: 100%;
height: 100%;
background-image: url(${DungeonBackground});
background-size: 100% 100%;
display: flex;
justify-content: center;
align-items: center;
`;
const CharacterSheet = styled.div`
width: 35%;
height: 80%;
background-image: url(${OldPaper});
background-size: 100% 100%;
margin: 0 auto;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;
const Submit = styled.div`
color: #BC9B70;
display: flex;
justify-content: space-between;
align-items: center;
cursor: pointer;
`;
const SubmitChild = styled.div`
padding: 5px;
`;
const SSContainer = styled.div`
width: 35%;
height: 60%;
`;
