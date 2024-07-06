import { ReactNode } from 'react'
import classes from './medium-button.module.css'

export interface IMediumButtonProps {
  children: ReactNode
}

export default function MediumButton(props: IMediumButtonProps) {
  const { children } = props

  return (
    <button className={classes.button}>
      {children}
    </button>
  )
}