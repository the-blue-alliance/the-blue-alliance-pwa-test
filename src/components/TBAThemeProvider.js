import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import amber from '@material-ui/core/colors/amber'
import indigo from '@material-ui/core/colors/indigo'

import { canUseDOM } from '../utils'

const createTheme = darkTheme => {
  const displayTextColor = darkTheme ? 'rgba(255, 255, 255, 0.87)' : 'rgba(0, 0, 0, 0.87)'
  return createMuiTheme({
    palette: {
      primary: indigo,
      secondary: amber,
      type: darkTheme ? 'dark' : 'light',
    },
    typography: {
      display4: {
        color: displayTextColor,
      },
      display3: {
        color: displayTextColor,
      },
      display2: {
        color: displayTextColor,
      },
      display1: {
        color: displayTextColor,
      },
      title: {
        fontWeight: 400,
      },
    },
  })
}

class TBAThemeProvider extends React.Component {
  state = {
    theme: createTheme(false)
  }

  componentDidMount() {
    this.setState({theme: createTheme(this.props.darkTheme)})
  }

  componentDidUpdate(prevProps) {
    if (prevProps.darkTheme !== this.props.darkTheme) {
      this.setState({theme: createTheme(this.props.darkTheme)})
    }
  }

  render() {
    const { children } = this.props
    return (
      <MuiThemeProvider theme={this.state.theme} sheetsManager={canUseDOM ? null : new Map()}>
        <TBAGlobalStyle />
        {children}
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = (state, props) => ({
  darkTheme: state.getIn(['appState', 'darkTheme']),
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(TBAThemeProvider)

const TBAGlobalStyle = withStyles((theme) => ({
  '@global': {
    body: {
      margin: 0,
      padding: 0,
      fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
      overscrollBehavior: 'contain',
    },
    a: {
      color: theme.palette.type === 'light' ? theme.palette.primary.main : theme.palette.primary.light,
      textDecoration: 'none',
    },
    'a:hover': {
      textDecoration: 'underline',
    },
    // For hiding scrollbar on tabs. Doesn't work for Firefox
    '.hide-scrollbar ::-webkit-scrollbar': {
      display: 'none',
    },
    '.hide-scrollbar': {
      '-ms-overflow-style': 'none',
    },
    // For IE
    main: {
      display: 'block',
    },
  },
}))((props) => {
  return null
})
