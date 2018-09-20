import HomePage from './pages/HomePage'
// import EventListPageBase from './pages/EventListPageBase'
// import EventPage from './pages/EventPage'
// import MatchPageContainer from './containers/MatchPageContainer'
// import AccountPageBase from './pages/AccountPageBase'
// import SigninRequiredPageBase from './pages/SigninRequiredPageBase'
// import TeamListPageContainer from './containers/TeamListPageContainer'
// import TeamPageBase from './pages/TeamPageBase'
import NotFoundPage from './pages/NotFoundPage'

export default [
  {
      path: '/',
      component: HomePage,
      exact: true,
  },
  // {
  //     path: '/account',
  //     component: AccountPageBase,
  //     exact: true,
  // },
  // {
  //     path: '/events/:year?',
  //     component: EventListPageBase,
  //     exact: true,
  // },
  // {
  //     path: '/event/:eventKey',
  //     component: EventPage,
  //     exact: true,
  // },
  // {
  //     path: '/signin_required',
  //     component: SigninRequiredPageBase,
  //     exact: true,
  // },
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
  // {
  //     path: '/team/:teamNumber/:year?',
  //     component: TeamPageBase,
  //     exact: true,
  // },
  {
      component: NotFoundPage,
      exact: true,
  },
]
