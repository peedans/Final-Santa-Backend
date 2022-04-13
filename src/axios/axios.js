const axios = require('axios').default;

const run = async () => {
  const client = axios.create({
    baseURL: 'http://localhost:7000',
  });

  const res = await client.get('/users/me/records');

  console.log(res.status);
  console.log(res.statusText);
  console.log(res.data);

  const postResponse = await client.post('/users/me/records', {
    activityName: 'Walking',
    timestamp: '2020-03-09T00:00:00.000Z',
    duration: 1000,
    calories: 200,
    description: '',
  });

  console.log(`Post response status ${postResponse.status}`);
  console.log(postResponse.data);

  // GET /users/me/records?activityName=Walking

  const getRes = await client.get('/users/me/records', { params: { activityName: 'Walking' } });

  console.log(getRes.status);
};

run()
  .then(() => {
    console.log('Done');
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });