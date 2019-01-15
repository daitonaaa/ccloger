import url from './urls';

import Layout from 'components/Layout';

import {
  Monitoring,
} from 'components/pages';

const routes = [
  {
    component: Layout,
    routes: [
      {
        ...url.monitoring,
        component: Monitoring,
        title: 'Monitoring | Logger service'
      }
    ]
  }
];

export default routes;