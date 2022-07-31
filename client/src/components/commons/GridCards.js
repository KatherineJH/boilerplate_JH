import React from 'react'

function GridCards(props) {

    if (props.landingPage) {
        return (
            <div style={{ position: 'relative' }}>
                <a href={`/movie/${props.movieId}`} >
                    <img style={{ width: '100%', height: '320px' }} src={props.image} alt={props.movieName} />
                </a>
            </div>
        )
    } else { // grid card for casts
        return (
            <div style={{ position: 'relative' }}>

                <img style={{ width: '100%', height: '320px' }} src={props.image} alt={props.castName} />

            </div>
        )
    }

}

export default GridCards;