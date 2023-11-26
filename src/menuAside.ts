import {
  mdiAccountCircle,
  mdiMonitor,
  mdiGithub,
  mdiLock,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide,
  mdiResponsive,
  mdiPalette,
  mdiVuejs,
  mdiClipboardTextClockOutline,
  mdiFood,
  mdiAccountSupervisor,
  mdiTableChair,
  mdiBowlMixOutline,
  mdiNoodles,
} from '@mdi/js'
import { MenuAsideItem } from './interfaces'

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: mdiMonitor,
    label: 'Dashboard',
  },
  {
    href: '/pos',
    icon: mdiNoodles,
    label: 'POS',
  },
  {
    href: '/orders',
    icon: mdiBowlMixOutline,
    label: 'Orders',
  },
  {
      href:'/order-history',
      icon: mdiClipboardTextClockOutline,
      label:'Order History'
      
  },
  {
    href:'/add-menu',
    icon: mdiFood,
    label:'Add Menu'
    
},
{
  href:'/customer-list',
  icon: mdiAccountSupervisor,
  label:'Customer List'
  
},
{
  href:'/add-table',
  icon: mdiTableChair,
  label:'Add Table'
  
},
  // ,{
  //   href: '/tables',
  //   label: 'Tables',
  //   icon: mdiTable,
  // },
  // {
  //   href: '/forms',
  //   label: 'Forms',
  //   icon: mdiSquareEditOutline,
  // },
  // {
  //   href: '/ui',
  //   label: 'UI',
  //   icon: mdiTelevisionGuide,
  // },
  // {
  //   href: '/responsive',
  //   label: 'Responsive',
  //   icon: mdiResponsive,
  // },
  // {
  //   href: '/',
  //   label: 'Styles',
  //   icon: mdiPalette,
  // },
  // {
  //   href: '/profile',
  //   label: 'Profile',
  //   icon: mdiAccountCircle,
  // },
  // {
  //   href: '/login',
  //   label: 'Login',
  //   icon: mdiLock,
  // },
  // {
  //   href: '/error',
  //   label: 'Error',
  //   icon: mdiAlertCircle,
  // },
  // {
  //   label: 'Dropdown',
  //   icon: mdiViewList,
  //   menu: [
  //     {
  //       label: 'Item One',
  //     },
  //     {
  //       label: 'Item Two',
  //     },
  //   ],
  // },
  // {
  //   href: 'https://github.com/justboil/admin-one-react-tailwind',
  //   label: 'GitHub',
  //   icon: mdiGithub,
  //   target: '_blank',
  // },
  // {
  //   href: 'https://github.com/justboil/admin-one-vue-tailwind',
  //   label: 'Vue version 1',
  //   icon: mdiVuejs,
  //   target: '_blank',
  // },
]

export default menuAside
