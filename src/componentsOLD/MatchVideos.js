import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import fitvids from 'fitvids'

const styles = theme => ({
})

class MatchVideos extends PureComponent {
  componentDidMount() {
    fitvids()
  }

  render() {
    console.log('Render MatchVideos')

    const { match } = this.props

    if (match === undefined) {
      return <CircularProgress color="secondary" size={100} />
    }

    return (
      <Grid container spacing={8}>
        {match.get('videos').map(video => {
          return (
            <Grid item xs={12} key={video.get('key')}>
              <iframe title="Match Video" width="560" height="315" src={`https://www.youtube.com/embed/${video.get('key')}`} frameBorder="0" allowFullScreen></iframe>
            </Grid>
          )
        })}
      </Grid>
    )
  }
}

export default withStyles(styles)(MatchVideos)
