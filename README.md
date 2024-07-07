# Social Network API

## Table of Contents

1. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
2. [API Endpoints](#api-endpoints)
   - [Authentication](#authentication)
     - [Sign Up](#sign-up)
     - [Login](#login)
   - [Users](#users)
     - [Uploading Profile Image](#uploading-profile-image)
     - [Get Profile](#get-profile)
     - [Add Friend](#add-friend)
     - [Accept Friend Request](#accept-friend-request)
   - [Posts](#posts)
     - [Create Post](#create-post)
     - [Get All Posts](#get-all-posts)
     - [Get Post](#get-post)
     - [Update Post](#update-post)
     - [Delete Post](#delete-post)
   - [Likes](#likes)
     - [Like Post](#like-post)
     - [Unlike Post](#unlike-post)
   - [Comments](#comments)
     - [Create Comment](#create-comment)
     - [Delete Comment](#delete-comment)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/)

### Installation

1. Clone the repo
   `git clone https://github.com/Fadyy22/alx-career-craft.git`
2. Navigate to the project directory
   `cd alx-career-craft`
3. Install dependencies
   `npm install`
4. Create a `.env` file in the root directory and add the following environment variables:
   `Contact for the .env file or create your own and add the following:`

   ```env
    # Server
    HOST=
    PORT=

    # Database
    DATABASE_URL=

    # JWT
    JWT_SECRET_KEY=
    JWT_EXPIRATION=

   # CLOUDINARY
   CLOUDINARY_NAME=dnuouhscg
   CLOUDINARY_API_KEY=273413362486614
   CLOUDINARY_API_SECRET=1loGwRxGG1i9oxoDYBy8jgZhXe8
   ```

5. Start the server
   `npm start`

## API Endpoints

### Authentication

#### Sign Up

- **URL:** `/auth/signup`
- **Method:** `POST`
- **Request Body:**

```json
 {
     "firstName": String,
     "lastName": String,
     "email": String,
     "password": String
 }
```

- **Response:**

  ```json
    {
        "user": {
            "id": String,
            "firstName": String,
            "lastName": String,
            "profile_img": null or String,
            "email": String,
            "password": String,
            "createdAt": String (Date)
        },
        "token": String
    }
  ```

#### Login

- **URL:** `/auth/login`

- **Method:** `POST`

- **Request Body:**

  ```json
    {
        "email": String,
        "password": String
    }
  ```

- **Response:**

  ```json
    {
        "user": {
            "id": String,
            "firstName": String,
            "lastName": String,
            "profile_img": null or String,
            "email": String,
            "password": String,
            "createdAt": String (Date)
        },
        "token": String
    }
  ```

---

### Users

#### Uploading Profile Image

- **URL:** `/users/profile-img`

- **Method:** `PATCH`

- **Request Body:** Form Data

  ```json
    {
        "profile_img": File
    }
  ```

- **Response:**

  ```json
    {
        "user": {
            "id": String,
            "firstName": String,
            "lastName": String,
            "email": String,
            "profile_img": String,
            "createdAt": String (Date)
        }
    }
  ```

#### Get Profile

- **URL:** `/users/:id`

- **Method:** `GET`

- **Response:**

  ```json
    {
        "user": {
        "id": String,
        "firstName": String,
        "lastName": String,
        "email": String,
        "profile_img": null or String,
        "createdAt": String (Date),
        }
    }
  ```

#### Add Friend

- **URL:** `/users/:id/add`

- **Method:** `POST`

- **Response:**

  ```json
  {
    "message": "Friend request sent"
  }
  ```

#### Accept Friend Request

- **URL:** `/users/:id/accept`

- **Method:** `POST`

- **Response:**

  ```json
  {
    "message": "Friend request accepted"
  }
  ```

---

### Posts

#### Create Post

- **URL:** `/posts`

- **Method:** `POST`

- **Request Body:**

  ```json
    {
        "content": String
    }
  ```

- **Response:**

  ```json
    {
        "post": {
            "id": String,
            "content": String,
            "authorId": String,
            "likesCount": Integer,
            "commentsCount": Integer,
            "createdAt": String (Date)
        }
    }
  ```

#### Get All Posts

- **URL:** `/posts`

- **Method:** `GET`

- **Response:**

  ```json
    {
        "posts": [
            {
                "id": String,
                "content": String,
                "authorId": String,
                "likesCount": Integer,
                "commentsCount": Integer,
                "createdAt": String (Date),
                "author": {
                    "id": String,
                    "firstName": String,
                    "lastName": String,
                    "profile_img": null or String
                },
                "isLiked": Boolean
            }
        ]
    }
  ```

#### Get Post

- **URL:** `/posts/:id`

- **Method:** `GET`

- **Response:**

  ```json
    {
        "post": {
            "id": String,
            "content": String,
            "authorId": String,
            "likesCount": Integer,
            "commentsCount": Integer,
            "createdAt": String (Date),
            "author": {
                "id": String,
                "firstName": String,
                "lastName": String,
                "profile_img": null or String
            },
            "comments": [
                {
                    "id": String,
                    "user": {
                        "id": String,
                        "firstName": String,
                        "lastName": String,
                        "profile_img": null or String
                    },
                    "content": String,
                    "createdAt": String (Date),
                }
            ],
            "isLiked": Boolean
        }
    }
  ```

#### Update Post

- **URL:** `/posts/:id`

- **Method:** `PATCH`

- **Request Body:**

  ```json
  {
    "content": String
  }
  ```

- **Response:**

  ```json
    {
        "post": {
            "id": String,
            "content": String,
            "authorId": String,
            "likesCount": Integer,
            "commentsCount": Integer,
            "createdAt": String (Date),
            "author": {
                "id": String,
                "firstName": String,
                "lastName": String,
                "profile_img": null or String
            },
        }
    }
  ```

#### Delete Post

- **URL:** `/posts/:id`

- **Method:** `DELETE`

- **Response:** 204 No Content

---

### Likes

#### Like Post

- **URL:** `/posts/:id/like`

- **Method:** `POST`

- **Response:**

  ```json
  {
    "message": "Post liked"
  }
  ```

#### Unlike Post

- **URL:** `/posts/:id/unlike`

- **Method:** `DELETE`

- **Response:** 204 No Content

---

### Comments

#### Create Comment

- **URL:** `/posts/:id/comments`

- **Method:** `POST`

- **Request Body:**

  ```json
    {
        "content": String
    }
  ```

- **Response:**

  ```json
    {
        "comment": {
            "id": String,
            "userId": String,
            "postId": String,
            "content": String,
            "createdAt": String (Date)
        }
    }
  ```

#### Delete Comment

- **URL:** `/posts/:postId/comments/:commentId`

- **Method:** `DELETE`

- **Response:** 204 No Content
