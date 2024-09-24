# Disaster Management Project

## Overview
This project is designed to facilitate disaster management through efficient volunteer registration, crisis management, and inventory tracking. The application allows users to register as volunteers, manage crises, and keep track of inventory and expenses related to disaster relief efforts.
**Admin Credential: **
```
mahmud@gmail.com
admin1666
```
## Features
- **Volunteer Registration**: Users can register as volunteers to assist in disaster relief efforts.
- **Crisis Management**: Admins can approve and manage crises effectively.
- **Inventory Tracking**: Track donations and expenses related to inventory for disaster management.
- **Real-Time Updates**: Instant updates for daily expenses as items are added to inventory.
- **User-Friendly Interface**: Built with React and Mantine UI for a smooth user experience.

## Tech Stack
- **Frontend**: React with Vite, Mantine UI, React Hook Form, Zod
- **Backend**: Node.js, Express
- **Database**: MySQL

## Installation

### Prerequisites
- Node.js
- Express
- MySQL
- React

### Setup
1. Clone the repository:
```
   git clone https://github.com/msourov/disaster-management.git
   cd disaster-management
```
2. Create a .env file in the backend root folder and set up your database connection string:
```
   HOST='localhost'                  # The host for your database, likely 'localhost' for local dev
   USER='your_database_user'          # Replace with your database username
   PASSWORD='your_database_password'  # Replace with your database password
   DATABASE='your_database_name'      # Replace with the name of your database
   PORT='your_port_number'            # Replace with the port for your server (e.g., 8080)
   NODE_ENV='development'             # The environment (can be 'development' or 'production')
   JWT_SECRET='your_jwt_secret_key'   # Replace with your secret key for JWT authentication

```
3. Create a .env file in the frontend root folder with the following info:
```
   BASE_API="http://localhost:8080/api/" # if you set port as 8080
```
5. Run backend
```
   cd backend
   npm install
   npm run dev
```
4. Run frontend
```
  cd frontend
  npm install
  npm run dev
``` 
