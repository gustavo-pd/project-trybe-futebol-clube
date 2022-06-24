import { Application as App } from 'express';

const Routes = (app: App) => {
  app.get('/', (_req, res) => res.status(200).json('Sucesso'));
};

export default Routes;
