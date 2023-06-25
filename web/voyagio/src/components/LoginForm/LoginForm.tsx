import { useForm } from '@mantine/form';
import { FC } from 'react';
import {
  LoginFormContainer,
  Icon,
  GoogleButton,
  LoginInputContainer,
} from './LoginForm.styled';
import GoogleIcon from '/public/google_icon.svg';
import {
  Button,
  Checkbox,
  Divider,
  PasswordInput,
  TextInput,
} from '@mantine/core';

export const LoginForm: FC = () => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) =>
        val.length <= 6
          ? 'Password should include at least 6 characters'
          : null,
    },
  });
  return (
    <LoginFormContainer onSubmit={form.onSubmit(() => {})}>
      <LoginInputContainer>
        <TextInput
          label="Email"
          placeholder="a.chupkova@innopolis.university"
          value={form.values.email}
          onChange={(event) => form.setFieldValue('email', event.target.value)}
          error={form.errors.email && 'Wrong format of email address'}
          styles={{
            label: { fontFamily: 'Lato, sans-serif', fontWeight: 600 },
          }}
        />
        <PasswordInput
          label="Password"
          placeholder="qwerty12345"
          value={form.values.password}
          onChange={(event) =>
            form.setFieldValue('password', event.target.value)
          }
          error={
            form.errors.password &&
            'Password should include at least 6 characters'
          }
          styles={{
            label: { fontFamily: 'Lato, sans-serif', fontWeight: 600 },
          }}
        />
      </LoginInputContainer>
      <Checkbox label="Remember me" color="dark" />
      <Button type="submit" radius="sm">
        Sign in
      </Button>
      <Divider
        label="OR"
        labelPosition="center"
        styles={{ label: { color: 'gray' } }}
      />
      <GoogleButton type="submit" radius="sm" variant="subtle" color="dark">
        <Icon src={GoogleIcon} alt="Google" />
        <span>Sign in with Google</span>
      </GoogleButton>
    </LoginFormContainer>
  );
};
