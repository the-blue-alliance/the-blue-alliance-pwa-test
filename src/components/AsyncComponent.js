import Loadable from 'react-loadable'

const asyncComponent = (importComponent, chunkName) => Loadable({
  loader: importComponent,
  loading: () => null,
  modules: [chunkName],
})
export default asyncComponent
