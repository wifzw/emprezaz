import { ReactNode } from 'react'
import classes from './list-item.module.css'

export interface IListItemProps {
  name: string;
  icon: ReactNode
  route: string;
}

export default function ListItem(props: IListItemProps) {
  return (
    <div className={`${classes['list-item']} ${classes['list-item']}`}>
      <div className={classes['list-item-icon']}>{props.icon}</div>
      <div className={classes['list-item-title']}>{props.name}</div>
    </div>
  )
}