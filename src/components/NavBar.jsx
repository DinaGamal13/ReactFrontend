import { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    borderRadius: '30px',
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
  },
}));

const settings = ['Logout'];
export default function NavBar({ onSearch }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = location.pathname === '/' || location.pathname.startsWith('/posts/edit');

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedName = localStorage.getItem('userName');
    if (token && storedName) {
      setIsLoggedIn(true);
      setUserName(storedName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserName('');
    window.location.reload();
  };


  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1 , position:'sticky', top:'0'}}>
      <AppBar position="sticky" sx={{ backgroundColor: "#626F47", padding: '15px 10ch' }}>
        <Toolbar>
          <img src="/logo.png" style={{
            height: '50px', marginRight: '8px'
          }} alt="" />
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
            style={{ fontFamily: 'Irish Grover', marginRight: '20px' }}
          >
            Pluma
          </Typography>
          <Search style={{
            border: '1px solid #F8F3D9',
            opacity: '75%'
          }}>
            <SearchIconWrapper style={{ color: '#F8F3D9', opacity: '75%' }}>
              <SearchIcon />
              <hr style={{ height: '3ch', borderColor: '#F8F3D9', opacity: '75%', marginLeft: '1ch' }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              style={{ marginLeft: '1ch' }}
              value={searchInput}
              onChange={handleSearch}
            />
          </Search>
          <NavLink id='List'
            to="/"
            className={isActive ? 'active inactive' : 'inactive'}
            style={{ textDecoration: 'none' }}
          >
            <li className='posts'>Posts</li>
          </NavLink>

          {isLoggedIn ? (
            <Box sx={{ flexGrow: 0 }} style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>

              <NavLink id='List'
                to="/create"
                className={({ isActive }) => isActive ? 'active inactive' : 'inactive'}

                style={{ textDecoration: 'none' }}
              >
                <li className='create'>Create</li>
              </NavLink>
              <Tooltip title="Open settings" style={{ marginLeft: '18ch', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                <div onClick={handleOpenUserMenu} style={{ width: '45px', height: '45px', borderRadius: '100%', backgroundColor: '#F8F3D9', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#626F47', fontSize: '2ch', fontFamily: 'Irish Grover', cursor: 'pointer' }}>
                  {userName.split(' ')[0][0]?.toUpperCase() + userName.split(' ')[1][0]?.toUpperCase()}
                </div>
                <p style={{ fontSize: '2.5ch', color: '#F8F3D9' }}>{userName}</p>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleLogout}>
                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <>
              <Link to='/login' style={{ color: '#F8F3D9', textDecoration: 'none' }}>
                <Button variant="outlined" style={{ marginLeft: '25ch', marginRight: '2ch', borderColor: '#F8F3D9', color: '#F8F3D9', opacity: '75%', textTransform: 'none', padding: '0.7ch 4ch', fontSize: '2ch' }}>
                  Login
                </Button>
              </Link>
              <Link to='/signup' style={{ color: '#626F47', textDecoration: 'none' }}>
                <Button variant="contained" style={{ color: '#626F47', backgroundColor: '#F8F3D9', textTransform: 'none', padding: '0.7ch 4ch', fontSize: '2ch' }}>
                  SignUp
                </Button>
              </Link>
            </>
          )}

        </Toolbar>
      </AppBar>
    </Box>
  );
}
