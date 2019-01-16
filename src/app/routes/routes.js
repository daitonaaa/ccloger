import url from './urls';

import Layout from 'components/Layout';

import {
  Calls,
  Monitoring,
} from 'components/pages';

const routes = [
  {
    component: Layout,
    routes: [
      {
        ...url.monitoring,
        component: Monitoring,
        title: 'Мониторинг'
      },
      {
        ...url.calls,
        component: Calls,
        title: 'Звонки и телефония'
      }
    ]
  }
];

export default routes;