const axios = require('axios');
const qs = require('query-string');

const { URL, FORMAT } = require('../config');

const feed = async (query) => {
  try {
    const queryString =
      Object.keys({ ...query }).length > 0
        ? `&${qs.stringify({ ...query })}`
        : '';
    const { data } = await axios.get(`${URL}feeds/photos_public.gne?${FORMAT}${queryString}`);
    return JSON.parse(data
      .replace('jsonFlickrFeed', '')
      .replace(/^\(/g, '')
      .replace(/\)$/g, '')
      .replace(/\n/g, '')
      .replace(/\t/g, ''),
    );
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = feed;
