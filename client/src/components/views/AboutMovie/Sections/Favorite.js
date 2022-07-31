import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Axios from 'axios'

function Favorite(props) {
    const user = useSelector(state => state.user);
    // communicate with Favorite.js in Client side
    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.runtime;

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)

    // communicate with Favorite.js in Client side
    let variables = {
        userFrom: userFrom,
        movieId: movieId,
        movieTitle: movieTitle,
        moviePost: moviePost,
        movieRunTime: movieRunTime
    }

    useEffect(() => {
        //using post instead of get
        Axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => { // response parameter에 결과 값이 들어옴
                setFavoriteNumber(response.data.favoriteNumber)
                if (response.data.success) {
                } else {
                    alert('Failed to get a number of Favorites.')
                }
            })

        Axios.post('/api/favorite/favorited', variables)
            .then(response => {
                if (response.data.success) {
                    setFavorited(response.data.favorited)
                } else {
                    alert('Failed to get information.')
                }
            })

    }, [])


    const onClickFavorite = () => {
        if (user.userData && !user.userData.isAuth) {
            return alert('Please Log in first');
        }

        if (Favorited) {
            Axios.post('/api/favorite/removeFromFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber - 1)
                        setFavorited(!Favorited)
                    } else {
                        alert('Failed to delete it from Favorite list.')
                    }
                })
        } else {
            Axios.post('/api/favorite/addToFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber + 1)
                        setFavorited(!Favorited)

                    } else {
                        alert('Failed to add it to Favorite list.')
                    }
                })
        }

    }

    return (
        <div>
            <button onClick={onClickFavorite}>{Favorited ? " Not Favorite" : "Add to Favorite "}  {FavoriteNumber}  </button>

            {/* <button> Favorite </button> */}
        </div>
    )
}
    
export default Favorite;