import { MdSupervisorAccount } from "react-icons/md";

import { IRoute } from "./core/types";

const ROUTES: IRoute[] = [
  {
    name: 'Usuários',
    icon: <MdSupervisorAccount size={24} />,
    path: '/users',
  }
]

export default ROUTES;