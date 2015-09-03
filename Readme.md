
# bare-auth-google

  Google authentication with [Bare Auth](https://github.com/lapwinglabs/bare-auth).

## Installation

```
npm install bare-auth-google
```

## Setup

##### 1. Create an App

Go to: https://cloud.google.com/console/project to get started

##### 2. Add a valid Redirect URI

- Go to: https://console.developers.google.com/project/{{APP}}/apiui/credential
- Add a redirect URL with the following format: `{{ORIGIN}}/auth/`. Example: `http://localhost:7000/auth/` or `https://app.finbox.io/auth`

> **Important:** Don't forget to add the trailing slash as part of the valid redirect URI. Facebook will fail silently and you won't know why.

## Setup the client-side

```js
var Google = require('google-bare-auth');
var google = Google({
  url: 'http://auth.example.com'
  client_id: google_client_id,
  scope: ['profile']
})

google(function(err, profile) {
  if (err) throw err;
  console.log(profile);
});
```

> **Important:** `url` points to the domain of your auth server (example server-side below). The routing will be set up for you

##### 4. Setup the server-side (example uses Express)

```js
var Google = require('google-bare-auth');
var bodyParser = require('body-parser');
var express = require('express');
var cors = require('cors');

var app = module.exports = express();

app.use(cors());
app.use(bodyParser.json());

app.use(Google({
  client_secret: client_secret
  // optionally include a 'sign' function to add support for JWT
}));

app.listen(5000);
```

## License

MIT

Copyright (c) 2015 Matthew Mueller &lt;matt@lapwinglabs.com&gt;
