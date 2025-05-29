import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <Box sx={{ flexGrow: 1 }} style={{marginTop:'7.6ch'}}>
      <AppBar position="static" style={{display:'flex', justifyContent:'center', alignItems:'center', backgroundColor:'#626F47'}}>
        <Toolbar>
          
          <Typography variant="h6" component="div" style={{display:'flex', justifyContent:'center', alignItems:'center', gap:'5px', color:'#f8f3d9', fontFamily:'Irish Grover'}} sx={{ flexGrow: 1 }}>
            <svg 
            xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="25" height="25" x="0" y="0" viewBox="0 0 16 16" xmlSpace="preserve"><g><path d="M8 1.25C4.278 1.25 1.25 4.278 1.25 8S4.278 14.75 8 14.75s6.75-3.028 6.75-6.75S11.722 1.25 8 1.25zm0 12c-2.895 0-5.25-2.355-5.25-5.25S5.105 2.75 8 2.75 13.25 5.105 13.25 8 10.895 13.25 8 13.25z" fill="#f8f3d9" opacity="1" dataoriginal="#f8f3d9"></path><path d="m9.59 6.41 1.061-1.061c-1.416-1.417-3.886-1.417-5.302 0C4.64 6.057 4.25 6.999 4.25 8s.39 1.943 1.099 2.651c.708.709 1.65 1.099 2.651 1.099s1.943-.39 2.651-1.099l-1.06-1.06c-.85.85-2.332.85-3.182 0C5.984 9.166 5.75 8.6 5.75 8s.234-1.166.66-1.59c.849-.851 2.331-.851 3.18 0z" fill="#f8f3d9" opacity="1" dataoriginal="#f8f3d9"></path></g>
            </svg>
            2024 Pluma. All Rights Reserved 
          </Typography>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
