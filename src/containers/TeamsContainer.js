import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Teams from '../components/Teams'

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = (dispatch) => ({
})

const TeamsContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Teams));

export default TeamsContainer;
