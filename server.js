// server.js
const express = require('express');
const appInsights = require('applicationinsights');

// Start Application Insights
appInsights.setup('ab10bc95-01f8-4de8-b4cd-af5beaf1ee08')
    .setAutoDependencyCorrelation(true)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true)
    .setAutoCollectExceptions(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectConsole(true)
    .setUseDiskRetryCaching(true)
    .start();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/error', (req, res) => {
    // Simulate an error
    throw new Error('This is a simulated error');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    appInsights.defaultClient.trackException({exception: err});
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});