import { MdOutlineFilterList } from "react-icons/md";

import Search from '@/components/atoms/inputs/Search/Search'
import classes from './filter.module.css'

export default function Filter() {
  return (
    <div className={classes.wrapper}>
      <Search />

      <MdOutlineFilterList size={24} />
    </div>
  )
}