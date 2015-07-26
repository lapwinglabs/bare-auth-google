
# bare-auth-google

  Google authentication with [Bare Auth](https://github.com/lapwinglabs/bare-auth).

## Usage

**client.js:**

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

**server.js (using express):**

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
