import { FC } from 'react';
import VkIcon from '/public/vk_icon.svg';
import InstaIcon from '/public/instagram_icon.svg';
import {
  ContactIcon,
  InformationH1,
  InformationH3,
  InformationHeaders,
  KebabCircle,
  LoginInformationContainer,
  LoginPageContactsGroup,
  LoginPageKebabGroup,
  LoginPageMainContainer,
  LoginUnderlay,
} from './LoginMain.styled';
import { LoginCard } from '../LoginCard';

export const LoginMain: FC = () => {
  return (
    <LoginPageMainContainer>
      <LoginPageKebabGroup>
        <KebabCircle current={true} />
        <KebabCircle />
        <KebabCircle />
      </LoginPageKebabGroup>

      <LoginUnderlay>
        <LoginCard />

        <LoginInformationContainer>
          <InformationHeaders>
            <InformationH1 current={true}>Search places</InformationH1>
            <InformationH1>Find exciting ones</InformationH1>
            <InformationH1>Create a route</InformationH1>
          </InformationHeaders>

          <InformationH3>Satisfy by personal recommendations</InformationH3>
        </LoginInformationContainer>
      </LoginUnderlay>

      <LoginPageContactsGroup>
        <ContactIcon src={VkIcon} alt="vk" />
        <ContactIcon src={InstaIcon} alt="instagram" />
      </LoginPageContactsGroup>
    </LoginPageMainContainer>
  );
};
