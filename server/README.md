# AniCom API Documentation

<!-- https://gc01-server.anantair.my.id/ -->

## Endpoints:

List of Endpoints:

#### User

| Method | Endpoint  | Documentation     |
| ------ | --------- | ----------------- |
| Post   | /login    | [Here](#login)    |
| Post   | /register | [Here](#register) |

#### Anime List

| Method | Endpoint                                        | Documentation                     |
| ------ | ----------------------------------------------- | --------------------------------- |
| Get    | /anime-list `Authentication`                      | [Here](#anime-list)            |
| Get    | /anime-list/:id `Authentication`                      | [Here](#anime-list-detail)            |
| Get    | /anime-list/characters `Authentication`                      | [Here](#anime-list-character)            |

















#### Products

| Method | Endpoint                                        | Documentation                     |
| ------ | ----------------------------------------------- | --------------------------------- |
| Get    | /Products `Authentication`                      | [Here](#data-products)            |
| Post   | /Products `Authentication`                      | [Here](#add-data-products)        |
| Get    | /Products/:id `Authentication`                  | [Here](#detail-data-products)     |
| Put    | /Products/:id `Authentication`, `Authorization` | [Here](#edit-data-products)       |
| Patch  | /Products/:id `Authentication`, `Authorization` | [Here](#edit-photo-data-products) |
| Delete | /Products/:id `Authentication`, `Authorization` | [Here](#delete-data-products)     |

#### Categories

| Method | Endpoint                        | Documentation              |
| ------ | ------------------------------- | -------------------------- |
| Get    | /categories `Authentication`    | [Here](#data-categories)   |
| Post   | /categories `Authentication`    | [Here](#add-categories)    |
| Put    | /categories:id `Authentication` | [Here](#update-categories) |
| Delete | /categories:id `Authentication` | [Here](#delete-categories) |



## API Reference

## Login

```http
  POST /login
```

#### Body:

| Key        | Type     |          |
| :--------- | :------- | :------- |
| `email`    | `string` | Required |
| `password` | `string` | Required |

#### Response (200 - OK):

```json
{ "access_token": "string" }
```

#### Response (400 - CredentialsRequired):

```json
{
  "message": "Email / Password is Required"
}
```

#### Response (401 - Unauthorized):

```json
{
  "message": "Invalid Email / Password"
}
```

---

## Register

```http
  POST /register
```

#### Body:

| Key        | Type     |          |
| :--------- | :------- | :------- |
| `fullName` | `string` | Required |
| `email`    | `string` | Required |
| `password` | `string` | Required |

#### Header:

```json
{
  "access_token": "string"
}
```

#### Response (201 - created):

```json
{
  "id": "integer",
  "username": "string",
  "email": "string"
}
```

#### Response (400 - Bad Request):

```json
  "message": [
    "Email is already used"
  ]
   OR
  "message": [
    "Full name is required",
    "Email is required",
    "Password is required"
  ]
```



































---

## Public Products

```http
  GET /pub/products
```

#### Response (200 - OK):

```json
  {
    "page": 1,
    "data": [
      {
        "id": "integer",
        "name": "string",
        "description": "string",
        "price": "integet",
        "stock": "integer",
        "imgUrl": "string",
        "categoryId": "integer",
        "authorId": "integer",
        "createdAt": "date",
        "updatedAt": "date"
      },
      ...
    ],
    "totalData": "integer",
    "totalPage": "integer",
    "dataPerPage": "integer"
  }
```

---

## Public Detail Product

```http
  GET /pub/products/:id
```

#### Params:

```json
{
  "id": "integer (required)"
}
```

#### Response (200 - Ok):

```json
{
  "product": {
    "id": "integer",
    "name": "string",
    "description": "string",
    "price": "integer",
    "stock": "integer",
    "imgUrl": "string",
    "categoryId": "integer",
    "authorId": "integer",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

#### Response (404 - NotFound):

```json
{
  "message": "Data Not Found"
}
```

---

## Public Categories

```http
  GET /pub/categories
```

#### Response (200 - Ok):

```json
  {
    "categories": [
      {
        "id": 1,
        "name": "Bedroom",
        "createdAt": "2024-07-22T14:11:25.391Z",
        "updatedAt": "2024-07-22T14:11:25.391Z"
      },
  }
```

---

## Data Products

```http
  GET /products
```

#### Header:

```json
{
  "access_token": "string"
}
```

#### Response (200 - OK):

```json
  {
    "products": [
        {
            "id": "integer",
            "name": "string",
            "description": "string",
            "price": "integer",
            "stock": "integer",
            "imgUrl": "string",
            "categoryId": "integer",
            "authorId": "integer",
            "createdAt": "date",
            "updatedAt": "date",
            "User": {
                "id": "integer",
                "username": "string",
                "email": "string",
                "role": "string",
                "phoneNumber": "string",
                "address": "string"
            }
        },

        ...
    ]
  }
```

---

## Add Data Products

```http
  POST /products
```

#### Header:

```json
{
  "access_token": "string"
}
```

#### Body:

| Key           | Type      | Type     |
| :------------ | :-------- | :------- |
| `name`        | `string`  | Required |
| `description` | `string`  | Required |
| `price`       | `integer` | Required |
| `stock`       | `integer` | Required |
| `imgUrl`      | `string`  | Required |
| `categoryId`  | `integer` | Required |

#### Response (201 - Created):

```json
{
  "name": "string",
  "description": "string",
  "price": "integer",
  "stock": "integer",
  "imgUrl": "string",
  "categoryId": "integer",
  "authorId": "integer"
}
```

#### Response (400 - Bad Request):

```json
  "message": [
    "Name is required",
    "Description is required",
    "Price is required",
    "CategoryId is required"
  ]
```

---

## Detail Data Products

```http
  GET /products/:id
```

#### Header:

```json
{
  "access_token": "string"
}
```

#### Params:

```json
{
  "id": "integer (required)"
}
```

#### Response (200 - OK):

```json
{
  "product": {
    "id": "integer",
    "name": "string",
    "description": "string",
    "price": "integer",
    "stock": "integer",
    "imgUrl": "string",
    "categoryId": "integer",
    "authorId": "integer",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

#### Response (404 - NotFound):

```json
{
  "message": "Data Not Found"
}
```

---

## Edit Data Products

```http
  PUT /products/:id
```

#### Header:

```json
{
  "access_token": "string"
}
```

#### Params:

```json
{
  "id": "integer (required)"
}
```

#### Body:

| Key           | Type      | Type     |
| :------------ | :-------- | :------- |
| `name`        | `string`  | Required |
| `description` | `string`  | Required |
| `price`       | `integer` | Required |
| `stock`       | `integer` | Required |
| `imgUrl`      | `string`  | Required |
| `categoryId`  | `integer` | Required |

#### Response (200 - OK):

```json
{
  "product": {
    "id": "integer",
    "name": "string",
    "description": "string",
    "price": "integer",
    "stock": "integer",
    "imgUrl": "string",
    "categoryId": "integer",
    "authorId": "integer",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

#### Response (400 - Bad Request):

```json
  "message": [
    "Name is required",
    "Description is required",
    "Price is required",
    "CategoryId is required"
  ]
```

#### Response (404 - NotFound):

```json
{
  "message": "Data Not Found"
}
```

#### Response (403 - Forbidden):

```json
{
  "message": "Forbidden"
}
```

---

## Edit Photo Data Products

```http
  PATCH /products/:id
```

#### Header:

```json
{
  "access_token": "string"
}
```

#### Params:

```json
{
  "id": "integer (required)"
}
```

#### Body:

| Key      | Type   |
| :------- | :----- |
| `imgUrl` | `file` |

#### Response (200 - OK):

```json
{
  "message": "Image Product success to update"
}
```

#### Response (403 - Forbidden):

```json
{
  "message": "Forbidden"
}
```

---

## Delete Data Products

```http
  DELETE /products/:id
```

#### Header:

```json
{
  "access_token": "string"
}
```

#### Params:

```json
{
  "id": "integer (required)"
}
```

#### Response (200 - OK):

```json
{
  "message": "Selimut tetangga success to delete"
}
```

#### Response (404 - NotFound):

```json
{
  "message": "Data Not Found"
}
```

#### Response (403 - Forbidden):

```json
{
  "message": "Forbidden"
}
```

---

## Data Categories

```http
  GET /categories
```

#### Header:

```json
{
  "access_token": "string"
}
```

#### Response (200 - OK):

```json
  {
    "categories": [
      {
          "id": "integer",
          "name": "string",
          "createdAt": "date",
          "updatedAt": "date"
      },
      {
          "id": "integer",
          "name": "string",
          "createdAt": "date",
          "updatedAt": "date"
      },
      ...
    ]
  }
```

---

## Add Categories

```http
  POST /categories
```

#### Header:

```json
{
  "access_token": "string"
}
```

#### Body:

| Key    | Type     |          |
| :----- | :------- | :------- |
| `name` | `string` | Required |

#### Response (201 - Created):

```json
{
  "category": "string"
}
```

#### Response (400 - Bad Request):

```json
  "message": [
    "Name is required"
  ]
```

---

## Update Categories

```http
  PUT /categories/:id
```

#### Header:

```json
{
  "access_token": "string"
}
```

#### Params:

```json
{
  "id": "integer (required)"
}
```

#### Body:

| Key    | Type     |          |
| :----- | :------- | :------- |
| `name` | `string` | Required |

#### Response (200 - OK):

```json
{
  "category": {
    "id": 3,
    "name": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

#### Response (404 - NotFound):

```json
{
  "message": "Data Not Found"
}
```

#### Response (400 - Bad Request):

```json
  "message": [
    "Name is required"
  ]
```

---

## Delete Categories

```http
  DELETE /categories/:id
```

#### Header:

```json
{
  "access_token": "string"
}
```

#### Params:

```json
{
  "id": "integer (required)"
}
```

#### Response (200 - OK):

```json
{
  "message": "Living Room success to delete"
}
```

#### Response (404 - NotFound):

```json
{
  "message": "Data Not Found"
}
```

---

## Global Error

#### Response (401 - Unauthorized):

```json
{
  "message": "Unauthorized"
}
```

#### Response (500 - Internal Server Error):

```json
{
  "message": "Internal server error"
}
```
