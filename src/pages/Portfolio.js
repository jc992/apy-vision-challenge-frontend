import { LoadingButton } from '@mui/lab';
import { Alert, Button, Paper, TextField } from '@mui/material';
import { Container } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import isAuthenticated from '../utils/isAuthenticated';
import endpoints from '../utils/endpoints';
import paths from '../utils/paths';
import signOut from '../utils/signOut';

export const Portfolio = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [info, setInfo] = useState();

  useEffect(() => {
    if (!isAuthenticated()) navigate(paths.home);

    const fetchInfo = async () => {
      const userEmail = localStorage.getItem('user');
      try {
        const { data } = await axios.get(endpoints.user.concat(`${userEmail}`));
        setInfo(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchInfo();
  }, []);

  return (
    <>
      {state && state.signedUp && (
        <Alert severity="success">Successfully entered pool!</Alert>
      )}

      <main>
        <h2>Portfolio!</h2>
        <p>Check your personal earnings</p>
      </main>
      {info ? (
        <Container style={{ display: 'flex', justifyContent: 'center' }}>
          <Paper
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '50%',
              gap: 20,
            }}
          >
            <TextField label="User" readOnly value={info.email} />
            <TextField label="Token" readOnly value={info.token} />
            <TextField label="Amount" readOnly value={info.tokenAmount} />
            <TextField
              label="Value"
              readOnly
              value={info.portfolioValue.toFixed(2)}
            />
            <Container>
              <Button>
                <Link
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  to={paths.leaderboard}
                >
                  Leaderboard
                </Link>
              </Button>
              <Button onClick={() => signOut()}>Sign out</Button>
            </Container>
          </Paper>
        </Container>
      ) : (
        <LoadingButton loading />
      )}
    </>
  );
};
