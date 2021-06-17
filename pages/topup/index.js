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

  const currentBalance = await axios.axiosApiIntances
    .get(`transaction/balance/${data.user}`)
    .then((res) => {
      return res.data.data[0]
    })
    .catch((err) => {
      return 'err'
    })
    

  let formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  })

  const user = await axios.axiosApiIntances
    .get(`user/${+data.user + 1}`)
    .then((res) => {
      return res.data.data[0]
    })
    .catch((err) => {
      return {}
    })

  const balance = await axios.axiosApiIntances
    .get(`transaction/balance/${+data.user + 1}`)
    .then((res) => {
      console.log(`res === ${res.data}`)
      let temp = res.data.data.toString()
      if (temp.toString() === '-1') {
        temp = 0
      } 
      let result = formatter.format(temp)
 
      return result
    })
    .catch((err) => {
      return formatter.format('0')
    })

    return {
      props: {
        user,
        balance,
      }
    }
}

export default function Home(props) {
  const router = useRouter()
  const balance = props.balance
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

  // const handleUpdate = () => {
  //   const formData = new FormData()
  //   formData.append('name', name),
  //   formData.append('phone', phone)
  //   if (image) {
  //     formData.append('image', image)
  //   }
  //   axios.axiosApiIntances
  //     .patch(`user/update-profile/${id}`, formData)
  //     .then((res) => {
  //       setAlert([true, res.data.msg])
  //       setTimeout(() => {
  //         setAlert([false, ''])
  //       }, 3000)
  //       setUser(res.data.data)
  //     })
  //     .catch ((err) => {
  //       setAlert([true, err.response.data.msg])
  //       setTimeout(() => {
  //         setUserImage(`${process.env.IMGURL}${user.user_image}`)
  //         setAlert([false, ''])
  //       }, 3000)
  //     })
  // }

  return (
    <Layout title="Top Up">
    <Navbar user={props.user}/>
    <div className={`${Styles.container} container-fluid`}>
      <div class="row">
        <div className={`${Styles.left} col-md-3`}>
          <Sidenav />
        </div>
        <div className={`${Styles.right} col-md-9`}>
          <div className={`${Styles.profileContainer}`}>
            Current Balance
            <div>{balance}
            </div>

            <input 
              className={`${Styles.menuAmount} form-control`}
              type="text"
              placeholder="Input Top Up Amount"
              // value={amount}
              onChange={(event) => {
                setPhone(event.target.value)
              }}
            />

            {alert[0] ? (
              <div className="alert alert-warning" role="alert">{alert[1]}</div>
            ) : ('') }
            <div className={`${Styles.updateButton} row`}
              // onClick={handleUpdate}
            >Top Up
            </div>


          </div>
        </div>
      </div>
    </div>
    </Layout>
  )
}
