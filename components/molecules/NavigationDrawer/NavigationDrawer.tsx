'use client';

import classes from './navigation-drawer.module.css'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import ROUTES from '@/lib/ROUTES'
import ListItem from '../ListItem/ListItem'
import { usePathname } from 'next/navigation';

export default function NavigationDrawer() {

  const pathname = usePathname();


  return (
    <aside className={classes.aside}>
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <Header />

          {ROUTES.map(route => (
            <ListItem 
              key={route.name} 
              name={route.name} 
              icon={route.icon} 
              route={route.path} 
              active={route.path === pathname}
            />
          ))}
        </div>

        <Footer />
      </div>
    </aside>
  )
}