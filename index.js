const express = require('express');
const { Worker } = require('worker_threads');

const app = express();

app.get('/find', (req, res) => {
  const worker = new Worker('./worker1.js');

  worker.on('message', (msg) => {
    if (msg.progress) {
      console.log(`Exported ${msg.progress}% of data`);
    }

    if (msg.done) {
      console.log('Data exported to Excel successfully!');
      res.send('Data exported to Excel successfully!');
      worker.terminate();
    }
  });

  worker.on('error', (err) => {
    console.error(err);
    res.status(500).send('An error occurred while exporting data to Excel!');
    worker.terminate();
  });

  worker.postMessage({ cmd: 'start', chunks: [500] });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
