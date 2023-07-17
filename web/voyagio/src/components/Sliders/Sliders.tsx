import { FC } from 'react';
import { Slide } from './Sliders.styled';

export const Sliders: FC = () => {
  return (
    <>
      <Slide
        bg={
          'https://raw.githubusercontent.com/Voyagio/voyagio/main/static/backgroundLogin.jpg'
        }
        delay={'0s'}
      ></Slide>
      <Slide
        bg={
          'https://raw.githubusercontent.com/Voyagio/voyagio/main/static/backgroundLogin2.png'
        }
        delay={'-3.5s'}
      ></Slide>
      <Slide
        bg={
          'https://raw.githubusercontent.com/Voyagio/voyagio/main/static/backgroundLogin3.png'
        }
        delay={'-7s'}
      ></Slide>
    </>
  );
};
