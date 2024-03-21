import styled, { IStyledComponent, keyframes } from 'styled-components';

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

export const FlexWrapper:IStyledComponent<"web",IWrapProps> = styled.div`
 width:400px;
 border-radius:10px;
 background-color:rgb(50,50,50);
 margin:20px auto;
 color:white;
 opacity:0;
 display:flex;
 animation-name:${show};
 animation-delay:${({delay}:IWrapProps)=>delay * 0.3}s;
 animation-duration:0.3s;
 animation-timing-function: ease;
 animation-fill-mode: forwards;
 align-items:center;
 position:relative;
 height:300px;
`