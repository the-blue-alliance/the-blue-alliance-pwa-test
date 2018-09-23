import React from 'react'

import Typography from '@material-ui/core/Typography'

const MyTBASettings = (props) => {
  const { favorites } = props

  if (favorites) {
    return (
      <React.Fragment>
        <Typography>Work in progress!</Typography>
        <Typography>
          <ul>
            {favorites.map(favorite => <li key={favorite.key}>{favorite.key}</li>)}
          </ul>
        </Typography>
      </React.Fragment>
    )
  } else {
    return null
  }
}

export default MyTBASettings
