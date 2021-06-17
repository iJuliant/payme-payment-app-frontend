import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'utils/axios'
import Cookie from 'js-cookie'
import Head from 'next/head'
import Image from 'next/image'
import Layout from 'components/Layout'
import Navbar from 'components/Navbar'
import Sidenav from 'components/SideNav'
import Styles from '../styles/HomePage.module.css'
import { authPage } from 'middleware/AuthorizationPage'

export async function getServerSideProps(context) {
  const data = await authPage(context)
  
  let formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  })

  const balance = await axios.axiosApiIntances
    .get(`transaction/balance/${+data.user + 1}`)
    .then((res) => {
 
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
      balance,
      data,
      user
    }
  }
}

export default function Home(props) {
  const id = Cookie.get("user")
  const balance = props.balance
  const user = props.user.user_name
  const userPhone = props.user.user_phone

  return (
    <>
    <Navbar user={props.user}/>
    <div className={`${Styles.container} container-fluid`}>
      <div class="row">
        <div className={`${Styles.left} col-md-3`}>
          <Sidenav />
        </div>
        <div className={`${Styles.right} col-md-9`}>
          <div className={`${Styles.balance} row`}>
            <div class="col-sm-9">
              <div>{user}</div>
              <div className={Styles.balanceInfo}>{balance}</div>
              <div>{userPhone}</div>
            </div>
            <div class="col-sm-3">
              <div>
                <button type="button" className={`${Styles.button} btn btn-light`}>Top Up</button>
              </div>
              <div>
                <button type="button" className={`${Styles.button} btn btn-light`}>Transfer</button>              
              </div>
            </div>
          </div>
          <div class="row">
            <div className={`${Styles.chart} col`}>
              Coming Soon
            </div>
            <div className={`${Styles.history} col`}>
              History
              <div>
                Make a transaction first
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
