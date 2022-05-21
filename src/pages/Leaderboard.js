import { LoadingButton } from '@mui/lab';
import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import { Container } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import endpoints from '../utils/endpoints';
import isAuthenticated from '../utils/isAuthenticated';
import paths from '../utils/paths';
import signOut from '../utils/signOut';

export const Leaderboard = () => {
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState();
  useEffect(() => {
    if (!isAuthenticated()) navigate(paths.home);

    const fetchLeaderboard = async () => {
      try {
        const { data } = await axios.get(endpoints.leaderboard);
        setLeaderboard(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLeaderboard();
  }, []);
  return (
    <>
      <main>
        <h2>Leaderboard!</h2>
        <p>Find who are the biggest degens!</p>
      </main>
      <Container>
        {leaderboard ? (
          <Paper style={{ border: '1px solid black' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>LP Token</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaderboard.map(
                  ({ email, portfolioValue, token, tokenAmount }, i) => (
                    <TableRow key={i}>
                      <TableCell>{email}</TableCell>
                      <TableCell>{token}</TableCell>
                      <TableCell>{tokenAmount}</TableCell>
                      <TableCell>{portfolioValue}</TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
            <Container>
              <Button>
                <Link
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  to={paths.portfolio}
                >
                  Portfolio
                </Link>
              </Button>
              <Button onClick={() => signOut()}>Sign out</Button>
            </Container>
          </Paper>
        ) : (
          <LoadingButton loading />
        )}
      </Container>
    </>
  );
};
