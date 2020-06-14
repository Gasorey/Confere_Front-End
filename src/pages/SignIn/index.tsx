import React, { useCallback } from 'react';

import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';
import { Form } from '@unform/web';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/ConfereLogo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Background, Container, Content } from './styles';

const SignIn: React.FC = () => {
  const handleSubmit = useCallback(async (data: SignInFormData) => {});

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="confere logo" />
        <h1>Faça seu login</h1>
        <Form onSubmit={}>
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            placeholder="Senha"
            type="password"
          />

          <Button type="submit">Entrar</Button>
        </Form>
        <Link to="/signup">
          <FiLogIn size={20} />
          Crie sua conta
        </Link>
      </Content>
      <Background />
    </Container>
  );
};
export default SignIn;
