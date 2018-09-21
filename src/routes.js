import HomePage from './pages/HomePage'
// import EventListPageBase from './pages/EventListPageBase'
import EventPage from './pages/EventPage'
// import MatchPageContainer from './containers/MatchPageContainer'
import AccountPage from './pages/AccountPage'
import SigninRequiredPage from './pages/SigninRequiredPage'
// import TeamListPageContainer from './containers/TeamListPageContainer'
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
  // {
  //     path: '/events/:year?',
  //     component: EventListPageBase,
  //     exact: true,
  // },
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
  // {
  //     path: '/teams',
  //     component: TeamListPageContainer,
  //     exact: true,
  // },
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
