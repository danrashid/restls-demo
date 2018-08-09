import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Nav: React.SFC = () => (
  <AppBar>
    <Toolbar>
      <Typography>restls-demo</Typography>
    </Toolbar>
  </AppBar>
);

export default Nav;
