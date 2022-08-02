import React, { useEffect, useState } from 'react'
import { IMAGE_URL } from '../../../Config';
import { Popover } from 'antd';
import axios from 'axios'
import './myLikes.css'


function MyLikesPage() {

  const [Favorites, setFavorites] = useState([]);

  const fetchFavoredMovie = () => {
      // API that loads liked movies from server
      axios.post('/api/favorite/getFavoredMovie', { 
        userFrom: localStorage.getItem('userId'), 
      })
      .then((response) => {
          if (response.data.success) {
              // console.log(response.data.favorites);
              setFavorites(response.data.favorites);
          } else {
          alert('Failed to get a movie liked by you.');
          }
      })
    };

    useEffect(() => {
        fetchFavoredMovie()
    }, []);

    const onClickDelete = (movieId, userFrom) => {

      const variables = {
          movieId,
          userFrom
      }

      axios.post('/api/favorite/removeFromFavorite', variables)
          .then(response => {
              if (response.data.success) {
                  fetchFavoredMovie()
              } else {
                  alert("Failed to remove from the list.")
              }
          })
    };
    
    const renderCards = Favorites.map((favorite, index) => {
      const content = (
          <div>
            <a href={`/movie/${favorite.movieId}`}>
            {favorite.moviePost ? (
              <img src={`${IMAGE_URL}w500/${favorite.moviePost}`} /> 
            ) : (
              'no image'
            )}
            </a>
          </div>
        );
  
        return (
            <tr key={index}>
                <Popover content={content} title={`${favorite.movieTitle}`}>
                    <td>{favorite.movieTitle}</td>
                </Popover>
                <td>{favorite.movieRunTime} mins</td>
                <td style={{ textAlign:'center'}}>
                    <button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)} >
                        Remove
                    </button>
                </td>
            </tr>
        );
    });

    return (
      <div style={{ width: '85%', margin: '3rem auto'}}>
        <h1 style={{margin:'auto'}}> Favorite Movies</h1>
        <hr /><br />
  
        <table style={{ fontSize:'18px', alignContent:'center'}}>
          <thead>
            <tr>
              <th>Movie Title</th>
              <th>Movie RunTime</th>
              <th style={{ textAlign:'center'}}>Remove from favorites</th>
            </tr>
          </thead>
          <tbody>
            {renderCards}
          </tbody>
        </table>
      </div>
    );
  }

export default MyLikesPage;