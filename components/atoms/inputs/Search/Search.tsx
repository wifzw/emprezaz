import { IoMdSearch } from "react-icons/io";

import classes from './search.module.css'

export default function Search() {
  return (
    <div className={classes.wrapper}>
      <div className={classes['input-wrapper']}>
        <IoMdSearch className={classes.icon} size={20}/>
        <input type='search' placeholder='Buscar...' className={classes.search}/>
      </div>
    </div>
  )
}