const axios = require('axios');
const app = require('./app');

const port = process.env.PORT || 8000;
app.get('/api/*', (req, res) => {
  const url = req.url.replace(/^\/api/, '');
  axios({
    method: req.method,
    url: `https://api.deezer.com${url}`,
  })
    .then(({ data }) => {
      if (data.error) {
        return res.status(400).json(data.error);
      }
      res.json(data);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});
