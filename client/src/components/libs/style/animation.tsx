import styled, {type IStyledComponent, keyframes } from 'styled-components';
import { IAbsolute } from '../types/type';

const show = keyframes`
  from {
    opacity:0;
    transform:translate(-50px)
  } 
  
  to {
    opacity:1;
    transform:translate(0);
  }
`

interface IWrapProps {
  children:JSX.Element[],
  delay:number
}

interface ITranProps {
  move:number,
  children:JSX.Element[]
}

export const autoAbsolute:IAbsolute = {
  top:0,
  left:0,
  right:0,
  bottom:0,
  m:"auto"
}

export const searchMotion = {
  initial:{
    opacity:0,
    transform:"translateY(100px)"
  },
  animate:{
    opacity:1,
    transform:"translateY(0)"
  }
}

export const FlexWrapper:IStyledComponent<"web",IWrapProps> = styled.div`
 min-width:400px;
 border-radius:10px;
 background-color:rgb(50,50,50);
 margin:20px auto;
 animation-name:${show};
 animation-duration:1s;
 animation-delay:${({delay}:IWrapProps)=>delay};
 animation-fill-mode:forwards;
 animation-timing-function:ease;
 color:white;
 display:flex;
 position:relative;
 align-items:center;
 height:300px;
`

export const FilmWrapper:IStyledComponent<"web",ITranProps> = styled.div`
  transform:translate(${({move}:ITranProps)=>move * -550}px);
  transition:transform 1s;
  min-width:400px;
  border-radius:10px;
  background-color:rgb(50,50,50);
  margin:20px auto;
  color:white;
  display:flex;
  align-items:center;
  height:300px;
`