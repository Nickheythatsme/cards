import app from './src';

console.log(`ENV: ${app.config.production ? 'PROD' : 'DEV'}`);
app.listen(app.config.port, () => console.log(`Listening on http://${app.config.host}:${app.config.port}`));
