import './style.css';
import React, { useState } from 'react';
import Board from 'tictactoe-board';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export default function App() {
  const [board, setBoard] = useState(new Board());
  const [error, setError] = useState(false);

  return (
    <>
      <AppBar position={'sticky'}>
        <Toolbar>Jogo da Velha</Toolbar>
      </AppBar>
      <div className="board">
        <Grid container spacing={2}>
          {board.grid.map((cell, i) => (
            <Grid item xs={4}>
              <Paper
                elevation={3}
                sx={{
                  backgroundColor: () => {
                    if (cell) {
                      if (cell === 'X') {
                        return 'blue';
                      }
                      return 'red';
                    }
                  },
                  height: '10vw',
                  width: '10vw',
                }}
                onClick={() => {
                  if (board.isMoveValid(i + 1)) {
                    setBoard(board.makeMove(i + 1, board.currentMark()));
                  } else if (!board.isGameOver()) {
                    setError(true);
                  }
                }}
              />
            </Grid>
          ))}
        </Grid>
      </div>
      <Snackbar
        open={error}
        autoHideDuration={800}
        onClose={() => {
          setError(false);
        }}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          Jogada inválida!
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!board.isGameDraw()}
        onClose={() => setBoard(new Board())}
      >
        <Alert severity="warning" sx={{ width: '100%' }}>
          Deu velha! Clique em qualquer lugar para começar de novo.
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!board.winningPlayer()}
        onClose={() => setBoard(new Board())}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Jogador {board.winningPlayer() === 'X' ? 'azul' : 'vermelho'} ganhou!
          Clique em qualquer lugar para começar de novo.
        </Alert>
      </Snackbar>
    </>
  );
}
