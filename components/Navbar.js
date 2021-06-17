import Styles from 'styles/Navbar.module.css'

export default function Navbar(props) {
  const userName = props.user.user_name
  const userPhone = props.user.user_phone
  const userImage = props.user.user_image

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div className={`${Styles.container} container-fluid`}>
          <a className={`${Styles.brand} navbar-brand`} href="#">Payme</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            </ul>
            {userImage ? (
              <img src={`${process.env.IMGURL}${userImage}`} className={Styles.profileImg} />
            ) : <img src="https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_960_720.png" className={Styles.profileImg} /> }
            {/* <img src="https://pbs.twimg.com/profile_images/1151521266559541248/d9x0sAZJ_400x400.jpg" className={Styles.profileImg} /> */}
            <div className={Styles.profileDetails}>
              <div>{userName}</div>
              <div>{userPhone}</div>
            </div>
            <div className={Styles.notification}>
              <i class="bi bi-bell"></i>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}