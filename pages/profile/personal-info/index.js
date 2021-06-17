import Head from 'next/head'
import Image from 'next/image'
import Layout from 'components/Layout'
import Navbar from 'components/Navbar'
import Sidenav from 'components/SideNav'
import Styles from 'styles/PersonalInfo.module.css'

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
            <strong>Personal Information</strong><br/>
            <p style={{ color: "grey" }}>We got your personal information from your sign up process.
            If you want to make changes on your information, contact our
            support.</p>

            <div className={`${Styles.info} row`}>
              <div className={`${Styles.infoTitle}`}>First Name</div>
              <div className={`${Styles.infoContent}`}>Divock</div>
            </div>

            <div className={`${Styles.info} row`}>
              <div className={`${Styles.infoTitle}`}>Last Name</div>
              <div className={`${Styles.infoContent}`}>Origi</div>
            </div>

            <div className={`${Styles.info} row`}>
              <div className={`${Styles.infoTitle}`}>Verified e-mail</div>
              <div className={`${Styles.infoContent}`}>gmail@divockworld.com</div>
            </div>

            <div className={`${Styles.info} row`}>
              <div className={`${Styles.infoTitle}`}>Phone Number</div>
              <div className={`${Styles.infoContent}`}>+00 000 000</div>
              <div className={`${Styles.manage}`}>Manage</div>
            </div>

          </div>
        </div>
      </div>
    </div>
    </Layout>
  )
}
