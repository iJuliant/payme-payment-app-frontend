import Head from 'next/head'
import Image from 'next/image'
import Layout from 'components/Layout'
import Navbar from 'components/Navbar'
import Sidenav from 'components/SideNav'
import Styles from 'styles/ChangePassword.module.css'

export default function Home() {
  return (
    <Layout title="Profile">
    <Navbar />
    <div className={`${Styles.container} container-fluid`}>
      <div class="row">
        <div className={`${Styles.left} col-md-3`}>
          <Sidenav />
        </div>
        <div className={`${Styles.right} col-md-9`}>
          <div className={`${Styles.profileContainer}`}>
            <div>
              <img src="https://pbs.twimg.com/profile_images/1151521266559541248/d9x0sAZJ_400x400.jpg" className={Styles.profileImg} />
              <div className={`${Styles.edit}`}><i class="bi bi-pencil"></i> Edit</div>
            </div>

            <div className={`${Styles.menus} row`}>
              <div class="col">
                Personal Information
              </div>
              <div className={`${Styles.arrow} col-sm-3`}>
                <i class="bi bi-arrow-right"></i>
              </div>              
            </div>

            <div className={`${Styles.menus} row`}>
              <div class="col">
                Change Password
              </div>
              <div className={`${Styles.arrow} col`}>
                <i class="bi bi-arrow-right"></i>
              </div>              
            </div>

            <div className={`${Styles.menus} row`}>
              <div class="col">
                Change PIN
              </div>
              <div className={`${Styles.arrow} col`}>
                <i class="bi bi-arrow-right"></i>
              </div>              
            </div>

            <div className={`${Styles.menuLogout} row`}>
              <div class="col">
                Logout
              </div>
              <div className={`${Styles.arrow} col`}>
                <i class="bi bi-arrow-right"></i>
              </div>              
            </div>

          </div>
        </div>
      </div>
    </div>
    </Layout>
  )
}
