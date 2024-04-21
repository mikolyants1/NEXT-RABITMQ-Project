import { FlexWrapper } from '@/components/libs/style/animation';

interface IProps {
  children:JSX.Element[],
  delay:number
}

function FilmCardWrapper({children,delay}:IProps):JSX.Element {
  return (
    <FlexWrapper delay={delay}>
      {children}
    </FlexWrapper>
  )
}

export default FilmCardWrapper