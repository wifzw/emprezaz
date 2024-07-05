import { IoReload } from "react-icons/io5";
import { MdFullscreen } from "react-icons/md";

import classes from './app-bar.module.css'

export default function AppBar() {
  return (
    <header className={classes.header}>
      <div className={classes.info}>
        <p>Kauan Motta</p>
      </div>

      <div className={classes.action}>
        <IoReload size={24} />
        <MdFullscreen size={24} />
      </div>
    </header>
  )
}