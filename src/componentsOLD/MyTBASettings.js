import React from 'react'

const MyTBASettings = (props) => {
  const { favorites } = props

  if (favorites) {
    return (
      <React.Fragment>
        <p>Work in progress!</p>
        <ul>
          {favorites.map(favorite => <li key={favorite.key}>{favorite.key}</li>)}
        </ul>
      </React.Fragment>
    )
  } else {
    return null
  }
}

export default MyTBASettings
