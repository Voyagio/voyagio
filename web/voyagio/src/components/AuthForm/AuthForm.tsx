import { useForm } from '@mantine/form';
import { FC } from 'react';
import {
  AuthFormContainer,
  Icon,
  GoogleButton,
  AuthInputContainer,
} from './AuthForm.styled';
import GoogleIcon from '/public/google_icon.svg';
import {
  Button,
  Checkbox,
  Divider,
  PasswordInput,
  TextInput,
} from '@mantine/core';
import { useAuth } from '/src/hooks/useAuth';

type AuthFormProps = {
  signup: boolean;
};

export const AuthForm: FC<AuthFormProps> = ({ signup }) => {
  const { handleLogin, handleSignup } = useAuth();

  const text = signup ? 'Sign up' : 'Sign in';

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (val) =>
        /^\S+@\S+$/.test(val) ? null : 'Wrong format of the email address',
      password: (val) =>
        val.length <= 6
          ? 'Password should include at least 6 characters'
          : null,
    },
  });

  const handleSubmit = () => {
    const res = signup
      ? handleSignup(form.values.email, form.values.password)
      : handleLogin(form.values.email, form.values.password);

    res.catch((ax_err) => {
      switch (ax_err.response.status) {
        case 409:
          form.setFieldError('email', 'Email already in use');
          break;
        case 401:
          form.setFieldError(
            'password',
            'Login failed. Wrong email or password.'
          );
          break;
      }
    });
  };

  return (
    <AuthFormContainer onSubmit={form.onSubmit(handleSubmit)}>
      <AuthInputContainer>
        <TextInput
          label="Email"
          placeholder="a.chupkova@innopolis.university"
          value={form.values.email}
          onChange={(event) => form.setFieldValue('email', event.target.value)}
          error={form.errors.email}
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
          error={form.errors.password}
          styles={{
            label: { fontFamily: 'Lato, sans-serif', fontWeight: 600 },
          }}
        />
      </AuthInputContainer>
      <Checkbox label="Remember me" color="dark" />
      <Button type="submit" radius="sm">
        {text}
      </Button>
      <Divider
        label="OR"
        labelPosition="center"
        styles={{ label: { color: 'gray' } }}
      />
      <GoogleButton type="submit" radius="sm" variant="subtle" color="dark">
        <Icon src={GoogleIcon} alt="Google" />
        <span>{`${text} with Google`}</span>
      </GoogleButton>
    </AuthFormContainer>
  );
};
