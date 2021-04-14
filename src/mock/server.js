import { createServer, Model, Factory } from 'miragejs';
import { Consolidations } from './consolidation';
import { Conversions } from './conversion';
import { Offers } from './offer';

export function startMocking() {
  createServer({
    models: {
      consolidation: Model,
      conversion: Model,
      offer: Model,
    },
    factories: {
      consolidation: Factory.extend(Consolidations.factory),
      conversion: Factory.extend(Conversions.factory),
      offer: Factory.extend(Offers.factory),
    },
    seeds(server) {
      server.createList('consolidation', 20);
      server.createList('conversion', 20);
      server.createList('offer', 20);
    },
    routes() {
      this.get('/consolidations', Consolidations.all);
      this.get('/consolidations/previews', Conversions.all);
      this.post('/consolidations', Consolidations.store);
      this.get('/consolidations/:id/conversions', Conversions.all);
      this.get('/consolidations/:id/summary', Consolidations.summary);
      this.get('/consolidations/:id', Consolidations.one);
      this.put('/consolidations/:id', Consolidations.update);

      this.passthrough();
      this.passthrough(process.env.VUE_APP_IAM_URL);
    },
  });
}
