import { useRouter } from 'next/router'
import axios from 'utils/axios'
import Cookie from 'js-cookie'
import Styles from 'styles/SideNav.module.css'


export default function Sidenav() {
  const router = useRouter()

  const toDashBoard = () => {
    router.push('/')
  }

  const handleProfile = () => {
    router.push('/profile')
  }

  const toTopUp = () => {
    router.push('/topup')
  }

  const handleLogout = () => {
    axios.setToken('')
    Cookie.remove('token')
    Cookie.remove('user')
    router.push('/signin')
  }

  return (
    <div className={`${Styles.container} container-fluid`}>
      
      <div className={`${Styles.menus} row`}
        onClick={toDashBoard}
      >
        <div className={`${Styles.icons} col-sm-3`}>
          <i class="bi bi-grid"></i>
        </div>
        <div class="col">
          Dashboard
        </div>
      </div>

      <div className={`${Styles.menus} row`}
      onClick={toTopUp}>
        <div className={`${Styles.icons} col-sm-3`}>
          <i class="bi bi-arrow-up"></i>
        </div>
        <div class="col">
          Top Up
        </div>
      </div>

      <div className={`${Styles.menus} row`}
      onClick={handleProfile}>
        <div className={`${Styles.icons} col-sm-3`}>
          <i class="bi bi-person"></i>
        </div>
        <div class="col">
          Profile
        </div>
      </div>

      <div className={`${Styles.menuLogout} row`}
        onClick={handleLogout}
      >
        <div className={`${Styles.icons} col-sm-3`}>
          <i class="bi bi-box-arrow-right"></i>
        </div>
        <div class="col">
          Logout
        </div>
      </div>

    </div>
  )
}