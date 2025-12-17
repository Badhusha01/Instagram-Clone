import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Sugession() {

  const [profile, setProfile] = useState(null)
  const [suggestion, setSuggestion] = useState([])

  useEffect(
    () => {

      fetch("http://localhost:3000/profile")
        .then((data) => data.json())
        .then((data => setProfile(data)))
        .catch(err => console.log(err))

      fetch("http://localhost:3000/suggestions")
        .then((data) => data.json())
        .then((data => setSuggestion(data)))
        .catch(err => console.log(err))

    }, []
  )

  const handleFollow = async (id, username)=> {
    axios.post('http://localhost:3000/followers', {
      "id": id,
      "username": username
    }) .then(alert(`You followed ${username}`))
    .catch(err => console.log(err))
  }

  return (
    <div>
      <div className='suggestions w-75 m-4'>

        {profile ?
          <div className='d-flex'>
            <img className=' dp rounded-circle' src={profile.avatar} alt='User pic' />
            <h5>{profile.username}</h5>
            <p className='ms-auto text-primary'>Switch</p>
          </div> : <p>Loading Profile</p>}

        <div className='d-flex '>
          <p>Suggestions For You</p>
          <b className='ms-auto'>See All</b>
        </div>

        {suggestion.length > 0 ? (
          <div>
            {suggestion.map((suggestion) => (
              <div className='my-2' key={suggestion.id} >
                <div className='d-flex'>
                  <img className=' dp rounded-circle' src={suggestion.avatar} alt='User pic' />
                  <h6>{suggestion.username}</h6>
                  <a  className='ms-auto text-primary follow'onClick={()=>{handleFollow(suggestion.id,suggestion.username)}}>Follow</a>
                </div>
              </div>
            ))}
          </div>)
          : (<div> Loading </div>
          )}
      </div>
    </div>
  )
}

  export default Sugession