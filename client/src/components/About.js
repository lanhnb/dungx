import React, { useContext } from 'react';
import { AppContext } from './ProductContext';

const About = ()=> {
    const myName = useContext(AppContext); 
    const data = {
        name: "Lanh",
    }
  return (
    <>
    {myName}
    <HeroSections myData={data}/>{ " "}
    </>
  )
}

export default About

