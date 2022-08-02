import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_URL } from '../../../Config'
import {useParams} from 'react-router-dom'
import axios from 'axios';

import Comments from './Sections/Comments'
import LikeDislikes from './Sections/LikeDislikes';
import Favorite from './Sections/Favorite';
import GridCards from '../../commons/GridCards';
import MainImage from '../../views/LandingPage/MainImage';
import MovieInfo from './Sections/MovieInfo';
import '../LandingPage/LandingPage.css';


function MovieDetailPage() {

    const {movieId} = useParams();
    // const movieId = props.match.params.movieId;
    const [Movies, setMovies] = useState([]);
    const [Casts, setCasts] = useState([]);
    const [CommentLists, setCommentLists] = useState([]);
    const [ActorToggle, setActorToggle] = useState(false);
    const movieVariable = {
        movieId: movieId
    };

    useEffect(() => {

        const endpointCast = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=en-US&page=1`;
        const endpointMovieInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

        axios.post('/api/comment/getComments', movieVariable)
        .then(response => {
            console.log(response)
            if (response.data.success) {
                console.log('response.data.comments', response.data.comments)
                setCommentLists(response.data.comments)
            } else {
                alert('Failed to get comments Info')
            }
        })
    
        fetch(endpointMovieInfo)
          .then((response) => response.json())
          .then((response) => {
            // console.log(response);
            setMovies(response);
          });

        fetchCasts(endpointCast)

    }, [])

    const fetchCasts = (endpointCast) => {
        fetch(endpointCast)
        .then((response) => response.json())
        .then((response) => {
            // console.log('responseForCast', response);
            setCasts(response.cast);
        });  
    }
    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }

    const updateComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }

    return (
        <div style={{ width: '100%', margin: '0' }}>
            {/* Header */}
            {Movies.backdrop_path && ( 
                <MainImage
                    image={`${IMAGE_URL}w1280/${Movies.backdrop_path}`} //Movie image
                    title={Movies.original_title} //Movie name
                    text={Movies.overview} //story
                />
            )}    

            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>

                {/* Favorite Button  */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize:'1rem'}}>
                    <Favorite 
                        movieInfo={Movies} 
                        movieId={movieId} 
                        userFrom={localStorage.getItem('userId')} 
                    />
                </div>

                {/* Movie Info  */}
                <MovieInfo 
                    movie = {Movies}
                />

                <br />
                {/* Actor Grid */}
                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <button onClick={toggleActorView} style={{fontSize:'1.5rem', height: '40px', width:'100px'}}> Load Casts </button>
                </div>

                {/* Casts  */}
                {ActorToggle && // show when ActorToggle is True
                    <div className='grid-container'>
                        { 
                        Casts && Casts.map((cast, index) => (
                            <React.Fragment key={index}>
                                <div className='grid-item'>
                                <GridCards
                                    image={cast.profile_path ?
                                        `${IMAGE_URL}w500${cast.profile_path}` : null}
                                />
                                <p style={{ marginBottom: '0'}}> 
                                    {cast.name} 
                                </p>
                                </div>   
                            </React.Fragment>
                        ))
                        }                   
                    </div>                  
                }
                
                {/* Like and Dislike */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <LikeDislikes video videoId={movieId} userId={localStorage.getItem('userId')} />
                </div>

                {/* Comments */}
                <Comments movieTitle={Movies.original_title} CommentLists={CommentLists} postId={movieId} refreshFunction={updateComment} />
            </div>
        </div>
    )
}

export default MovieDetailPage;