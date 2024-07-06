import { MdFullscreen } from "react-icons/md";

import classes from './app-bar.module.css'

export default function AppBar() {
  return (
    <header className={classes.header}>
      <div className={classes.info}></div>

      <div className={classes.action}>
        <MdFullscreen size={24} />

        <div className={classes.avatar}></div>
      </div>
    </header>
  )
}