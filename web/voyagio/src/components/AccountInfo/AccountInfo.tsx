import { FC } from 'react';
import {
  AccountAvatar,
  AccountInfoContainer,
  InfoContainer,
} from './AccountInfo.styled';

import avatar from '/public/default_avatar.png';

type AccountInfoProps = {
  email: string;
};

export const AccountInfo: FC<AccountInfoProps> = ({ email }) => {
  return (
    <AccountInfoContainer>
      <AccountAvatar src={avatar} />
      <InfoContainer>
        <h3>
          Hello, <span>{email}</span>!
        </h3>
        <p>Russia, Innopolis</p>
      </InfoContainer>
    </AccountInfoContainer>
  );
};
