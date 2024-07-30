// SideNavbar component

// React hooks and React Router
import { useState, useEffect, useMemo, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

// clsx library for conditional classes and Styles
import clsx from 'clsx'
import styles from './SideNavbar.module.scss'

// NextUI components
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Tooltip,
  User
} from '@nextui-org/react'

// React Icons
import { BiMoon, BiSun, BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { IoCloseOutline } from 'react-icons/io5'
import { FiSearch } from 'react-icons/fi'
import { MdDashboard, MdCalendarMonth, MdPeople } from 'react-icons/md'
import { LuMessagesSquare } from 'react-icons/lu'
import { FaPeoplePulling } from 'react-icons/fa6'
import { TbReportSearch } from 'react-icons/tb'
import { PiSuitcaseDuotone } from 'react-icons/pi'
import { IoDocumentAttachOutline } from 'react-icons/io5'

// Assets
import logoDark from '../../assets/images/full_logo_blue.png'
import logoLight from '../../assets/images/full_logo_white.png'
import logoIcon from '../../assets/images/logo_icon.png'

const MOBILE_BREAKPOINT = 728

const SideNavbar = ({ toggleTheme, isDarkMode }) => {
  const navigate = useNavigate()

  const [isCollapsed, setIsCollapsed] = useState(false)
  const [windowWidth, setWindowWidth] = useState(null)
  const sidebarRef = useRef(null)

  const logo = useMemo(() => {
    return isCollapsed ? logoIcon : isDarkMode ? logoLight : logoDark
  }, [isCollapsed, isDarkMode])

  const isMobileViewSidebarCollapsed = windowWidth < MOBILE_BREAKPOINT && isCollapsed

  const navLinkClass = ({ isActive }) => (isActive ? clsx(styles.navLink, styles.active) : styles.navLink)

  const logout = () => {
    // Need to change when using a real backend
    // localStorage.removeItem('isAuthenticated')

    navigate('/login')
  }

  useEffect(() => {
    // Need to change when using a real backend
    const isCollapsed = JSON.parse(localStorage.getItem('isCollapsed'))
    setIsCollapsed(isCollapsed)
  }, [])

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)

    const handleClickOutside = event => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && window.innerWidth < MOBILE_BREAKPOINT) {
        setIsCollapsed(true)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    window.addEventListener('resize', handleResize)

    setWindowWidth(window.innerWidth)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
    localStorage.setItem('isCollapsed', !isCollapsed)
  }

  const handleSearchClick = () => {
    setIsCollapsed(false)
    localStorage.setItem('isCollapsed', false)
  }

  const handleLogoClick = () => navigate('/')

  const navItems = [
    { to: '/', icon: MdDashboard, tooltip: 'Dashboard' },
    { to: '/messages', icon: LuMessagesSquare, tooltip: 'Messages' },
    { to: '/calendar', icon: MdCalendarMonth, tooltip: 'Calendar' },
    { to: '/candidates', icon: MdPeople, tooltip: 'Candidates' },
    { to: '/referrals', icon: FaPeoplePulling, tooltip: 'Referrals' },
    { to: '/career-site', icon: PiSuitcaseDuotone, tooltip: 'Career Site' },
    { to: '/documents', icon: IoDocumentAttachOutline, tooltip: 'Documents' },
    { to: '/reports', icon: TbReportSearch, tooltip: 'Reports' }
  ]

  const dropdownItems = [
    { text: 'My Settings', textValue: 'My Settings' },
    { text: 'Team Settings', textValue: 'Team Settings' },
    { text: 'Analytics', textValue: 'Analytics' },
    { text: 'System', textValue: 'System' },
    { text: 'Configurations', textValue: 'Configurations' },
    { text: 'Help & Feedback', textValue: 'Help & Feedback' },
    { text: 'Log Out', textValue: 'Log out', color: 'danger', onClick: logout }
  ]

  return (
    <section
      className={clsx(
        isCollapsed ? styles.collapsedContainer : styles.container,
        (isMobileViewSidebarCollapsed) ?? styles.mobileSidebar
      )}
    >
      <section className={clsx(styles.sidebar, isMobileViewSidebarCollapsed && styles.hideSidebar)} ref={sidebarRef}>
        <section className={styles.logoContainer}>
          <img
            src={logo}
            alt="logo"
            className={clsx(styles.logo, isMobileViewSidebarCollapsed && styles.hidSidebarLogo)}
            onClick={handleLogoClick}
          />

          <Button
            className={clsx(
              styles.chevronButton,
              windowWidth < MOBILE_BREAKPOINT && !isCollapsed && styles.closeButton,
              isCollapsed && styles.expandBurgerIcon
            )}
            isIconOnly
            onClick={toggleCollapse}
            variant="faded"
          >
            {isCollapsed ? (
              <BiChevronRight size={24} />
            ) : windowWidth > MOBILE_BREAKPOINT ? (
              <BiChevronLeft size={24} />
            ) : (
              <IoCloseOutline size={24} />
            )}
          </Button>
        </section>
        <section className={clsx(styles.navContainer, isMobileViewSidebarCollapsed ? styles.hideNavContainer : '')}>
          <section onClick={handleSearchClick}>
            {isCollapsed ? (
              <Tooltip content="Search" placement="right">
                <span className={styles.searchIcon}>
                  <FiSearch size={24} onClick={handleSearchClick} />
                </span>
              </Tooltip>
            ) : (
              <Input
                classNames={{
                  inputWrapper: 'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20'
                }}
                placeholder="Type to search..."
                startContent={<FiSearch size={24} />}
                type="search"
              />
            )}
          </section>

          {navItems.map(item => (
            <Tooltip key={item.tooltip} content={item.tooltip} placement="right">
              <NavLink to={item.to} className={navLinkClass}>
                <item.icon size={24} />
                {!isCollapsed && <span>{item.tooltip}</span>}
              </NavLink>
            </Tooltip>
          ))}
        </section>
      </section>

      <section className={clsx(isCollapsed ? styles.collapsedUserContainer : styles.userContainer)}>
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            {isCollapsed ? (
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              />
            ) : (
              <User
                key="user"
                as="button"
                avatarProps={{
                  isBordered: true,
                  src: 'https://i.pravatar.cc/150?u=a042581f4e29026024d'
                }}
                className="transition-transform"
                description="@tonyreichert"
                name="Tony Reichert"
              />
            )}
          </DropdownTrigger>

          <DropdownMenu aria-label="User Actions" variant="flat">
            {dropdownItems.map(item => (
              <DropdownItem key={item.text} {...item}>
                {item.text}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        <Tooltip content="Switch theme" placement="top">
          <Button isIconOnly onClick={toggleTheme} variant="flat">
            {isDarkMode ? <BiSun size={24} /> : <BiMoon size={24} />}
          </Button>
        </Tooltip>
      </section>
    </section>
  )
}

export default SideNavbar
