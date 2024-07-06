import Toolbar from "@/components/modules/users/Toolbar/Toolbar";
import classes from "./page.module.css";
import UserDataTable from "@/components/modules/users/DataTable/UserDataTable";
import db from "@/server/db";

export default async function Home() {
  const users = await db.user.findMany({ orderBy: { created_at: 'desc'}})
  
  return (
    <div className={classes.wrapper}>
      <Toolbar />
      <UserDataTable users={users}/>
    </div>
  );
}
