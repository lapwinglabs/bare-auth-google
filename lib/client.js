/**
 * Module Dependencies
 */

var Google = require('google-oauth-agent');
var superagent = require('superagent');
var assign = require('object-assign');
var location = document.location;

/**
 * Export `google`
 */

module.exports = google;

/**
 * Default Redirect URL
 *
 * This is what you would put into the "Authorized redirect URIs" in:
 * - https://console.developers.google.com/project/{{APP}}/apiui/credential
 */

/**
 * Defaults
 */

var defaults = {
  redirect_uri: location.href
};

/**
 * Google
 */

function google(options) {
  return function _google(fn) {
    options = assign(defaults, options);
    Google(options, function(err, code) {
      if (err) return fn(err);

      var obj = assign({
        code: code,
        client_id: options.client_id,
        client_secret: options.client_secret,
        redirect_uri: options.redirect_uri
      })

      superagent.post(options.url + '/auth/google')
        .send(obj)
        .end(function(err, res) {
          if (err) return fn(err);
          return fn(null, res.body || res.text);
        });
    })
  }
}
