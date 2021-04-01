import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import DungeonBackground from '../images/DungeonBackground.jpg';
import OldPaper from '../images/OldPaper.png';

export default function Profile() {
  const [back, setBack] = useState(false);

  if(back) return <Redirect to='/' />
  return (
    <ProfilePage>
      <h1 onClick={() => setBack(true)}>GO BACK</h1>
      <CharacterSheet>

      </CharacterSheet>
    </ProfilePage>
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
`;
const CharacterSheet = styled.div`
width: 35%;
height: 80%;
background-image: url(${OldPaper});
background-size: 100% 100%;
margin: 0 auto;
`;
