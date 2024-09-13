# User Authentication System

This is a simple user authentication system built with **Node.js**, **Express.js**, and **MongoDB**. The system includes user registration, login, and logout functionalities, featuring **password hashing** and **JWT-based authentication**.

## Features

- User Registration
- User Login
- User Logout
- Password Hashing using **bcrypt**
- JWT (JSON Web Token) Authentication
- Session management using **cookies**

## Dependencies

- **express**: Web framework for Node.js.
- **path**: Node.js module for handling file paths.
- **cookie-parser**: Middleware for parsing cookies.
- **jsonwebtoken**: Library for creating and verifying JWTs.
- **bcrypt**: Library for hashing passwords.
- **ejs**: Template engine for rendering views.

## Middleware Setup

1. **cookie-parser()**: Parses cookies attached to the client request object.
2. **express.json()**: Parses incoming requests with JSON payloads.
3. **express.urlencoded({ extended: true })**: Parses incoming requests with URL-encoded payloads.
4. **express.static(path.join(__dirname, 'public'))**: Serves static files from the `public` directory.
5. **app.set('view engine', 'ejs')**: Sets **EJS** as the template engine for rendering views.

## Routes

1. **GET /**: Renders the `index.ejs` page.
2. **POST /create**: Handles user registration.
   - Extracts `username`, `email`, `password`, and `age` from the request body.
   - Hashes the password using **bcrypt**.
   - Creates a new user in the database with the hashed password.
   - Generates a JWT token and stores it in a cookie.
   - Sends the created user as a response.
3. **GET /logout**: Clears the JWT token cookie and redirects to the home page.
4. **GET /login**: Renders the `login.ejs` page.
5. **POST /login**: Handles user login.
   - Finds the user by email.
   - Compares the provided password with the hashed password in the database using **bcrypt**.
   - If the password matches, generates a JWT token and stores it in a cookie.
   - Sends a success message if login is successful; otherwise, sends an error message.

## Server Setup

The server listens on **port 3000**.

## Example Usage

1. **Register a User**:
   - Send a `POST` request to `/create` with `username`, `email`, `password`, and `age` in the request body.
2. **Login a User**:
   - Send a `POST` request to `/login` with `email` and `password` in the request body.
3. **Logout a User**:
   - Send a `GET` request to `/logout`.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/authentication-system.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   node app.js
   ```
