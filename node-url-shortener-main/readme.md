# Node.js URL Shortener API

This is a URL shortening service built with Node.js, MongoDB, and Express.js. The API allows you to shorten long URLs and manage them with JWT authentication and Redis caching.

## Tech Stack

- **Node.js**: JavaScript runtime environment.
- **MongoDB**: NoSQL database for storing URLs.
- **Express.js**: Web framework for building the API.
- **Redis**: Caching solution to enhance performance.

## API Endpoints

### `/api/register`

- **Description**: Registers a new user and returns a JWT token.
- **Authentication**: None required.
- **Response**: JWT token in the response which should be used for authentication in subsequent requests.

### `/api/short`

- **Description**: Shortens a given URL.
- **Method**: POST
- **Request Body**:
  ```json
 - {
    "origUrl": "https://www.youtube.com/watch?v=6kGiElisMFH2exzjBeE_zAHHJOdxg&index=8",
    "shortUrl": "",
    "expiresInDays": 2
  }
