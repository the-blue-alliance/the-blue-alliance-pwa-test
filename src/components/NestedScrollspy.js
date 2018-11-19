// General
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

// Components
import ScrollLink from '../components/ScrollLink'
import Scrollspy from 'react-scrollspy'

const styles = theme => ({
  sideNavSectionContainer: {
    width: '100%',
    listStyleType: 'none',
    margin: 0,
    padding: theme.spacing.unit,
    '& a:hover': {
      textDecoration: 'none',
      backgroundColor: theme.palette.primary[50],
      borderRight: `1px solid ${theme.palette.secondary.main}`,
    }
  },
  sideNavSection: {
    '& > a': {
      display: 'block',
      padding: '5px 10px',
    },
    '& > ul': {
      listStyleType: 'none',
      margin: 0,
      padding: 0,
    }
  },
  sideNavSectionCollapsable: {
    '& > a': {
      display: 'block',
      padding: '5px 10px',
    },
    '& > ul': {
      display: 'none',
      listStyleType: 'none',
      margin: 0,
      padding: 0,
    }
  },
  sideNavSectionActive: {
    '& > a': {
      fontWeight: 'bold',
      borderRight: `1px solid ${theme.palette.secondary.main}`,
    },
    '& > ul': {
      display: 'block',
    }
  },
  sideNavItem: {
    paddingLeft: 10,
    '& > a': {
      display: 'block',
      fontSize: 14,
      padding: '5px 10px',
    },
  },
  sideNavItemActive: {
    '& > a': {
      fontWeight: 'bold',
      borderRight: `1px solid ${theme.palette.secondary.main}`,
    },
  },
})

class NestedScrollspy extends PureComponent {
  state = {
    activeSection: null,
    activeItem: null,
  }

  updateActive = (el) => {
    const { subSections } = this.props
    const id = el ? el.id : null

    const itemSection = {} // {itemId: sectionKey}
    for (let sectionKey in subSections) {
      subSections[sectionKey].forEach(o => {
        itemSection[o.key] = sectionKey
      })
    }
    const section = itemSection[id]
    if (section) {
      this.setState({
        activeSection: section,
        activeItem: id,
      })
    } else {
      this.setState({
        activeSection: id,
        activeItem: null,
      })
    }
  }

  render() {
    console.log("Render NestedScrollspy")

    const { classes, collapseSections, contentRef, sections, subSections, scrollOffset } = this.props
    const { activeSection, activeItem } = this.state

    let keysToSpy = []
    for (let sectionKey in subSections) {
      keysToSpy = keysToSpy.concat(subSections[sectionKey].map(o => o.key))
    }
    if (!subSections) { // Only sections, no items
      keysToSpy = sections.map(s => s.key)
    }

    return (
      <Scrollspy
        rootEl={contentRef ? `.${contentRef.className}` : null}
        items={keysToSpy}
        className={classes.sideNavSectionContainer}
        onUpdate={(el) => {this.updateActive(el)}}
        offset={-64 + (scrollOffset ? scrollOffset : 0)}
      >
        {sections.map(({key, label}, i) => {
          return (
            <li
              key={key}
              className={classNames({
                [collapseSections ? classes.sideNavSectionCollapsable : classes.sideNavSection]: true,
                [classes.sideNavSectionActive]: activeSection === key,
              })}
            >
              <ScrollLink scrollEl={contentRef} to={key} offset={scrollOffset}>{label}</ScrollLink>
              {subSections && subSections[key] &&
                <ul>
                  {subSections[key].map(item =>
                    <li
                      key={item.key}
                      className={classNames({
                        [classes.sideNavItem]: true,
                        [classes.sideNavItemActive]: activeItem === item.key,
                      })}
                    >
                      <ScrollLink scrollEl={contentRef} to={item.key} offset={scrollOffset}>{item.label}</ScrollLink>
                    </li>
                  )}
                </ul>
              }
            </li>
          )
        })}
      </Scrollspy>
    )
  }
}

NestedScrollspy.propTypes = {
  classes: PropTypes.object.isRequired,
  collapseSections: PropTypes.bool,
  contentRef: PropTypes.object,
  sections: PropTypes.array.isRequired,
  subSections: PropTypes.object,
}

export default withStyles(styles)(NestedScrollspy)
