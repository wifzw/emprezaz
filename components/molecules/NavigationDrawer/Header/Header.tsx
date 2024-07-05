import Image from 'next/image'

import classes from './header.module.css'

export default function Header() {
  return (
    <div className={classes.logo}>
      <Image 
        width={244} 
        height={97}
        src="/assets/logo.png"
        alt='Logo'
        quality={100}
        priority
      />
    </div>
  )
}