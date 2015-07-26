/**
 * Module Dependencies
 */

var Google = require('google-oauth-agent');

/**
 * Export `google`
 */

module.exports = google;

/**
 * Google authentication middleware
 *
 * @param {Object} options
 * @return {Function}
 */

function google(options) {
  return function (req, res, next) {
    if (req.method != 'POST' || req.path != '/auth/google') {
      return next();
    }

    var body = req.body;
    var sign = options.sign;

    Google({
      code: body.code,
      client_id: body.client_id,
      client_secret: options.client_secret,
      redirect_uri: body.redirect_uri,
    }, function(err, profile) {
      if (err) return res.status(500).send({ error: err.message });
      sign ? res.send(sign(profile)) : res.send(profile);
    })
  }
}
