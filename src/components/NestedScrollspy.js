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
    const { sectionItems } = this.props
    const id = el ? el.id : null

    const itemSection = {} // {itemId: sectionKey}
    for (let sectionKey in sectionItems) {
      sectionItems[sectionKey].forEach(o => {
        itemSection[o.id] = sectionKey
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

    const { classes, collapseSections, contentRef, sections, sectionLabels, sectionItems, scrollOffset } = this.props
    const { activeSection, activeItem } = this.state

    let keysToSpy = []
    for (let sectionKey in sectionItems) {
      keysToSpy = keysToSpy.concat(sectionItems[sectionKey].map(o => o.id))
    }
    if (!sectionItems) { // Only sections, no items
      keysToSpy = sections
    }

    return (
      <Scrollspy
        rootEl={contentRef ? `.${contentRef.className}` : null}
        items={keysToSpy}
        className={classes.sideNavSectionContainer}
        onUpdate={(el) => {this.updateActive(el)}}
        offset={-64 + (scrollOffset ? scrollOffset : 0)}
      >
        {sections.map((section, i) => {
          return (
            <li
              key={section}
              className={classNames({
                [collapseSections ? classes.sideNavSectionCollapsable : classes.sideNavSection]: true,
                [classes.sideNavSectionActive]: activeSection === section,
              })}
            >
              <ScrollLink scrollEl={contentRef} to={section} offset={scrollOffset}>{sectionLabels[i]}</ScrollLink>
              {sectionItems && sectionItems[section] &&
                <ul>
                  {sectionItems[section].map(item =>
                    <li
                      key={item.id}
                      className={classNames({
                        [classes.sideNavItem]: true,
                        [classes.sideNavItemActive]: activeItem === item.id,
                      })}
                    >
                      <ScrollLink scrollEl={contentRef} to={item.id} offset={scrollOffset}>{item.label}</ScrollLink>
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
  sectionLabels: PropTypes.array.isRequired,
  sectionItems: PropTypes.object,
}

export default withStyles(styles)(NestedScrollspy)
