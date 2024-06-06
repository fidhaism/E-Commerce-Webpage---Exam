import React from 'react';
import { Box, Typography, Container, Link } from '@mui/material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#f0f0f0',
        padding: '20px 0',
        textAlign: 'center',
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" color="textSecondary">
          &copy; 2024 E-Commerce Management
        </Typography>
        <Box mt={1}>
          <Link href="/privacy" color="inherit" sx={{ mx: 1 }}>
            Privacy Policy
          </Link>
          <Link href="/terms" color="inherit" sx={{ mx: 1 }}>
            Terms of Service
          </Link>
          <Link href="/contact" color="inherit" sx={{ mx: 1 }}>
            Contact Us
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
