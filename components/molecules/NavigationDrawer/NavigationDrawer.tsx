import classes from './navigation-drawer.module.css'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import ROUTES from '@/lib/ROUTES'
import ListItem from '../ListItem/ListItem'

export default function NavigationDrawer() {
  return (
    <aside className={classes.aside}>
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <Header />

          <div className="divider"></div>

          {ROUTES.map(route => (
            <ListItem 
              key={route.name} 
              name={route.name} 
              icon={route.icon} 
              route={route.path} 
            />
          ))}
        </div>

        <Footer />
      </div>
    </aside>
  )
}