import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './like';

 class Movies extends Component {
     state = { 
         movies: getMovies(),
      };

     handleDelete = (movie) => {
            const movies = this.state.movies.filter(m => (m._id !== movie._id));
            this.setState({movies});
        }

    handleLike = (movie) => {
      const movies =[...this.state.movies];
      const index = movies.indexOf(movie);
      movies[index].liked = !movies[index].liked;
      this.setState({movies});
    }

     render() { 
         const {length: count} = this.state.movies;
        if(count === 0)
        return 'There are no movies in the database';
         return (
             
             <div>
                <p>There are {count} movies in the database.</p>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Stock</th>
                            <th>Rate</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.movies.map(movie => <tr key = {movie._id}>
                                <td>{movie.title}</td>
                                <td>{movie.genre.name}</td>
                                <td>{movie.numberInStock}</td>
                                <td>{movie.dailyRentalRate}</td>
                                <td><Like onClick={() => this.handleLike(movie)} 
                                        liked ={movie.liked}/> </td>
                                <td><button onClick = {() => this.handleDelete(movie)}
                                        className="btn btn-danger btn-sm">Delete</button> </td>
                                    
                            </tr>)}
                    </tbody>
                
                    
                </table>
            </div>
        );
     }
 }
  
 export default Movies;


//  <i class="fa fa-heart" aria-hidden="true"></i>   por

//  <i class="fa fa-heart-o" aria-hidden="true"></i>  khali