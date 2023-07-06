import { FC } from 'react';
import {
  AccountAvatar,
  AccountInfoContainer,
  InfoContainer,
} from './AccountInfo.styled';

import avatar from '/public/default_avatar.png';

export const AccountInfo: FC = () => {
  return (
    <AccountInfoContainer>
      <AccountAvatar src={avatar} />
      <InfoContainer>
        <h3>
          Hello, <span>Alexandra</span>!
        </h3>
        <p>Russia, Innopolis</p>
      </InfoContainer>
    </AccountInfoContainer>
  );
};
