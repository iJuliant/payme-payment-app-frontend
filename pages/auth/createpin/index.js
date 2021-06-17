import { useState } from 'react'
import { useRouter } from 'next/router'
import { authPage } from 'middleware/AuthorizationPage'
import axios from 'utils/axios'
import Cookie from 'js-cookie'
import Layout from 'components/Layout'
import Styles from 'styles/Auth.module.css'

export async function getServerSideProps(context) {
  await authPage(context)

  return { props: {} }
}

export default function createPIN(props) {
  const router = useRouter()
  const [pin1, set1] = useState('')
  const [pin2, set2] = useState('')
  const [pin3, set3] = useState('')
  const [pin4, set4] = useState('')
  const [pin5, set5] = useState('')
  const [pin6, set6] = useState('')
  const [alert, setAlert] = useState([false, ''])

  const handleCreatePIN = (event) => {
    event.preventDefault()
    const setPin = pin1 + pin2 + pin3 + pin4 + pin5 + pin6
    axios.setToken(Cookie.get('token'))

    axios.axiosApiIntances
      .patch('user/update-pin', {
        pin: setPin
      })
      .then((res) => {
        setAlert([true, res.data.msg])
        setTimeout(() => {
          setAlert([false, ''])
          router.push('/')
        }, 2000)
      })
      .catch((error) => {
        set1('')
        set2('')
        set3('')
        set4('')
        set5('')
        set6('')

        setAlert([true, error.response.data.msg])
        setTimeout(() => {
          setAlert([false, ''])
        }, 2000)
       })
  }

  return (
    <Layout title='Sign up'>
      <div className={`${Styles.container} container-fluid`}>
        <div className='row'>
          <div className={`${Styles.left} col-7`}>
            <div className={`${Styles.appName}`}>
              payme
            </div>
            <div>
              <img src="https://i.ibb.co/FXxztNv/phone.png"
              className={`${Styles.phone}`} />
            </div>
            <div className={`${Styles.subHeading}`}>
              App that convering banking needs.
            </div>
            <div>
              Payme is an application that focussing in banking needs
              for all users in the world. Always updated and allways
              following world trends. 5000+ users registered in payme
              everyday with worldwide users coverage.
            </div>
          </div>
          {/* ====== */}
          <div className={`${Styles.right} col`}>
            <div className={`${Styles.formHeading}`}>
              Secure Your Account, Your Wallet, and Your Data With 6
              Digits PIN That You Created Yourself
            </div>
            <div className={`${Styles.formSubHeading}`}>
              Create 6 digits pin to secure all your money and your data
              in payme app. Keep it secret and don't tell anyone about your
              payme account password and the PIN.
            </div>
            <div className={`${Styles.pinContainer}`}>
              <form
              onSubmit={handleCreatePIN}>
                <div className={`${Styles.pinField} form-group`}>
                  <input type="text" 
                    className={`${Styles.customPinBox} form-control`}
                    id="exampleInputEmail1"
                    maxLength="1"
                    value={pin1}
                    onChange={(event) => {
                      set1(event.target.value)
                    }}
                    required />
                  <input type="text" 
                    className={`${Styles.customPinBox} form-control`}
                    id="exampleInputEmail1"
                    maxLength="1"
                    value={pin2}
                    onChange={(event) => {
                      set2(event.target.value)
                    }}
                    required />
                  <input type="text" 
                    className={`${Styles.customPinBox} form-control`}                    
                    id="exampleInputEmail1"
                    maxLength="1"
                    value={pin3}
                    onChange={(event) => {
                      set3(event.target.value)
                    }}
                    required />
                  <input type="text" 
                    className={`${Styles.customPinBox} form-control`}                    
                    id="exampleInputEmail1"
                    maxLength="1"
                    value={pin4}
                    onChange={(event) => {
                      set4(event.target.value)
                    }}
                    required />
                  <input type="text" 
                    className={`${Styles.customPinBox} form-control`}
                    id="exampleInputEmail1"
                    maxLength="1"
                    value={pin5}
                    onChange={(event) => {
                      set5(event.target.value)
                    }}
                    required />
                  <input type="text" 
                    className={`${Styles.customPinBox} form-control`}                    
                    id="exampleInputEmail1"
                    maxLength="1"
                    value={pin6}
                    onChange={(event) => {
                      set6(event.target.value)
                    }}
                    required />
                </div>
                <div>
                  {alert[0] 
                    ? (<div className="alert alert-warning text-center m-3"
                      role="alert">{alert[1]}</div>)
                    : ( '' )}
                </div>
                <button type="submit" className={`${Styles.button} "btn btn-primary"`}>Confirm</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )

}