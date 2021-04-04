import {Router} from 'express';

import {logger} from '../logger';

export abstract class CommonRouterConfig {
    router: Router;

    name: string;

    constructor(router: Router, name: string) {
        this.router = router;
        this.name = name;
        this.configureRoutes();

        logger.info(`${this.getName()} initialized`);
    }

    getName(): string {
        return this.name;
    }

    abstract configureRoutes(): Router;
}
