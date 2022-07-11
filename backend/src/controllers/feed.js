const fetchFeed = require('../services/feed');

const feed = async (req, res, next) => {
  try {
    const query = req.query;
    const { items } = await fetchFeed(query);

    res.status(200).json({
      images: items,
    });
  } catch (e) {
    res.json({ err: e.toString() });
    next();
  }
};

module.exports = feed;
