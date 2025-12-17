import React, { useEffect, useState } from 'react'

function Posts() {

    const [posts, setPosts] = useState([])

    useEffect(

        () => {
            fetch("http://localhost:3000/posts")
                .then((data) => data.json())
                .then((data => setPosts(data)))
                .catch(err => console.log(err))
        }, []
    )

    return (
        <div className='d-flex justify-content-center my-5'>
            {posts.length > 0 ? (
                <div className='my-2'>
                    {posts.map(post => (
                        <div key={post.id}>
                            <div  className='d-flex profile-story profile-story'>
                                <img className=' dp rounded-circle ' src={post.user.avatar} alt='User pic' />
                                <h5 className='my-1'>{post.user.username}</h5>
                            </div>

                                <img className='image my-2' src={post.imageUrl} alt='Post pic' />
                                <div  className='d-flex'>
                                    <i className="bi bi-heart"></i>
                                    <i className="bi bi-chat"></i>
                                    <i className="bi bi-send"></i>
                                    <i className="bi bi-bookmark savebtn "></i>
                                </div>
                            
                            <div>
                                <strong>{post.likes} likes</strong>
                            </div>
                            <p>{post.caption}</p>
                        </div>
                    ))}
                    </div>) : (
                <div>Loading Posts</div>
            )}
        </div>
    )
}

export default Posts