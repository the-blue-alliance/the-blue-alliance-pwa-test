import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import AppNav from '../components/AppNav'


const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = {
};

const AppNavContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(AppNav));

export default AppNavContainer;
