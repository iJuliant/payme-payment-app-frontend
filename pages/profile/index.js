import Head from 'next/head'
import Image from 'next/image'
import Layout from 'components/Layout'
import Navbar from 'components/Navbar'
import Sidenav from 'components/SideNav'
import Styles from 'styles/Profile.module.css'
import { authPage } from 'middleware/AuthorizationPage'
import axios from 'utils/axios'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router'
import { useState } from 'react'

export async function getServerSideProps(context) {
  const data = await authPage(context)

  const user = await axios.axiosApiIntances
    .get(`user/${data.user}`)
    .then((res) => {
      return res.data.data[0]
    })
    .catch((err) => {
      return 'err'
    })

    return {
      props: {
        user
      }
    }
}

export default function Home(props) {
  const router = useRouter()
  const id = Cookie.get('user')
  const token = Cookie.get('token')
  const [user, setUser] = useState(props.user)
  const [userImage, setUserImage] = useState(
    `${process.env.IMGURL}${user.user_image}`
  )
  const [image, setImage] = useState(null)
  const [name, setName] = useState(user.user_name)
  const [phone, setPhone] = useState(user.user_phone)
  const [alert, setAlert] = useState([false, ''])

  const toTopUp = () => {
    router.push('/topup')
  }

  const handleImage = (event) => {
    if (event.target.files[0]) {
      setUserImage(URL.createObjectURL(event.target.files[0]))
      setImage(event.target.files[0])
    } else {
      setUserImage(`${process.env.IMGURL}${props.user.user_image}`)
      setImage(null)
    }
  }

  const handleUpdate = () => {
    const formData = new FormData()
    formData.append('name', name),
    formData.append('phone', phone)
    if (image) {
      formData.append('image', image)
    }
    axios.axiosApiIntances
      .patch(`user/update-profile/${id}`, formData)
      .then((res) => {
        setAlert([true, res.data.msg])
        setTimeout(() => {
          setAlert([false, ''])
        }, 3000)
        setUser(res.data.data)
      })
      .catch ((err) => {
        setAlert([true, err.response.data.msg])
        setTimeout(() => {
          setUserImage(`${process.env.IMGURL}${user.user_image}`)
          setAlert([false, ''])
        }, 3000)
      })
  }

  return (
    <Layout title="Profile">
    <Navbar user={props.user}/>
    <div className={`${Styles.container} container-fluid`}>
      <div class="row">
        <div className={`${Styles.left} col-md-3`}>
          <Sidenav />
        </div>
        <div className={`${Styles.right} col-md-9`}>
          <div className={`${Styles.profileContainer}`}>
            <div>
              {userImage !== process.env.IMGURL ? (
                <img src={userImage} className={Styles.profileImg} />
              ) : (<img src="https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_960_720.png" className={Styles.profileImg} /> )
              }
              <input 
              className={`${Styles.menus} form-control`}
              type='file'
              id='formFile'
              onChange={(event) => {
                handleImage(event)
              }}
            />
            <input 
              className={`${Styles.menus} form-control`}
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(event) => {
                setName(event.target.value)
              }}
            />
            <input 
              className={`${Styles.menus} form-control`}
              type="text"
              placeholder="Enter phone number"
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value)
              }}
            />
            {alert[0] ? (
              <div className="alert alert-warning" role="alert">{alert[1]}</div>
            ) : ('') }
              {/* <div className={`${Styles.edit}`}><i class="bi bi-pencil"></i> Edit</div> */}
            </div>

            <div className={`${Styles.updateButton} row`}
              onClick={handleUpdate}
            >Update Data
            </div>

            <hr />

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
