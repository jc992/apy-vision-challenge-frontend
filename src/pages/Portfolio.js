import { Paper, TextField } from '@mui/material';
import { Container } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import endpoints from '../utils/endpoints';
import paths from '../utils/paths';

export const Portfolio = () => {
  const [info, setInfo] = useState();

  useEffect(() => {
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
      {info && (
        <Container style={{ display: 'flex', justifyContent: 'center' }}>
          <Paper
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '50%',
              gap: 20,
            }}
          >
            <TextField label="User" readonly value={info.email} />
            <TextField label="Token" readonly value={info.token} />
            <TextField label="Amount" readonly value={info.tokenAmount} />
            <TextField label="Value" readonly value={info.portfolioValue} />
          </Paper>
        </Container>
      )}
      <nav>
        <Link to={paths.home}>Home</Link>
        <Link to={paths.leaderboard}>Leaderboard</Link>
      </nav>
    </>
  );
};
