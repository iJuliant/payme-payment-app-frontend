import { useState } from 'react'
import { useRouter } from 'next/router'
import { unauthPage } from 'middleware/AuthorizationPage'
import axios from 'utils/axios'
import Layout from 'components/Layout'
import Styles from 'styles/Auth.module.css'

export async function getServerSideProps(context) {
  await unauthPage(context)

  return { props: {} }
}

export default function Signup() {
  const router = useRouter()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  })
  const [showAlert, setShowAlert] = useState([false, ''])
  
  const toLogin = () => {
    router.push('/signin')
  }

  const handleSignup = (event) => {
    event.preventDefault() //prevent reloading per submit.
    axios.axiosApiIntances
      .post('auth/register', {
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        phone: form.phone,
        password: form.password
      })
      .then((res) => {
        setShowAlert([true, res.data.msg])
        setTimeout(() => {
          setShowAlert([false, ''])
          router.push('/signin')
        }, 3000)
      })
      .catch((error) => {
        setShowAlert([true, 'Email already registered'])
        setTimeout(() => {
          setShowAlert([false, ''])
        }, 3000)
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
              Start Accessing Banking Needs With All Devices
              and All Platforms With 30.000+ Users.
            </div>
            <div className={`${Styles.formSubHeading}`}>
              Transfering money is easier than ever. You can
              access payme wherever you are. Desktop, Laptop,
              Mobile phone? We got you covered!.
            </div>
          
            <form className={`${Styles.formContainer}`}
              onSubmit={handleSignup}
            >
            <div className={`${Styles.inputGroup} mb-3 row`}>
                <div className={`${Styles.icons} col-sm-1`}>
                  <i class="bi bi-person"></i>
                </div>
                <div className="col">
                  <input type="text"
                    className={`${Styles.customInputBox} form-control`}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Write your first name"
                    required
                    onChange={(event) => {
                      setForm({
                        ...form,
                        ...{ firstName: event.target.value }
                      })
                    }}
                  />
                </div>
              </div>

              <div className={`${Styles.inputGroup} mb-3 row`}>
                <div className={`${Styles.icons} col-sm-1`}>
                  <i class="bi bi-person"></i>
                </div>
                <div className="col">
                  <input type="text"
                    className={`${Styles.customInputBox} form-control`}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Write your last name"
                    required
                    onChange={(event) => {
                      setForm({
                        ...form,
                        ...{ lastName: event.target.value }
                      })
                    }}
                  />
                </div>
              </div>

              <div className={`${Styles.inputGroup} mb-3 row`}>
                <div className={`${Styles.icons} col-sm-1`}>
                  <i class="bi bi-envelope"></i>
                </div>
                <div className="col">
                  <input type="email"
                    className={`${Styles.customInputBox} form-control`}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Write your email here"
                    onChange={(event) => {
                      setForm({
                        ...form,
                        ...{ email: event.target.value }
                      })
                    }}
                    required
                  />
                </div>
              </div>

              <div className={`${Styles.inputGroup} mb-3 row`}>
                <div className={`${Styles.icons} col-sm-1`}>
                  <i class="bi bi-phone"></i>
                </div>
                <div className="col">
                  <input type="number"
                    className={`${Styles.customInputBox} form-control`}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Write your phone number"
                    required
                    onChange={(event) => {
                      setForm({
                        ...form,
                        ...{ phone: event.target.value }
                      })
                    }}
                  />
                </div>
              </div>

              <div className={`${Styles.inputGroup} mb-3 row`}>
                <div className={`${Styles.icons} col-sm-1`}>
                <i class="bi bi-key"></i>
                </div>
                <div className="col">
                  <input type="password"
                    className={`${Styles.customInputBox} form-control`}
                    id="exampleInputPassword1"
                    placeholder="Create your password"
                    required
                    onChange={(event) => {
                      setForm({
                        ...form,
                        ...{ password: event.target.value }
                      })
                    }}
                  />
                </div>
              </div>

            <div>
            {showAlert[0] ? (
                <div className="alert alert-warning text-center" role="alert">
                  {showAlert[1]}
                </div>) : (
                  ""
                )
              }
            </div>

              <div className={`${Styles.inputGroupButton} mb-3 row`}>
                <button type="submit"
                className={`${Styles.button} btn btn-primary`}>
                  Sign Up
                </button>
              </div>
            </form>

            <div className={Styles.haveAccount}
              onClick={toLogin}>
              Already have account? Let's Login!
            </div>
          
          </div>
        </div>
      </div>
    </Layout>
  )

}