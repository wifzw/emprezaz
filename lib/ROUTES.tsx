import { MdSupervisorAccount } from 'react-icons/md';
import { RxDashboard } from 'react-icons/rx';

import { IRoute } from './types';

const ROUTES: IRoute[] = [
  {
    name: 'Dashboard',
    icon: <RxDashboard size={20} />,
    path: '/',
  },
  {
    name: 'Usuários',
    icon: <MdSupervisorAccount size={20} />,
    path: '/users',
  },
];

export default ROUTES;
