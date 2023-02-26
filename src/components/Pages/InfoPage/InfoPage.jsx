import React from 'react';
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import './InfoPage.css'

function InfoPage() {


  const publicusers = useSelector((store) => store.publicUser);
  const stories = useSelector((store) => store.publicStory);

  const [comments, setComments] = useState('')
    const [likes, setLikes] = useState(0);

  
  //console.log("in categories" , categories)
 

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCHPUBLIC_STORY"});
    dispatch({type: "FETCHPUBLIC_USER"});
  }, []);

  const handleLike = (storyId) => {
    const story = stories.find((story) => story.id === storyId);
    const updatedLikes = story.likes + 1;
    dispatch({
      type: "UPDATE_LIKES",
      payload: { id: storyId, likes: updatedLikes },
    });
    setLikes(updatedLikes);
  };

  return (
    <div>
    {publicusers.map((publicUser) => (
      <div key={publicUser.id}>
        <img src={publicUser.profile_picture} alt="profile picture"  />
        <h5>  {publicUser.username} </h5>
        {stories
          .filter((publicStory) => publicStory.user_id === publicUser.id)
          .map((publicStory) => (
            <div key={publicStory.id}>
              <h6>{publicStory.title}</h6>
              <p>{publicStory.body}</p>
              <button onClick={() => handleLike(publicStory.id)}>❤️</button> 
              <button>👍🏾</button> 
              <button>🙌🏾</button>
              <br />
              {publicStory.likes} {publicStory.loves} {publicStory.claps}
              <br />
  
              <div>
                <label htmlFor="comments">
                  Comments:
                  <input 
                    className='comment-textbox'
                    type="text" 
                    name='comments'
                    value={comments}
                    placeholder='Show Some Love and Drop a comment!'
                    onChange={(event) => setComments(event.target.value)}
                  />
                </label>
              </div>
            </div>
          ))
        }
      </div>
    ))}
  </div>
  

  );
}

export default InfoPage;
