const passport      = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db            = require('./db');

passport.use(new GoogleStrategy({
  clientID:     process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL:  process.env.GOOGLE_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email     = profile.emails[0].value;
    const googleId  = profile.id;
    const name      = profile.displayName;
    const avatarUrl = profile.photos?.[0]?.value || null;

    // find existing
    const [rows] = await db.query('SELECT * FROM users WHERE google_id = ? OR email = ?', [googleId, email]);

    if (rows.length > 0) {
      const user = rows[0];
      // link google_id if signed up via email before
      if (!user.google_id) {
        await db.query('UPDATE users SET google_id = ?, avatar_url = COALESCE(avatar_url, ?) WHERE id = ?', [googleId, avatarUrl, user.id]);
      }
      return done(null, user);
    }

    // create new user
    const [result] = await db.query(
      'INSERT INTO users (name, email, google_id, avatar_url, is_verified) VALUES (?,?,?,?,1)',
      [name, email, googleId, avatarUrl]
    );
    const [newUser] = await db.query('SELECT * FROM users WHERE id = ?', [result.insertId]);
    return done(null, newUser[0]);
  } catch (err) {
    return done(err, null);
  }
}));

module.exports = passport;
