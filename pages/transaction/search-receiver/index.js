import Head from 'next/head'
import Image from 'next/image'
import Layout from 'components/Layout'
import Navbar from 'components/Navbar'
import Sidenav from 'components/SideNav'
import Styles from 'styles/SearchReceiver.module.css'

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
          <div className={`${Styles.searchContainer}`}>
            <div>Search Receiver</div>
            <div>
              <input type="text"
                className={`${Styles.searchBox} form-control`}
                placeholder="🔎 Search receiver here"
                required
              />
            </div>

            <div className={`${Styles.receivers} row`}>
              <div className={`${Styles.receiverImg} col-sm-2`}>
                <img src="https://pbs.twimg.com/profile_images/1151521266559541248/d9x0sAZJ_400x400.jpg" className={Styles.profileImg} />
              </div>
              <div className={`${Styles.receiverDetail} col`}>
                <div className={`${Styles.receiverName} row`}>
                  Jack Sparrow
                </div>
                <div className={`${Styles.receiverPhone} row`}>
                  +00 001 001 001
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    </Layout>
  )
}
