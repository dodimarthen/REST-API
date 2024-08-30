# User API Spec

## Register User API

Endpoint : POST /api/users

Request Body :

```JSON
{
"username" : "kkk",
"password" : "rahasia",
"name" : "john doe"
}
```

Response Body Success :

```JSON
{
  "data" : {
    "username" : "kkk",
    "name" : "john doe"
  }
}
```

Response Body Error :

````JSON
{
  "errors" : "username already registered"
}```
````

## Login User API

Endpoint : POST /api/users/login

Request Body :

```JSON
{
  "username" : "john doe",
  "password" : "rahasia"
}
```

Response Body Success:

```json
{
  "data": {
    "token": "unique-token"
  }
}
```

Response Body Error:

```json
{
  "errors": "username or password wrong"
}
```

## Update User API

Endpoint : PATCH /api/users/current

Headers :

- Authorization : token

Request Body:

```json
{
  "name": "john doe",
  "password": "new password"
}
```

Response Body Success:

```json
{
  "data": {
    "username": "kkk",
    "name": "john doe"
  }
}
```

Response Body Error:

```json
{
  "errors": "Name Length max 100"
}
```

## Get User API

Headers:

- Authorization : token

Endpoint : GET /api/users/current

Response Body Success:

```json
{
  "data": {
    "username": "kkk",
    "name": "john doe"
  }
}
```

Response Body Error:

```json
{
  "errors": "Unauthorized"
}
```

## Logout User API

Endpoint : DELETE /api/users/logout

Headers:

- Authorization : token

Response Body Success:

```json
{
  "data": "OK"
}
```

Response Body Error:

```json
{
  "errors": "Unauthorized"
}
```
