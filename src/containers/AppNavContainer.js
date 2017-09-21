import { connect } from 'react-redux'
import AppNav from '../components/AppNav'


const mapStateToProps = (state, props) => ({
  isLoading: state.getIn(['appBar', 'loadingCount']) > 0,
});

const mapDispatchToProps = {
};

const AppNavContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppNav);

export default AppNavContainer;
