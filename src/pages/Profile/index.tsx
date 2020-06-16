import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Container, Header, HeaderContent } from './styles';
import { useAuth } from '../../context/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <div className="user">
            <header>
              <h2>Seja bem vindo:</h2>
              <h1>{user.name}</h1>
            </header>
          </div>
          <div>
            <nav>
              <Link to="/">
                <button type="button">
                  <FiArrowLeft size={24} />
                </button>
              </Link>
            </nav>
          </div>
        </HeaderContent>
      </Header>
    </Container>
  );
};

export default Profile;
