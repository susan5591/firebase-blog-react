import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import styles from '../styles/search.module.css'

export default function CircularIndeterminate() {
  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: "center" }}>
        <CircularProgress />
      </Box>
      <h1 className={styles.loading}>Loading .....</h1>
    </div>
  );
}
