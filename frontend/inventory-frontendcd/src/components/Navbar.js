import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Inventory Management System
        </Typography>
        <Button color="inherit" component={Link} to="/">
          View Inventory
        </Button>
        <Button color="inherit" component={Link} to="/add">
          Add New Item
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;