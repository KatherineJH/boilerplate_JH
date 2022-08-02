import React from 'react'

function MovieInfo(props) {

  let { movie } = props;

  return (
    <div>
      <p>Movie Info</p>
      <table style={{ fontSize:'18px'}}>
        <tbody>
          <tr>
            <td>Title</td>
            <td>{movie.original_title}</td>
          </tr>
          <tr>
            <td>Release Date</td>
            <td>{movie.release_date}</td>
          </tr>
          <tr>
            <td>Revenue</td>
            <td>{movie.revenue}</td>
          </tr>
          <tr>
            <td>Runtime</td>
            <td>{movie.runtime}</td>
          </tr>
          <tr>
            <td>Average Rate</td>
            <td>{movie.vote_average}</td>
          </tr>
          <tr>
            <td>Count Votes</td>
            <td>{movie.vote_count}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>{movie.status}</td>
          </tr>
          <tr>
            <td>Popularity</td>
            <td>{movie.popularity}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default MovieInfo;