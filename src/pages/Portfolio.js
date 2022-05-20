import { LoadingButton } from '@mui/lab';
import { Paper, TextField } from '@mui/material';
import { Container } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import isAuthenticated from '../utils/isAuthenticated';
import endpoints from '../utils/endpoints';
import paths from '../utils/paths';

export const Portfolio = () => {
  const navigate = useNavigate();
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
      <main>
        <h2>Welcome to the portfolio!</h2>
        <p>You can do this, I believe in you.</p>
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
            <TextField label="Value" readOnly value={info.portfolioValue} />
          </Paper>
        </Container>
      ) : (
        <LoadingButton loading />
      )}
      <nav>
        <Link to={paths.home}>Home</Link>
        <Link to={paths.leaderboard}>Leaderboard</Link>
      </nav>
    </>
  );
};
