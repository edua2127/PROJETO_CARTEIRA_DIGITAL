import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

const buttonTheme = createTheme({
    palette: {
        primary: {
            main: '#000000',
          },
    },
  });

export default function MyButton({ children , handleEvent}) {
  return (
    <ThemeProvider theme={buttonTheme}>
        <Button 
			variant="outlined" 
        	size="large" 
        	onClick={handleEvent}>
            	{children}
        </Button>
    </ThemeProvider>
  );
}