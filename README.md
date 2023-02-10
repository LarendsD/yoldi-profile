# Yoldi.agency test task

## API

1. POST /profile

Create profile

Request body:
```json
{
  "username": "string",
  "email": "example@mail.ru",
  "password": "qwerty12345"
}
```
Response:
```json
{
  "id": "1",
  "username": "string",
  "email": "example@mail.ru",
  "slug": "1"
}
```
2. GET /profile

Get profile list

Request body:
```json
// JWT Token in cookies required!
{}
```
Response:
```json
{
  "data": [
    {
      "id": "1",
      "username": "user1",
      "email": "example@mail.ru",
      "description": "I'm user",
      "slug": "custom",
      "avatar": "example/folder/avatar1",
      "cover": "example/folder/cover2"
    },
    {
      "id": "2",
      "username": "user12",
      "email": "examples@gmail.com",
      "description": "I'm user too",
      "slug": "2",
      "avatar": "example/folder/avatar2",
      "cover": "example/folder/cover1"
    },
    // etc...
  ], 
  "pagination": {
    "page": 1,
    "perpage": 3,
    "pageCount": 4,
  }
}
```
3. GET /profile/:id

Get profile by id

Request body:
```json
// JWT Token in cookies required!
{}
```
Response: 
```json
{
  "id": "2",
  "username": "user12",
  "description": "I'm user too",
  "slug": "2",
  "email": "examples@gmail.com",
  "avatar": "example/folder/avatar2",
  "cover": "example/folder/cover1"
},
```

4. PUT /profile/:id

Update profile by id

Request body:
```json
// JWT Token in cookies required!
{
  "username": "updatedUser",
  "email": "redacted-email@mail.ru",
  "description": "Updated description",
  "slug": "myslug",
  "password": "newPass1234"
}
```
Response:
```json
{
  "id": "2",
  "username": "updatedUser",
  "email": "redacted-email@mail.ru",
  "description": "Updated description",
  "avatar": "example/folder/avatar12",
  "slug": "myslug",
  "cover": "example/folder/cover23"
}
```

5. DELETE /profile/:id

Delete profile by id

Request body:
```json
// JWT Token in cookies required!
{}
```
Response:
```json
{}
```

6. GET /profile/my

Get profile of logged user with JWT token in cookie

Request body:
```json
// JWT Token in cookies required!
{}
```
Response:
```json
{
  "id": "2",
  "username": "updatedUser",
  "email": "redacted-email@mail.ru",
  "description": "Updated description",
  "slug": "myslug",
  "avatar": "example/folder/avatar12",
  "cover": "example/folder/cover23"
}
```

7. GET /profile/:slug

Get profile by slug

Request body:
```json
// JWT Token in cookies required!
{}
```

Response:
```json
{
  "id": "2",
  "username": "updatedUser",
  "email": "redacted-email@mail.ru",
  "description": "Updated description",
  "slug": "myslug",
  "avatar": "example/folder/avatar12",
  "cover": "example/folder/cover23"
}
```

8. POST /login

Login in profile and sets access_token in cookies

Request body:
```json
{
  "email": "redacted-email@mail.ru",
  "password": "qwerty1234"
}
```

Response:
```json
{
  "access_token": "jwtaccesstoken35a35ea5"
}
```

9. POST /logout

Logout from profile and clears access_token from cookies

Request body:
```json
// JWT Token in cookies required!
{}
```

Response:
```json
{}
```

10. POST profile/:id/upload

Upload avatar or cover for user

Request body:
```json
// JWT Token in cookies required!
{
  "avatar": "example avatar file",
  "cover": "example cover file",
}
```

Response:
```json
{
  "id": "2",
  "username": "updatedUser",
  "email": "redacted-email@mail.ru",
  "description": "Updated description",
  "slug": "myslug",
  "avatar": "example/folder/avatar12",
  "cover": "example/folder/cover23"
}
```