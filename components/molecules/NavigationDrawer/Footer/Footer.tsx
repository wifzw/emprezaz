import { MdOutlineLogout } from "react-icons/md";
import { TiAdjustBrightness } from "react-icons/ti";

import classes from './footer.module.css'

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <div style={{ display: 'flex', alignItems: 'center' }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}>
        <TiAdjustBrightness size={24} />
        <MdOutlineLogout size={24} />
      </div>
    </footer>
  )
}