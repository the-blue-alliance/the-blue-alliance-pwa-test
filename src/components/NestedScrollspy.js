// General
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

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
  sideNavItemInactive: {
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
  }
  activeSectionItem = {}

  updateActiveSection = (el) => {
    const section = el ? el.id : null
    this.setState({activeSection: section})

  }

  updateActiveItem = (el, section) => {
    this.activeSectionItem[section] = el ? el.id : null
    const activeSection = this.state.activeSection
  }

  render() {
    console.log("Render NestedScrollspy")

    const { classes, collapseSections, contentRef, sections, sectionLabels, sectionItems, scrollOffset } = this.props

    return (
      <Scrollspy
        rootEl={contentRef ? `.${contentRef.className}` : null}
        items={sections}
        currentClassName={classes.sideNavSectionActive}
        className={classes.sideNavSectionContainer}
        onUpdate={(el) => {this.updateActiveSection(el)}}
        offset={-64 + (scrollOffset ? scrollOffset : 0)}
      >
        {sections.map((section, i) => {
          return (
            <li key={section} className={collapseSections ? classes.sideNavSectionCollapsable : classes.sideNavSection}>
              <ScrollLink scrollEl={contentRef} to={section} offset={scrollOffset}>{sectionLabels[i]}</ScrollLink>
              {sectionItems && sectionItems[section] &&
                <Scrollspy
                  rootEl={contentRef ? `.${contentRef.className}` : null}
                  items={sectionItems[section].map(item => item.id)}
                  currentClassName={this.state.activeSection === section ? classes.sideNavItemActive : classes.sideNavItemInactive}
                  onUpdate={(el) => this.updateActiveItem(el, section)}
                >
                  {sectionItems[section].map(item =>
                    <li key={item.id} className={classes.sideNavItem}>
                      <ScrollLink scrollEl={contentRef} to={item.id} offset={scrollOffset}>{item.label}</ScrollLink>
                    </li>
                  )}
                </Scrollspy>
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
