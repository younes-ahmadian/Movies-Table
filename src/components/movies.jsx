import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';

 class Movies extends Component {
     state = { 
         movies: getMovies()
      };
     render() { 
         return (
            <table>
                <tr>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Stock</th>
                    <th>Rate</th>
                </tr>
                
            </table>
        );
     }
 }
  
 export default Movies;
