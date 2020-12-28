'use strict';

/** @typedef {import('@adonisjs/ally/src/Ally')} Ally */
/** @typedef {import('@adonisjs/auth/src/Auth')} Auth */

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
class LoginController {

  /**
   * POST login
   *
   * @param {object} ctx
   * @param {Ally} ctx.ally
   * @param {Auth} ctx.auth
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async login({ally, auth, request, response}) {
    try {
      const {login_source, id_token} = request.all();
      let user = null;
      if (login_source == 'facebook') {
        user = await ally.driver('facebook').getUserByToken(id_token);
      } else if (login_source == 'google') {
        const Env = use('Env');

        const {OAuth2Client} = require('google-auth-library');
        const client = new OAuth2Client(Env.get('GOOGLE_CLIENT_ID'));
        const ticket = await client.verifyIdToken({
          idToken: id_token,
          audience: Env.get('GOOGLE_CLIENT_ID')
        });
        const payload = ticket.getPayload();
        user = payload
      } else {
        throw new Error('Not a driver');
      }

      const User = use('App/Models/User');
      const userDetails = {
        name: user.name || user.getName(),
        avatar: user.picture || user.getAvatar() || null,
        email: user.email || user.getEmail() || null,
        source_id: user.sub || user.getId(),
        login_source: login_source
      };

      const whereClause = {
        source_id: userDetails.source_id,
        login_source: login_source
      };

      const userDB = await User.findOrCreate(whereClause, userDetails);
      if (userDB.email !== userDetails.email) {
        userDB.email = userDetails.email;
        await userDB.save();
      }
      const data = await auth.generate(userDB);
      return response.status(200).send(data);
    } catch (error) {
      return response.status(400).send();
    }
  }

  /**
   * GET me
   *
   * @param {object} ctx
   * @param {Auth} ctx.auth
   * @param {Response} ctx.response
   */
  async me({auth, response}) {
    try {
      const user = await auth.getUser()
      await user.load('answers')
      return response.status(200).send(user)
    } catch (error) {
      return response.status(400).send()
    }
  }
}

module.exports = LoginController
