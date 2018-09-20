import { connect } from 'react-redux'
import { openSnackbar, closeSnackbar } from '../actions'
import TBASnackbars from '../components/TBASnackbars'


const mapStateToProps = (state, props) => ({
  snackbar: state.getIn(['appState', 'snackbar']),
});

const mapDispatchToProps = (dispatch) => ({
  openSnackbar: (value) => dispatch(openSnackbar(value)),
  closeSnackbar: () => dispatch(closeSnackbar()),
});

const TBASnackbarsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TBASnackbars)

export default TBASnackbarsContainer;
