// Importing json-server package
const JSONserver = require('json-server');

// Creating a server using the create() method from json-server
const Commerceserver = JSONserver.create();

// Generating path/route to server resources
const router = JSONserver.router("db.json");

// Initializing json-server middleware
const middleware = JSONserver.defaults();

// Creating a PORT number for the server
const PORT = 3001 || process.env.PORT;

// Implementing route to resource to server
Commerceserver.use(middleware);

// Implementing middleware to server
Commerceserver.use(router);

// Run command for server
Commerceserver.listen(PORT, () => {
    console.log(`Commerce Server is running at: ${PORT}`);
});

