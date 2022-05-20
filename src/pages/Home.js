import { Button, Grid, TextField } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import login from '../utils/login';
import paths from '../utils/paths';
import endpoints from '../utils/endpoints';
import { Select } from '../components/Select';
import isAuthenticated from '../utils/isAuthenticated';

export const Home = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [selectedToken, setSelectedToken] = useState('');
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    if (isAuthenticated()) navigate(paths.portfolio);

    const fetchTokens = async () => {
      try {
        const { data } = await axios.get(endpoints.token);
        setTokens(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTokens();
  }, []);

  const handleSelect = (e) => {
    setSelectedToken(e.target.value);
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAuth = async () => {
    try {
      const response = await axios.get(endpoints.user.concat(email));
      login(response, email);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post(endpoints.user, {
        email,
        token: selectedToken,
      });
      login(response, email);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <Grid container spacing={2}>
        <Grid item md={6} sm={12}>
          <Container
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '50%',
              gap: 20,
            }}
          >
            <TextField label="Email" onChange={(e) => handleChange(e)} />
            <Select
              label="Token"
              value={selectedToken}
              items={tokens}
              handleSelect={handleSelect}
            />
            <Button variant="outlined" onClick={handleAuth}>
              Authenticate Existing Account
            </Button>
            <Button variant="outlined" onClick={handleSignUp}>
              Create Account
            </Button>
          </Container>
        </Grid>
      </Grid>
      <nav>
        <Link to={paths.portfolio}>Portfolio</Link>
        <Link to={paths.leaderboard}>Leaderboard</Link>
      </nav>
    </>
  );
};
