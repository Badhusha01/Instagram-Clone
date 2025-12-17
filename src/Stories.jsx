import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
function Stories() {

  const [stories, setStories] = useState([])
  const navigate = useNavigate();
  let tot = 0;

  useEffect(() => {
    fetch("http://localhost:3000/story")
      .then((data) => data.json())
      .then((data) => setStories(data))
      .catch((error) => console.log(error))
  }, [])

  return (

    <div className='story d-flex gap-2 '>
      <div className='d-none'>
        {tot = stories.length} 
      </div>
      {stories.length > 0 ? (
        stories.map((story) => (
          <div key={story.user.id} onClick={()=>{navigate(`/story/${story.id}/${tot}`)}}>
            <div className='story img' >   
            <img src={story.user.dp} alt="story" />
            </div>
            <p className='text-truncate my-3' style={{ maxWidth: '60px' }}>{story.user.username}</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default Stories