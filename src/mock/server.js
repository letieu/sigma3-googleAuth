import { createServer, Model, Factory } from 'miragejs';
import { Consolidations } from './consolidation';
import { Conversions } from './conversion';

export function startMocking() {
  createServer({
    models: {
      consolidation: Model,
      conversion: Model,
    },
    factories: {
      consolidation: Factory.extend(Consolidations.factory),
      conversion: Factory.extend(Conversions.factory),
    },
    seeds(server) {
      server.createList('consolidation', 20);
      server.createList('conversion', 20);
    },
    routes() {
      this.get('/consolidations', Consolidations.all);
      this.post('/consolidations', Consolidations.store);
      this.get('/consolidations/:id/conversions', Conversions.all);
      this.get('/consolidations/:id', Consolidations.one);

      this.passthrough();
      this.passthrough(process.env.VUE_APP_IAM_URL);
    },
  });
}
