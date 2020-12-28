'use strict'

/** @typedef {import('@adonisjs/auth/src/Auth')} Auth */
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {import('@adonisjs/lucid/src/Database')} */
const Database = use('Database');

class LocationController {

  /**
   * POST locations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async find({request, response}) {
    try {
      const params = request.all();
      const result = await Database.raw(`SELECT ST_X(coordinates) as lng, ST_Y(coordinates) as lat
      FROM locations
      WHERE ST_Intersects(st_geomfromtext('POLYGON((
        ${params._southWest.lng} ${params._northEast.lat},
        ${params._northEast.lng} ${params._northEast.lat},
        ${params._northEast.lng} ${params._southWest.lat},
        ${params._southWest.lng} ${params._southWest.lat},
        ${params._southWest.lng} ${params._northEast.lat}))', 4326),locations.coordinates);`);
      return response.status(200).send(result.rows)
    } catch (error) {
      return response.status(400).send()
    }
  }

  /**
   * Create/save a new location.
   * POST locations
   *
   * @param {object} ctx
   * @param {Auth} ctx.auth
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({auth, request, response}) {
    try {
      const params = request.all();

      const user = await auth.getUser();
      await user.load('location');

      if (user.toJSON().location !== null) {
        await Database.raw(`update locations set
        coordinates = ST_SetSRID(ST_MakePoint(${params.coordinates[1]},${params.coordinates[0]}), 4326),
        updated_at = ${Database.fn.now()}
        where id = ${user.toJSON().location.id}`)
      } else {
        await Database.raw(`insert into locations(coordinates, user_id, created_at, updated_at)
              VALUES ((ST_SetSRID(ST_MakePoint(${params.coordinates[1]},${params.coordinates[0]}), 4326)),
              ${user.id}, ${Database.fn.now()}, ${Database.fn.now()})`)
      }
      return response.status(200).send()
    } catch (error) {
      return response.status(400).send(error)
    }
  }
}

module.exports = LocationController;
