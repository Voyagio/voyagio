import { FC, useEffect, useState } from 'react';
import VkIcon from '/public/vk_icon.svg';
import InstaIcon from '/public/instagram_icon.svg';
import {
  ContactIcon,
  InformationH1,
  InformationH3,
  InformationHeaders,
  KebabCircle,
  AuthInformationContainer,
  AuthPageContactsGroup,
  AuthPageKebabGroup,
  AuthPageMainContainer,
  AuthUnderlay,
} from './AuthMain.styled';
import { AuthCard } from '../AuthCard';

export const AuthMain: FC = () => {
  const [kebabState, setKebabState] = useState<boolean[]>([true, false, false]);

  useEffect(() => {
    const interval = setInterval(() => {
      setKebabState((prevState) => {
        const newState = [...prevState];
        newState.unshift(newState.pop() as boolean);
        return newState;
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthPageMainContainer>
      <AuthPageKebabGroup>
        <KebabCircle current={kebabState[0]} />
        <KebabCircle current={kebabState[1]} />
        <KebabCircle current={kebabState[2]} />
      </AuthPageKebabGroup>

      <AuthUnderlay>
        <AuthCard />

        <AuthInformationContainer>
          <InformationHeaders>
            <InformationH1 current={true}>Search places</InformationH1>
            <InformationH1>Find exciting ones</InformationH1>
            <InformationH1>Create a route</InformationH1>
          </InformationHeaders>

          <InformationH3>Satisfy by personal recommendations</InformationH3>
        </AuthInformationContainer>
      </AuthUnderlay>

      <AuthPageContactsGroup>
        <ContactIcon src={VkIcon} alt="vk" />
        <ContactIcon src={InstaIcon} alt="instagram" />
      </AuthPageContactsGroup>
    </AuthPageMainContainer>
  );
};
