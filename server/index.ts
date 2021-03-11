import app from './app';
import {logger} from './logger';

const port = process.env.PORT || 9000;

app.listen(port, () => {
    logger.info(`App is running on http://localhost:${port}`);
});
