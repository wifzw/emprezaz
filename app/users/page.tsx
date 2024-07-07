import classes from './page.module.css';
import db from '@/server/db';
import UsersNoData from '@/components/modules/users/organisms/NoData/UsersNoData';
import Wrapper from '@/components/modules/users/template/Wrapper';

export default async function Home() {
  const users = await db.user.findMany({ orderBy: { created_at: 'desc' } });

  return (
    <div className={classes.wrapper}>
      {!!users.length && <Wrapper users={users} />}
      {!users.length && <UsersNoData />}
    </div>
  );
}
