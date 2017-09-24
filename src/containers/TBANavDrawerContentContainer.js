import { connect } from 'react-redux'
import { toggleOffline } from '../actions'
import TBANavDrawerContent from '../components/TBANavDrawerContent'


const mapStateToProps = (state, props) => ({
  offlineOnly: state.getIn(['appNav', 'offlineOnly']),
});

const mapDispatchToProps = (dispatch) => ({
  toggleOffline: () => dispatch(toggleOffline()),
});

const TBANavDrawerContentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TBANavDrawerContent);

export default TBANavDrawerContentContainer;
