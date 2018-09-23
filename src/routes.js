import asyncComponent from './components/AsyncComponent'
const HomePage = asyncComponent(() => import('./pages/HomePage'))
const EventListPage = asyncComponent(() => import('./pages/EventListPage'))
const EventPage = asyncComponent(() => import('./pages/EventPage'))
//const MatchPageContainer = asyncComponent(() => import('./containers/MatchPageContainer'))
const AccountPage = asyncComponent(() => import('./pages/AccountPage'))
const SigninRequiredPage = asyncComponent(() => import('./pages/SigninRequiredPage'))
const TeamListPage = asyncComponent(() => import('./pages/TeamListPage'))
const TeamPage = asyncComponent(() => import('./pages/TeamPage'))
const NotFoundPage = asyncComponent(() => import('./pages/NotFoundPage'))

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
