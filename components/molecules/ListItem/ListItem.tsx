import { ReactNode } from 'react'
import classes from './list-item.module.css'
import Link from 'next/link';

export interface IListItemProps {
  name: string;
  icon: ReactNode
  route: string;
  active: boolean;
}

export default function ListItem(props: IListItemProps) {
  const getListItemClass = (): string => {
    if (props.active) {
      return `${classes['list-item']} ${classes['active']}` 
    }

    return `${classes['list-item']}` 
  }

  return (
    <Link href={props.route} className={getListItemClass()}>
      <div className={classes['list-item-icon']}>{props.icon}</div>
      <div className={classes['list-item-title']}>{props.name}</div>
    </Link>
  )
}