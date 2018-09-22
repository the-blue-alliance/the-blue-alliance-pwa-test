import HomePage from './pages/HomePage'
import EventListPage from './pages/EventListPage'
import EventPage from './pages/EventPage'
// import MatchPageContainer from './containers/MatchPageContainer'
import AccountPage from './pages/AccountPage'
import SigninRequiredPage from './pages/SigninRequiredPage'
import TeamListPage from './pages/TeamListPage'
import TeamPage from './pages/TeamPage'
import NotFoundPage from './pages/NotFoundPage'

export default [
  {
      path: '/',
      component: HomePage,
      exact: true,
  },
  {
      path: '/account',
      component: AccountPage,
      exact: true,
  },
  {
      path: '/events/:year?',
      component: EventListPage,
      exact: true,
  },
  {
      path: '/event/:eventKey',
      component: EventPage,
      exact: true,
  },
  {
      path: '/signin_required',
      component: SigninRequiredPage,
      exact: true,
  },
  // {
  //     path: '/match/:matchKey',
  //     component: MatchPageContainer,
  //     exact: true,
  // },
  {
      path: '/teams',
      component: TeamListPage,
      exact: true,
  },
  {
      path: '/team/:teamNumber/:year?',
      component: TeamPage,
      exact: true,
  },
  {
      component: NotFoundPage,
      exact: true,
  },
]
