import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Profile() {

    const [profile, setProfile] = useState(null)

    const [followers, setFollowers] = useState([])

    const [unfollowed, setUnfollowed] = useState(0)

    useEffect(() => {
        axios.get('http://localhost:3000/profile')
            .then(data => { setProfile(data.data); console.log(data.data) })
            .catch(err => { console.log(err) })

        axios.get('http://localhost:3000/followers')
            .then(data => { setFollowers(data.data); })
            .catch(err => { console.log(err) })
    }
        , [unfollowed])

    function handleOnChange(e) {
        const name = e.target.name
        const value = e.target.value
        setProfile(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleUpdate = async () => {
        axios.put('http://localhost:3000/profile', profile)
            .then(alert("Profile Updated"))
            .catch(err => { console.log(err) })
    }

    const handleUnfollow = async (id) => {
        axios.delete(`http://localhost:3000/followers/${id}`)
            .then(alert("Unfollowed " + followers.find(f => f.id === id).username))
            .then(setUnfollowed(prev => prev + 1))
            .catch(err => { console.log(err) })
    }
    return (
        <div className='text-center mt-5'>
            {profile ? (
                <div>
                    <img src={profile.avatar} alt="Profile pic" className=' profile rounded-circle' />
                    <h5 className='mt-2'>{profile.username}</h5>

                    <div className='inp'>
                        <input type="text"
                            name='username'
                            value={profile.username}
                            className='profile_input form-control m-3'
                            onChange={handleOnChange} />

                        <input type="text"
                            name='avatar'
                            value={profile.avatar}
                            className='profile_input form-control m-3'
                            onChange={handleOnChange} />
                    </div>


                    <button className='btn btn-primary m-2'
                        onClick={handleUpdate}>Update Profile</button>
                </div>
            ) : (
                <div>Loading...</div>
            )}

            {followers.length > 0 ? (
                followers.map(follower => (
                    <div key={follower.id} className='d-flex my-2 justify-content-center align-items-center'>
                        {follower.username}
                        <button className='btn btn-secondary ms-auto' onClick={() => handleUnfollow(follower.id)}>Unfollow</button>
                    </div>
                ))
            ) : (
                <div> Loading followers...</div>
            )}
        </div>
    )
}

export default Profile