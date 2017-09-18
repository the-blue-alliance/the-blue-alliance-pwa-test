import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Events from '../components/Events.js'


const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = {
};

const EventsContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Events));

export default EventsContainer;
