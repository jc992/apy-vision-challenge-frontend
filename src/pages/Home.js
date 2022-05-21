import { Button, FormLabel, Grid, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import login from '../utils/login';
import paths from '../utils/paths';
import endpoints from '../utils/endpoints';
import { Select } from '../components/Select';
import isAuthenticated from '../utils/isAuthenticated';

export const Home = () => {
  const navigate = useNavigate();
  const [signUpEmail, setSignUpEmail] = useState();
  const [signInEmail, setSignInEmail] = useState();
  const [selectedToken, setSelectedToken] = useState();
  const [tokens, setTokens] = useState([]);
  const [error, setError] = useState();

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

  const handleSignUpChange = (e) => {
    setSignUpEmail(e.target.value);
  };
  const handleSignInChange = (e) => {
    setSignInEmail(e.target.value);
  };

  const handleAuth = async () => {
    try {
      const response = await axios.get(endpoints.user.concat(signInEmail));
      login(response, signInEmail);
      navigate(paths.portfolio);
    } catch (err) {
      setError('User doesn´t exist!');
      console.error(err);
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post(endpoints.user, {
        email: signUpEmail,
        token: selectedToken,
      });
      login(response, signUpEmail);
      navigate(paths.portfolio, { state: { signedUp: true } });
    } catch (err) {
      setError('User already exists!');
      console.error(err);
    }
  };

  return (
    <>
      <main style={{ paddingBottom: '3rem' }}>
        <h2>Welcome to the Apy.Vision giveaway!</h2>
        <p>Choose an LP token in which you wish to invest $100.000!</p>
      </main>
      {error && <Typography color="red">{error}</Typography>}
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
            <FormLabel>Sign up</FormLabel>
            <TextField label="Email" onChange={(e) => handleSignUpChange(e)} />
            <Select
              label="Token"
              value={selectedToken}
              items={tokens}
              handleSelect={handleSelect}
            />
            <Button disabled={!selectedToken || !signUpEmail} variant="outlined" onClick={handleSignUp}>
              Create Account
            </Button>
          </Container>
        </Grid>
        <Grid item md={6} sm={12}>
          <Container
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '50%',
              gap: 20,
            }}
          >
            <FormLabel>Already a member ?</FormLabel>
            <TextField label="Email" onChange={(e) => handleSignInChange(e)} />
            <Button variant="outlined" onClick={handleAuth}>
              Login
            </Button>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};
