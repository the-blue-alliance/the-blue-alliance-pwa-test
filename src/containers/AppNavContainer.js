import { connect } from 'react-redux'
import AppNav from '../components/AppNav'


const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = {
};

const AppNavContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppNav);

export default AppNavContainer;
