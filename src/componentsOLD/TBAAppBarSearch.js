// General
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { withStyles } from '@material-ui/core/styles'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import db from '../database/db'

// Actions
import { push } from 'connected-react-router'

// Components
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import SearchIcon from '@material-ui/icons/Search'
import Autosuggest from 'react-autosuggest'

import SearchSectionTitle from './SearchSectionTitle'

const styles = theme => ({
  wrapper: {
    position: 'relative',
    marginRight: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
    borderRadius: 2,
    background: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      background: fade(theme.palette.common.white, 0.25),
    },
    '& $input': {
      transition: theme.transitions.create('width'),
      width: 300,
      '&:focus': {
        width: 350,
      },
    },
  },
  search: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: fade(theme.palette.common.white, 0.75),
  },
  input: {
    font: 'inherit',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit}px ${theme
      .spacing.unit * 9}px`,
    border: 0,
    display: 'block',
    verticalAlign: 'middle',
    whiteSpace: 'normal',
    background: 'none',
    margin: 0, // Reset for Safari
    color: 'inherit',
    width: '100%',
    '&:focus': {
      outline: 0,
    },
    '&::placeholder':  {
      fontWeight: 300,
      color: fade(theme.palette.common.white, 0.75),
    },
    '&::-ms-input-placeholder': {
      fontWeight: 300,
      color: fade(theme.palette.common.white, 0.75),
    },
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
})

// Temp hacky solution to populate sections from db -fangeugene 2018-05-19
let sections = []
db.teams.toArray().then(teams => {
  let items = []
  teams.sort((a, b) => {
    const orderA = a.team_number
    const orderB = b.team_number
    if (orderA < orderB) {
      return -1
    }
    if (orderA > orderB) {
      return 1
    }
    return 0
  }).forEach(team => {
    let tokens = [String(team.team_number)]
    if (team.nickname) {
      tokens = tokens.concat(team.nickname.toLowerCase().split(' '))
    }
    items.push({
      label: `${team.team_number} | ${team.nickname ? team.nickname : `Team ${team.team_number}`}`,
      searchTokens: tokens,
      url: `/team/${team.team_number}`,
    })
  })
  sections.push({
    title: 'Teams',
    items: items,
  })
})
db.events.toArray().then(events => {
  let items = []
  events.sort((a, b) => {
    const orderA = a.year
    const orderB = b.year
    if (orderA < orderB) {
      return 1
    }
    if (orderA > orderB) {
      return -1
    }
    const orderA2 = a.name
    const orderB2 = b.name
    if (orderA2 < orderB2) {
      return -1
    }
    if (orderA2 > orderB2) {
      return 1
    }
    return 0
  }).forEach(event => {
    const eventCode = event.key.substring(4)
    let tokens = [String(event.year), eventCode]
    tokens = tokens.concat(event.name.toLowerCase().split(' '))
    items.push({
      label: `${event.year} | ${event.name} [${eventCode.toUpperCase()}]`,
      searchTokens: tokens,
      url: `/event/${event.key}`,
    })
  })
  sections.push({
    title: 'Events',
    items: items,
  })
})

function renderInput(inputProps) {
  const { classes, value, ref, onChange, ...other } = inputProps
  return (
    <div className={classes.wrapper}>
      <div className={classes.search}>
        <SearchIcon />
      </div>
      <input
        ref={ref}
        value={value}
        onChange={onChange}
        className={classes.input}
        placeholder='Search teams and events'
        {...other}
      />
    </div>
  )
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query)
  const parts = parse(suggestion.label, matches)

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          )
        })}
      </div>
    </MenuItem>
  )
}

function renderSectionTitle(section) {
  return (
    <SearchSectionTitle text={section.title} />
  )
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options
  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  )
}

function getSuggestionValue(suggestion) {
  return suggestion.label
}

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedInput = escapeRegexCharacters(value.trim()).toLowerCase()

  if (escapedInput === '') {
    return []
  }

  const splitEscapedInput = escapedInput.split(' ')
  return sections
    .map(section => {
      return {
        title: section.title,
        items: section.items.filter(item => {
          for (let inputToken of splitEscapedInput) {
            let foundMatch = false
            for (let token of item.searchTokens) {
              if (token.startsWith(inputToken)) {
                foundMatch = true
              }
            }
            if (!foundMatch) {
              return false
            }
          }
          return true
        }).slice(0, 5),  // Limit to 5 results per section
      }
    })
    .filter(section => section.items.length > 0)
}

const mapStateToProps = (state, props) => ({
  // Params
  // States
  // Data
})

const mapDispatchToProps = (dispatch) => ({
  pushHistory: (path) => dispatch(push(path)),
})

class TBAAppBarSearch extends PureComponent {
  state = {
    value: '',
    suggestions: [],
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    })
  }

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    })
  }

  handleChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    })
  }

  onSuggestionSelected = (event, { suggestion }) => {
    this.props.pushHistory(suggestion.url)
  }

  render() {
    const { classes } = this.props

    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderInputComponent={renderInput}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={renderSuggestionsContainer}
        renderSuggestion={renderSuggestion}
        multiSection
        renderSectionTitle={renderSectionTitle}
        getSectionSuggestions={section => section.items}
        getSuggestionValue={getSuggestionValue}
        onSuggestionSelected={this.onSuggestionSelected}
        highlightFirstSuggestion
        inputProps={{
          classes,
          value: this.state.value,
          onChange: this.handleChange,
        }}
      />
    )
  }
}

TBAAppBarSearch.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TBAAppBarSearch))
