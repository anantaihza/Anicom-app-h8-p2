# AniCom API Documentation

<!-- https://gc01-server.anantair.my.id/ -->

## Endpoints:

List of Endpoints:

#### User

| Method | Endpoint         | Documentation         |
| ------ | ---------------- | --------------------- |
| Post   | /login           | [Here](#login)        |
| Post   | /google-login    | [Here](#google-login) |
| Post   | /register        | [Here](#register)     |
| Patch  | /user/me/upgrade | [Here](#user-upgrade) |

#### Open AI

| Method | Endpoint | Documentation    |
| ------ | -------- | ---------------- |
| Post   | /open-ai | [Here](#open-ai) |

#### Payment

| Method | Endpoint          | Documentation             |
| ------ | ----------------- | ------------------------- |
| Get    | /payment/midtrans | [Here](#payment-midtrans) |

#### Anime List

| Method | Endpoint                                    | Documentation                        |
| ------ | ------------------------------------------- | ------------------------------------ |
| Get    | /anime-list `Authentication`                | [Here](#anime-list)                  |
| Get    | /anime-list/:id `Authentication`            | [Here](#anime-list-detail)           |
| Get    | /anime-list/characters `Authentication`     | [Here](#anime-list-character)        |
| Get    | /anime-list/:id/characters `Authentication` | [Here](#anime-list-character-detail) |
| Get    | /anime-list/:id/statistics `Authentication` | [Here](#anime-list-statistics)       |

#### Subscribe

| Method | Endpoint                                     | Documentation                   |
| ------ | -------------------------------------------- | ------------------------------- |
| Get    | /subscribe `Authentication`                  | [Here](#get-subscribe)          |
| Post   | /subscribe `Authentication`                  | [Here](#post-subscribe)         |
| Delete | /subscribe/:id `Authentication`              | [Here](#delete-subscribe)       |
| Patch  | /subscribe/:id `Authentication`              | [Here](#watched-subscribe)      |
| Patch  | /subscribe/:id/up-vote `Authentication`      | [Here](#up-vote-subscribe)      |
| Patch  | /subscribe/:id/neutral-vote `Authentication` | [Here](#neutral-vote-subscribe) |
| Patch  | /subscribe/:id/down-vote `Authentication`    | [Here](#down-vote-subscribe)    |

#### Profile

| Method | Endpoint                  | Documentation        |
| ------ | ------------------------- | -------------------- |
| Get    | /profile `Authentication` | [Here](#get-profile) |
| Put    | /profile `Authentication` | [Here](#put-profile) |

## API Reference

---

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

## Google Login

```http
  POST /google-login
```

#### Header:

```json
{
  "google_token": "string"
}
```

#### Response (200 - OK):

```json
{ "access_token": "string" }
```

#### Response (400 - Bad Request):

```json
{
  "message": "Your email is already registered in the system, please login via non-Google"
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
  "id": 5,
  "fullName": "user7",
  "email": "user7@mail.com"
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

## User Upgrade

```http
  PATCH /user/me/upgrade
```

#### Body:

| Key       | Type      |          |
| :-------- | :-------- | :------- |
| `orderId` | `Integer` | Required |

#### Header:

```json
{
  "access_token": "string"
}
```

#### Response (200 - OK):

```json
{ "message": "Upgrade Success" }
```

#### Response (404 - Not Found):

```json
{
  "message": "Data not found"
}
```

#### Response (400 - Bad Request):

```json
{
  "message": "You already premium"
}
OR
{
  "message": "Order already paid"
}
OR
{
  "message": "Upgrade Failed"
}
```

---

## Open AI

```http
  POST /open-ai
```

#### Header:

```json
{
  "access_token": "string"
}
```

#### Body:

| Key       | Type     |          |
| :-------- | :------- | :------- |
| `emotion` | `string` | Required |

#### Response (200 - OK):

```json
[
    {
        "mal_id": Integer,
        "score": Float,
        "status": String,
        "title": String,
        "episodes": Integer,
        "synopsis": String
    },
    ...
]
```

---

## Payment Midtrans

```http
  GET /payment/midtrans
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
    "message": String,
    "transactionToken": String,
    "orderId": Integer
}
```

---

## Anime List

```http
  GET /anime-list
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
  "data": [
    {
      "mal_id": 0,
      "url": "string",
      "images": {
        "jpg": {
          "image_url": "string",
          "small_image_url": "string",
          "large_image_url": "string"
        },
        "webp": {
          "image_url": "string",
          "small_image_url": "string",
          "large_image_url": "string"
        }
      },
      "trailer": {
        "youtube_id": "string",
        "url": "string",
        "embed_url": "string"
      },
      "approved": true,
      "titles": [
        {
          "type": "string",
          "title": "string"
        }
      ],
      "title": "string",
      "title_english": "string",
      "title_japanese": "string",
      "title_synonyms": ["string"],
      "type": "TV",
      "source": "string",
      "episodes": 0,
      "status": "Finished Airing",
      "airing": true,
      "aired": {
        "from": "string",
        "to": "string",
        "prop": {
          "from": {
            "day": 0,
            "month": 0,
            "year": 0
          },
          "to": {
            "day": 0,
            "month": 0,
            "year": 0
          },
          "string": "string"
        }
      },
      "duration": "string",
      "rating": "G - All Ages",
      "score": 0,
      "scored_by": 0,
      "rank": 0,
      "popularity": 0,
      "members": 0,
      "favorites": 0,
      "synopsis": "string",
      "background": "string",
      "season": "summer",
      "year": 0,
      "broadcast": {
        "day": "string",
        "time": "string",
        "timezone": "string",
        "string": "string"
      },
      "producers": [
        {
          "mal_id": 0,
          "type": "string",
          "name": "string",
          "url": "string"
        }
      ],
      "licensors": [
        {
          "mal_id": 0,
          "type": "string",
          "name": "string",
          "url": "string"
        }
      ],
      "studios": [
        {
          "mal_id": 0,
          "type": "string",
          "name": "string",
          "url": "string"
        }
      ],
      "genres": [
        {
          "mal_id": 0,
          "type": "string",
          "name": "string",
          "url": "string"
        }
      ],
      "explicit_genres": [
        {
          "mal_id": 0,
          "type": "string",
          "name": "string",
          "url": "string"
        }
      ],
      "themes": [
        {
          "mal_id": 0,
          "type": "string",
          "name": "string",
          "url": "string"
        }
      ],
      "demographics": [
        {
          "mal_id": 0,
          "type": "string",
          "name": "string",
          "url": "string"
        }
      ]
    }
  ],
  "pagination": {
    "last_visible_page": 0,
    "has_next_page": true,
    "items": {
      "count": 0,
      "total": 0,
      "per_page": 0
    }
  }
}
```

---

## Anime List Detail

```http
  GET /anime-list/:id
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
  "data": {
    "mal_id": 0,
    "url": "string",
    "images": {
      "jpg": {
        "image_url": "string",
        "small_image_url": "string",
        "large_image_url": "string"
      },
      "webp": {
        "image_url": "string",
        "small_image_url": "string",
        "large_image_url": "string"
      }
    },
    "trailer": {
      "youtube_id": "string",
      "url": "string",
      "embed_url": "string"
    },
    "approved": true,
    "titles": [
      {
        "type": "string",
        "title": "string"
      }
    ],
    "title": "string",
    "title_english": "string",
    "title_japanese": "string",
    "title_synonyms": ["string"],
    "type": "TV",
    "source": "string",
    "episodes": 0,
    "status": "Finished Airing",
    "airing": true,
    "aired": {
      "from": "string",
      "to": "string",
      "prop": {
        "from": {
          "day": 0,
          "month": 0,
          "year": 0
        },
        "to": {
          "day": 0,
          "month": 0,
          "year": 0
        },
        "string": "string"
      }
    },
    "duration": "string",
    "rating": "G - All Ages",
    "score": 0,
    "scored_by": 0,
    "rank": 0,
    "popularity": 0,
    "members": 0,
    "favorites": 0,
    "synopsis": "string",
    "background": "string",
    "season": "summer",
    "year": 0,
    "broadcast": {
      "day": "string",
      "time": "string",
      "timezone": "string",
      "string": "string"
    },
    "producers": [
      {
        "mal_id": 0,
        "type": "string",
        "name": "string",
        "url": "string"
      }
    ],
    "licensors": [
      {
        "mal_id": 0,
        "type": "string",
        "name": "string",
        "url": "string"
      }
    ],
    "studios": [
      {
        "mal_id": 0,
        "type": "string",
        "name": "string",
        "url": "string"
      }
    ],
    "genres": [
      {
        "mal_id": 0,
        "type": "string",
        "name": "string",
        "url": "string"
      }
    ],
    "explicit_genres": [
      {
        "mal_id": 0,
        "type": "string",
        "name": "string",
        "url": "string"
      }
    ],
    "themes": [
      {
        "mal_id": 0,
        "type": "string",
        "name": "string",
        "url": "string"
      }
    ],
    "demographics": [
      {
        "mal_id": 0,
        "type": "string",
        "name": "string",
        "url": "string"
      }
    ]
  }
}
```

---

## Anime List Character

```http
  GET /anime-list/characters
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
  "data": [
    {
      "mal_id": 0,
      "url": "string",
      "images": {
        "jpg": {
          "image_url": "string",
          "small_image_url": "string"
        },
        "webp": {
          "image_url": "string",
          "small_image_url": "string"
        }
      },
      "name": "string",
      "name_kanji": "string",
      "nicknames": ["string"],
      "favorites": 0,
      "about": "string"
    }
  ],
  "pagination": {
    "last_visible_page": 0,
    "has_next_page": true,
    "items": {
      "count": 0,
      "total": 0,
      "per_page": 0
    }
  }
}
```

---

## Anime List Character Detail

```http
  GET /anime-list/:id/characters
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
  "data": [
    {
      "character": {
        "mal_id": 0,
        "url": "string",
        "images": {
          "jpg": {
            "image_url": "string",
            "small_image_url": "string"
          },
          "webp": {
            "image_url": "string",
            "small_image_url": "string"
          }
        },
        "name": "string"
      },
      "role": "string",
      "voice_actors": [
        {
          "person": {
            "mal_id": 0,
            "url": "string",
            "images": {
              "jpg": {
                "image_url": "string"
              }
            },
            "name": "string"
          },
          "language": "string"
        }
      ]
    }
  ]
}
```

---

## Anime List Statistic

```http
  GET /anime-list/:id/statistics
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
  "data": {
    "watching": 0,
    "completed": 0,
    "on_hold": 0,
    "dropped": 0,
    "plan_to_watch": 0,
    "total": 0,
    "scores": [
      {
        "score": 0,
        "votes": 0,
        "percentage": 0
      }
    ]
  }
}
```

---

## Get Subscribe

```http
  GET /subscribe
```

#### Header:

```json
{
  "access_token": "string"
}
```

#### Response (200 - OK):

```json
[
    {
        "id": Integer,
        "mal_id": Integer,
        "imageUrl": String,
        "title": String,
        "episodes": Integer,
        "status": String,
        "score": Float,
        "studios": String,
        "synopsis": String,
        "createdAt": Date,
        "updatedAt": Date,
        "Subscribe": {
            "id": Integer,
            "UserId": Integer,
            "AnimeId": Integer,
            "watched": Boolean,
            "voteType": Integer,
            "createdAt": Date,
            "updatedAt": Date
        }
    },
    ...
]

```

---

## Post Subscribe

```http
  POST /subscribe
```

#### Header:

```json
{
  "access_token": "string"
}
```

#### Body:

| Key      | Type      | Type     |
| :------- | :-------- | :------- |
| `mal_id` | `Integer` | Required |

#### Response (201 - Created):

```json
{
    "message": String,
    "result": {
        "id": Integer,
        "UserId": Integer,
        "AnimeId": Integer,
        "updatedAt": Date,
        "createdAt": Date,
        "watched": Boolean,
        "voteType": Integer
    }
}

```

#### Response (500 - Internal Server Error):

```json
{
  "message": "Request failed with status code 404"
}
```

---

## Delete Subscribe

```http
  DELETE /subscribe
```

#### Header:

```json
{
  "access_token": "string"
}
```

#### Params:

| Key  | Type      | Type     |
| :--- | :-------- | :------- |
| `id` | `Integer` | Required |

#### Response (200 - OK):

```json
{
  "message": "Success to delete Subscribe"
}
```

#### Response (404 - Not Found):

```json
{
  "message": "Data not found"
}
```

---

## Watched Subscribe

```http
  PATCH /subscribe/:id
```

#### Header:

```json
{
  "access_token": "string"
}
```

#### Params:

| Key  | Type      | Type     |
| :--- | :-------- | :------- |
| `id` | `Integer` | Required |

#### Response (200 - OK):

```json
{
  "message": "Success to update status"
}
```

#### Response (404 - Not Found):

```json
{
  "message": "Data not found"
}
```

---

## Up Vote Subscribe

```http
  PATCH /subscribe/:id/up-vote
```

#### Header:

```json
{
  "access_token": "string"
}
```

#### Params:

| Key  | Type      | Type     |
| :--- | :-------- | :------- |
| `id` | `Integer` | Required |

#### Response (200 - OK):

```json
{
  "message": "Success to up vote"
}
```

#### Response (404 - Not Found):

```json
{
  "message": "Data not found"
}
```

---

## Neutral Vote Subscribe

```http
  PATCH /subscribe/:id/neutral-vote
```

#### Header:

```json
{
  "access_token": "string"
}
```

#### Params:

| Key  | Type      | Type     |
| :--- | :-------- | :------- |
| `id` | `Integer` | Required |

#### Response (200 - OK):

```json
{
  "message": "Success to neutral vote"
}
```

#### Response (404 - Not Found):

```json
{
  "message": "Data not found"
}
```

---

## Down Vote Subscribe

```http
  PATCH /subscribe/:id/down-vote
```

#### Header:

```json
{
  "access_token": "string"
}
```

#### Params:

| Key  | Type      | Type     |
| :--- | :-------- | :------- |
| `id` | `Integer` | Required |

#### Response (200 - OK):

```json
{
  "message": "Success to down vote"
}
```

#### Response (404 - Not Found):

```json
{
  "message": "Data not found"
}
```

---

## Get Profile

```http
  GET /profile
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
    "id": Integer,
    "fullName": String,
    "email": String,
    "subscription": String,
    "imageUrl": String
}

```

---

## Put Profile

```http
  Put /profile
```

#### Header:

```json
{
  "access_token": "string"
}
```

#### Body (Form Data):

| Key        | Type     |
| :--------- | :------- |
| `fullName` | `string` |
| `imageUrl` | `File`   |

#### Response (200 - OK):

```json
{
  "message": "Success to update Profile"
}
```

---

## Global Error

#### Response (401 - Unauthorized):

```json
{
  "message": "Invalid Token"
}
```

#### Response (500 - Internal Server Error):

```json
{
  "message": "Internal server error"
}
```
