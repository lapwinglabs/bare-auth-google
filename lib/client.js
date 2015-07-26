/**
 * Module Dependencies
 */

var Google = require('google-oauth-agent');
var superagent = require('superagent');
var assign = require('object-assign');

/**
 * Export `google`
 */

module.exports = google;

/**
 * Defaults
 */

var defaults = {
  redirect_uri: window.location.origin || window.location.protocol + '//' + window.location.host
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
