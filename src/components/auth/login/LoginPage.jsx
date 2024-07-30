import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Card, CardBody, Input } from '@nextui-org/react'
import { FaEye } from 'react-icons/fa'
import { AiFillSun, AiFillMoon } from 'react-icons/ai'
import { FaEyeSlash } from 'react-icons/fa'

import Resume from '../../../assets/svg/Resume-amico.svg'
import DarkLogo from '../../../assets/images/full_logo_white.png'
import LightLogo from '../../../assets/images/full_logo_blue.png'

import styles from './LoginPage.module.scss'

const LoginPage = ({ toggleTheme, isDarkMode }) => {
  const navigate = useNavigate()

  const [isVisible, setIsVisible] = useState(false)

  const handleLogin = () => {
    // Need to change when using a real backend
    // localStorage.setItem('isAuthenticated', true)
    navigate('/')
  }

  return (
    <div className={`${styles.loginPage}`}>
      <div className={styles.pageContainer}>
        <div className="flex flex-col">
          <div className={`${styles.logo}`}>
            <img alt="Francium logo" src={isDarkMode ? DarkLogo : LightLogo} />
          </div>

          <div className={styles.loginContainer}>
            <div className={styles.loginCard}>
              <Card className={styles.card}>
                <div className={styles.header}>
                  <h1 className="text-2xl font-semibold ">LOGIN</h1>
                  {!isDarkMode ? <AiFillMoon onClick={toggleTheme} /> : <AiFillSun onClick={toggleTheme} />}
                </div>

                <CardBody className={styles.cardBody}>
                  <form className="space-y-6">
                    <div className="flex w-full flex-wrap md:flex-nowrap md:mb-0 gap-4 mb-2 mt-0">
                      <Input
                        type="email"
                        label="Email"
                        variant="bordered"
                        labelPlacement="inside"
                        fullWidth
                        size="md"
                        isRequired
                      />
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap md:mb-0 gap-4 mb-2 mt-0">
                      <Input
                        label="Password"
                        variant="bordered"
                        size="md"
                        labelPlacement="inside"
                        fullWidth
                        isRequired
                        endContent={
                          <button
                            className="focus:outline-none"
                            type="button"
                            onClick={() => {
                              setIsVisible(!isVisible)
                            }}
                          >
                            {isVisible ? <FaEye /> : <FaEyeSlash />}
                          </button>
                        }
                        type={isVisible ? 'text' : 'password'}
                      />
                    </div>
                    <div className="pt-4">
                      <Button type="submit" onClick={handleLogin} className={`w-full ${styles.loginBtn}`} size="md">
                        SIGN IN
                      </Button>
                    </div>
                  </form>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
        <div className={`${styles.illustration}`}>
          <img alt="Login Illustration" src={Resume} />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
