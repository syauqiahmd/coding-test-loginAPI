# Coding Test

## Demo
URL: coding-test-loginapi-production.up.railway.app

## Postman Documentation
file : `./postman-docs.json`

## Credential

#### Admin

| Name | Value     |
| :-------- | :------- |
| `email` | `admin@mail.com` |
| `password` | `Ab123456!` |

#### Admin

| Name | Value     |
| :-------- | :------- |
| `email` | `user@mail.com` |
| `password` | `Ab123456!` |

## Flow or Diagram

<p align="center" width="100%">
    <img width="33%" src="https://raw.githubusercontent.com/syauqiahmd/coding-test-loginAPI/main/illustration.png"> 
</p>


## Endpoints :

List of available endpoints:

- `POST /login`
- `POST /users`
- `GET /users`
- `GET /users/:id`
- `PUT /users/:id`
- `DELETE /users/:id`

&nbsp;
## 1. POST /login
#### Description
- login to get token

#### Request
- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - Ok)_

```json
{
	"access_token": "string"
}
```

_Response (401 - Invalid Login)_

```json
{
	"message": "error invalid email or password"
}
```

&nbsp;


## 2. POST /users
#### Description
- Create a new user

#### Request
- headers:

```json
{
  "access_token": "string"
}
```
- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
}
```

_Response (200 - Created)_

```json
{
  "acknowledged": true,
  "insertedId": "63a1bf1883b28cfbff23079a"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "username is required"
}
OR
{
  "message": "email is required"
}
OR
{
  "message": "invalid email format"
}
OR
{
  "message": "password is required"
}
OR
{
  "message": "Should contain at least a capital letter, a small letter, a number, and a special character"
}
OR
{
  "message": "role is required"
}
OR
{
  "message": "role must be user or admin "
}
OR
{
  "message": "email must be unique"
}
```

&nbsp;
## 3. GET /users
#### Description
- get all users data

#### Request
- headers:

```json
{
  "access_token": "string"
}
```


_Response (200 - OK)_

```json
[ 
  {
    "_id": "639ff9ae3e773fba3af15b64",
    "username": "ahmad",
    "email": "user@mail.com",
    "role": "user"
  },
  {
    "_id": "639ff9d23e773fba3af15b65",
    "username": "ahmad",
    "email": "admin@mail.com",
    "role": "admin"
  }
]
```


&nbsp;
## 4. POST /users/:id
#### Description
- get user by id

#### Request
- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - Created)_

```json

  {
    "_id": "63a1bf1883b28cfbff23079a",
    "username": "usernamesaya",
    "email": "testingmail@mail.com",
    "role": "user"
  }
```

_Response (404 - Not Found)_

```json
{
  "message": "data not found"
}
```

&nbsp;
## 5. PUT /users/:id
#### Description
- update users data

#### Request
- headers:

```json
{
  "access_token": "string"
}
```
- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
}
```

_Response (200 - ok)_

```json
{
  "message": "update success"
}
```
_Response (404 - Not Found)_

```json
{
  "message": "data not found"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "username is required"
}
OR
{
  "message": "email is required"
}
OR
{
  "message": "invalid email format"
}
OR
{
  "message": "password is required"
}
OR
{
  "message": "Should contain at least a capital letter, a small letter, a number, and a special character"
}
OR
{
  "message": "role is required"
}
OR
{
  "message": "role must be user or admin "
}
OR
{
  "message": "email must be unique"
}
```

&nbsp;
## 6. DELETE /users/:id
#### Description
- Delete user data

#### Request
- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - Ok)_

```json
{
  "message": "deleted success"
}
```

_Response (404 - not found)_

```json
{
  "message": "data not found"
}
```

&nbsp;

## Global Error

_Response (401 - invalid token)_

```json
{
  "message": "Invalid Token"
}
```
_Response (403 - forbidden)_

```json
{
  "message": "you are not authorize"
}
```
_Response (500 - internal server error)_

```json
{
  "message": "internal server error"
}
```
