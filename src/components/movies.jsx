import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Pagination from './common/pagination';
import {paginate} from '../components/utils/paginate';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import _ from "lodash";


 class Movies extends Component {
     state = { 
         movies: [],
         genre: [],
         pageSize: 4,
         sortColumn:{path: "title", order: "asc"},
         currentPage: 1
      };

      componentDidMount() {
          const genre = [{_id:"", name: "All Genres"}, ...getGenres()]
          this.setState({movies: getMovies(), genre});
      }

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

    handlePageChange = page => {
        this.setState({currentPage: page});
    };

    handleGenreSelect = genre => {
        this.setState({selectedGenre: genre, currentPage: 1})
    };

    handleSort = (sortColumn) => {
       
        this.setState({sortColumn})
    }

    getPagedData = () => {
    const {pageSize, currentPage, selectedGenre,sortColumn, movies : allMovies} = this.state;
        
    const filtered = (selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies);
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return {totalCount: filtered.length, data: movies }
    }

    render() { 
         const {length: count} = this.state.movies;
         const {pageSize, currentPage, selectedGenre,sortColumn} = this.state;
        if(count === 0)  return 'There are no movies in the database';

        const {totalCount, data}= this.getPagedData();
         return (            
             <div className='row'>
                 <div className="col-3">
                     <ListGroup 
                     items={this.state.genre}
                     selectedItem={selectedGenre}
                     onItemSelect={this.handleGenreSelect}/>
                 </div>

                 <div className="col">
                   <p>There are {totalCount} movies in the database.</p>
                        <MoviesTable 
                        movies={data}
                        sortColumn={sortColumn}
                        onLike={this.handleLike}
                        onDelete={this.handleDelete} 
                        onSort={this.handleSort}
                        />
                        <Pagination itemsCount = {totalCount}
                        pageSize={pageSize}
                        currentPage = {currentPage}
                        onPageChange={this.handlePageChange} />
                 </div>
            </div>
        );
     }
 }
  
 export default Movies;
