import React, { PureComponent } from 'react';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import { AutoSizer, WindowScroller, List } from 'react-virtualized';
import { withStyles } from 'material-ui/styles';
import indigo from 'material-ui/colors/indigo';
import { ListItem, ListItemText, ListSubheader } from 'material-ui/List';


const styles = {
  subHeader: {
    backgroundColor: indigo[500],
  },
  subHeaderText: {
    color: '#fff',
  },
}

class EventListItem extends PureComponent {
  render() {
    return (
      <LinkContainer to={`/event/${this.props.event.get('key')}`}>
        <ListItem button divider disableRipple>
          <ListItemText primary={this.props.event.get('short_name')} secondary={`${this.props.event.get('city')}, ${this.props.event.get('state_prov')}, ${this.props.event.get('country')} | ${this.props.event.get('start_date')} - ${this.props.event.get('end_date')}`} />
        </ListItem>
      </LinkContainer>
    )
  }
}

class EventsList2 extends PureComponent {
  rowRenderer = ({index, isScrolling, isVisible, key, parent, style}) => {
    const classes = this.props.classes
    const item = this.listItems[index]
    if (item.type === 'label') {
      return (
        <div key={key} style={style}>
          <ListSubheader className={classes.subHeader}>
            <ListItemText primary={item.value} classes={{text: classes.subHeaderText}}/>
          </ListSubheader>
        </div>
      )
    } else {
      return (
        <div key={key} style={style}>
          <EventListItem event={item.value}/>
        </div>
      )
    }
  }

  render() {
    console.log("Render EventsList2")

    let eventsByType = {}
    let eventsByDistrictLabel = {}
    this.props.events.forEach(event => {
      const eventType = event.get('event_type')
      if (eventType === 1) {  // District Qualifier
        let label = `${event.getIn(['district', 'display_name'])} District Events`
        if (eventsByDistrictLabel[label]) {
          eventsByDistrictLabel[label].push(event)
        } else {
          eventsByDistrictLabel[label] = [event]
        }
      } else {
        if (eventsByType[eventType]) {
          eventsByType[eventType].push(event)
        } else {
          eventsByType[eventType] = [event]
        }
      }
    })

    // Combine everything in display order:
    // Regional, District Qualifier (alphabetical), District Div, District CMP, CMP DIV, CMP, FoC, Preseason, Offseason
    let sortedLabels = []
    for (let label in eventsByDistrictLabel) {
      sortedLabels.push(label)
    }
    sortedLabels.sort()

    let labelIdxs = new Set()
    this.listItems = []
    if (eventsByType[0]) {
      labelIdxs.add(this.listItems.length)
      this.listItems.push({
        type: 'label',
        value: 'Regional Events',
      })
      eventsByType[0].forEach(event => {
        this.listItems.push({
          type: 'event',
          value: event,
        })
      })
    }
    if (eventsByDistrictLabel) {
      sortedLabels.forEach(label => {
        labelIdxs.add(this.listItems.length)
        this.listItems.push({
          type: 'label',
          value: label,
        })
        eventsByDistrictLabel[label].forEach(event => {
          this.listItems.push({
            type: 'event',
            value: event,
          })
        })
      })
    }
    if (eventsByType[5]) {
      labelIdxs.add(this.listItems.length)
      this.listItems.push({
        type: 'label',
        value: 'District Championship Divisions',
      })
      eventsByType[5].forEach(event => {
        this.listItems.push({
          type: 'event',
          value: event,
        })
      })
    }
    if (eventsByType[2]) {
      labelIdxs.add(this.listItems.length)
      this.listItems.push({
        type: 'label',
        value: 'District Championships',
      })
      eventsByType[2].forEach(event => {
        this.listItems.push({
          type: 'event',
          value: event,
        })
      })
    }
    if (eventsByType[3]) {
      labelIdxs.add(this.listItems.length)
      this.listItems.push({
        type: 'label',
        value: 'Championship Divisions',
      })
      eventsByType[3].forEach(event => {
        this.listItems.push({
          type: 'event',
          value: event,
        })
      })
    }
    if (eventsByType[4]) {
      labelIdxs.add(this.listItems.length)
      this.listItems.push({
        type: 'label',
        value: 'Championship Finals',
      })
      eventsByType[4].forEach(event => {
        this.listItems.push({
          type: 'event',
          value: event,
        })
      })
    }
    if (eventsByType[6]) {
      labelIdxs.add(this.listItems.length)
      this.listItems.push({
        type: 'label',
        value: 'Festival of Champions',
      })
      eventsByType[6].forEach(event => {
        this.listItems.push({
          type: 'event',
          value: event,
        })
      })
    }
    if (eventsByType[100]) {
      labelIdxs.add(this.listItems.length)
      this.listItems.push({
        type: 'label',
        value: 'Preseason Events',
      })
      eventsByType[100].forEach(event => {
        this.listItems.push({
          type: 'event',
          value: event,
        })
      })
    }
    if (eventsByType[99]) {
      labelIdxs.add(this.listItems.length)
      this.listItems.push({
        type: 'label',
        value: 'Offseason Events',
      })
      eventsByType[99].forEach(event => {
        this.listItems.push({
          type: 'event',
          value: event,
        })
      })
    }

    return (
      <WindowScroller scrollElement={this.props.el}>
      {({ height, isScrolling, onChildScroll, scrollTop }) => (
        <AutoSizer disableHeight>
          {({ width }) => (
            <List
              autoHeight
              width={width}
              height={height}
              isScrolling={isScrolling}
              onScroll={onChildScroll}
              rowCount={this.listItems.length}
              rowHeight={({ index }) => labelIdxs.has(index) ? 24 : 69}
              rowRenderer={this.rowRenderer}
              scrollTop={scrollTop}
            />
          )}
        </AutoSizer>
      )}
      </WindowScroller>
    );
  }
}

export default withStyles(styles)(EventsList2);
