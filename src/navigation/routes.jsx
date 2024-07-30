// create routes for the app
// React hooks and React Router
import { useEffect, useState } from 'react'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'

// Styles
import styles from './Routes.module.scss'

// Components
import LoginPage from '../components/auth/login/LoginPage'
import Dashboard from '../components/dashboard/Dashboard'
import SideNavbar from '../components/layout/SideNavbar'
import Messages from '../components/messages/Messages'
import Sidebar from '../components/calendar/Sidebar'
// import Jobs from '../components/jobs/Jobs'
// import Candidates from '../components/candidates/Candidates'
// import Referrals from '../components/referrals/Referrals'
// import CareerSite from '../components/careerSite/CareerSite'
// import Employees from '../components/employees/Employees'
// import Documents from '../components/documents/Documents'
// import Reports from '../components/reports/Reports'

const DEFAULT_THEME = JSON.parse(localStorage.getItem('isDarkMode')) || true

const Routes = () => {
  const [isDarkMode, setIsDarkMode] = useState(DEFAULT_THEME)

  const toggleTheme = () => setIsDarkMode(!isDarkMode)

  // store theme in local storage to persist theme on page reload or revisit later
  useEffect(() => {
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode))
  }, [isDarkMode])

  const LayoutComponent = ({ toggleTheme }) => {
    return (
      <section className={styles.layoutContainer}>
        <SideNavbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <section className={styles.contentContainer}>
          <Outlet /> {/* Nested routes render here */}
        </section>
      </section>
    )
  }

  const router = createBrowserRouter([
    {
      path: 'login',
      element: <LoginPage toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
    },
    {
      path: '/',
      element: <LayoutComponent toggleTheme={toggleTheme} />,
      children: [
        {
          index: true,
          element: <Dashboard />
        },
        {
          path: 'messages',
          element: <Messages />
        },
        {
          path: 'calendar',
          element: <Sidebar />
        },
        {
          path: 'jobs'
          // element: <Jobs />
        },
        {
          path: 'candidates'
          // element: <Candidates />
        },
        {
          path: 'referrals'
          // element: <Referrals />
        },
        {
          path: 'career-site'
          // element: <CareerSite />
        },
        {
          path: 'employees'
          // element: <Employees />
        },
        {
          path: 'documents'
          // element: <Documents />
        },
        {
          path: 'reports'
          // element: <Reports />
        }
      ]
    }
  ])

  return (
    <main className={isDarkMode ? 'dark text-foreground bg-background' : 'light text-foreground bg-background'}>
      <RouterProvider router={router} />
    </main>
  )
}

export default Routes
