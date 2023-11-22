# Api Cats
Short description of what the application does or offers.

## Prerequisites
Make sure you have the following dependencies installed:

- Node.js v20.9.0
- npm (Node.js package manager)

## Installation
```
npm install
```

## Run application

 ```
  npm run start:dev
```
The application will be available at: http://localhost:3000


## API Endpoints
GET /cats
Returns a list of cats.

## Example Usage
 ```
 curl http://localhost:3000/cats 
 ```

## Clean Architecture
This project follows the principles of clean architecture, promoting a clear separation of responsibilities between the application's layers. Currently, cat search is implemented only in memory, but the architecture allows easy extension to other types of storage.

## Testing
Tests for this application are under development and need to be finalized.
