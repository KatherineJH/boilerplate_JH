
import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_URL } from '../../../Config';
import MainImage from './MainImage';
import axios from 'axios';
import GridCards from '../../commons/GridCards';
// import { Row } from 'antd';
import './LandingPage.css';

// import { useNavigate } from 'react-router-dom';

// function LandingPage(){
//     const navigate  = useNavigate();

//     useEffect(() => {
//         axios.get('/api/hello')
//         .then(response => { console.log(response) })
//     }, [])

//     const onClickEvent = () => {
//         axios.get('/api/users/logout')
//             .then(response => {
//                 // console.log(response.data);
//                 if(response.data.success){
//                     navigate('/login');
//                 } else {
//                     alert("Failed to log out!");
//                 }
//             })
//     };

//     return(
//         <div style={{
//             display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
//         }}>
//             <h2> Home Page </h2>

//             <button onClick={ onClickEvent }>
//                 Log out
//             </button>
//         </div>
//     )
// }

// export default LandingPage;

function LandingPage(){

    const [Movies, setMovies] = useState([]);
    const [MainMovieImage, setMainMovieImage] = useState(null);
    const [CurrentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endpoint)

    }, [])


    const fetchMovies = (endpoint) => {
        fetch(endpoint)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setMovies([...Movies, ...response.results])
                setMainMovieImage(response.results[0])
                setCurrentPage(response.page)
            })
    }

    const loadMoreItems = () => {

        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        fetchMovies(endpoint)

    }

    return(
        <div style={{ width: '100%', margin: '0' }}>

            {/* Main Image */}
            {MainMovieImage &&
                <MainImage
                    image={`${IMAGE_URL}w1280${MainMovieImage.backdrop_path}`}
                    title={MainMovieImage.original_title}
                    text={MainMovieImage.overview}
                />
            }


            <div style={{ width: '85%', margin: '1rem auto' }}>

                <h2>Movies by latest</h2>
                <hr />

                {/* Movie Grid Cards */}

                {/* <Row gutter={[16, 16]} > */}
                <div className='grid-container'>
                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <div className='grid-item'>
                            <GridCards
                                landingPage
                                image={movie.poster_path ?
                                    `${IMAGE_URL}w500${movie.poster_path}` : null}
                                movieId={movie.id}
                                movieName={movie.original_title}
                            />
                            </div>
                        </React.Fragment>
                    ))}
                </div>
                {/* </Row> */}

            </div>

            <div className='button'>
                <button onClick={loadMoreItems}> Load More</button>
            </div>

        </div>
    )
}

export default LandingPage;