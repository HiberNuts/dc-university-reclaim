'use strict';

/**
 * cohert service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::cohert.cohert');
