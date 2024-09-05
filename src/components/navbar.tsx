import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { useNavigate } from 'react-router-dom'

import { Button } from './ui/button'

const Navbar = () => {
  const navigate = useNavigate()

  return (
    <nav className="sticky top-0 w-full h-[7vh] bg-primary flex justify-between items-center z-[100] px-10">
      <div></div>
      <NavigationMenu>
        <NavigationMenuList className="gap-5">
          <NavigationMenuItem>
            <Button variant={'outline'} onClick={() => navigate('/')}>
              Today's Sales
            </Button>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Button variant={'secondary'} onClick={() => navigate('/comp')}>
              Compare Sales
            </Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className=''>
      </div>
    </nav>
  )
}

export default Navbar
