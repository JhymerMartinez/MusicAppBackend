const axios = require('axios');
const cors = require('cors');
const app = require('./app');
const logger = require('./logger');

const port = process.env.PORT || 8000;

app.use(cors());

app.get('/api/*', (req, res) => {
  logger.info(`Received a ${req.method} request for ${req.url}`);
  const url = req.url.replace(/^\/api/, '');
  axios({
    method: req.method,
    url: `https://api.deezercdcd.com${url}`,
  })
    .then(({ data }) => {
      if (data.error) {
        logger.error(`Error from Deezer API: ${data.error}`);
        return res.status(400).json(data.error);
      }
      res.json(data);
    })
    .catch((err) => {
      logger.error(err);
      return res.status(err.status || 500).send(err);
    });
});

app.listen(port, () => {
  logger.info(`Server is running on port ${port}!`);
});
