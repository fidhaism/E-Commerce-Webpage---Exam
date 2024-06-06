import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  TextField,
  Box,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: theme.shape.borderRadius,
}));

const StyledMedia = styled(CardMedia)({
  height: 250,
  objectFit: 'contain',
  padding: '10px', // Added padding for better look
});

const SearchField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  backgroundColor: '#fff',
  borderRadius: theme.shape.borderRadius,
}));

const BackButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

function Home() {
  const theme = useTheme();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await fetch(`https://fakestoreapi.com/products/${productId}`, {
        method: 'DELETE',
      });
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleBackToList = () => {
    setSelectedProduct(null);
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedProduct) {
    return (
      <StyledContainer>
        <BackButton 
          variant="contained" 
          color="secondary" 
          onClick={handleBackToList}
        >
          Back to List
        </BackButton>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={6}>
            <StyledCard>
              <StyledMedia
                component="img"
                image={selectedProduct.image}
                alt={selectedProduct.title}
              />
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  {selectedProduct.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {selectedProduct.description}
                </Typography>
                <Typography variant="h6" color="primary" component="div">
                  ${selectedProduct.price}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <SearchField
        label="Search Products"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearch}
      />
      
      <Grid container spacing={4}>
        {filteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <StyledCard>
              <StyledMedia
                component="img"
                image={product.image}
                alt={product.title}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  ${product.price}
                </Typography>
                <Box mt={2} display="flex" justifyContent="space-between">
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => handleViewProduct(product)}
                  >
                    View Details
                  </Button>
                  <Button 
                    variant="contained" 
                    color="error" 
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </StyledContainer>
  );
}

export default Home;
