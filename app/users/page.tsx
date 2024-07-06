import Toolbar from "@/components/modules/users/Toolbar/Toolbar";
import classes from "./page.module.css";
import UserDataTable from "@/components/modules/users/DataTable/UserDataTable";

export default function Home() {
  return (
    <div className={classes.wrapper}>
      <Toolbar />
      <UserDataTable />
    </div>
  );
}
