import { Toolbar } from '@mui/material';

function FooterComponent() {
  return (
    <Toolbar
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 'auto',
        right: 0,
        backgroundColor: '#1976d2',
        color: '#fff',
        p: 1,
        justifyItems: 'center',
        boxShadow: 3,
        width: '100%',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      Footer
    </Toolbar>
  );
}

export default FooterComponent;
