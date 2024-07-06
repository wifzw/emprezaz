import { ReactNode } from 'react'
import classes from './icon-button.module.css'

export interface IconButtonProps {
  children: ReactNode
}

export default function IconButton(props: IconButtonProps) {
  const { children } = props

  return (
    <button type="button" className={classes.button}>
      {children}
    </button>
  )
}