import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Pagination from './common/pagination';
import {paginate} from '../components/utils/paginate';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import _ from "lodash";
import { Link } from 'react-router-dom';
import SearchBox from './common/searchBox';


 class Movies extends Component {
     state = { 
         movies: [],
         genre: [],
         pageSize: 4,
         sortColumn:{path: "title", order: "asc"},
         currentPage: 1,
         searchQuery: "",
         selectedGenre: null

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
        this.setState({selectedGenre: genre, searchQuery: "", currentPage: 1})
    };

    handleSearch = query => {
        this.setState({searchQuery: query, selectedGenre: null, currentPage: 1});
    }

    handleSort = (sortColumn) => {
       
        this.setState({sortColumn})
    }

    getPagedData = () => {
    const {pageSize, currentPage, selectedGenre, searchQuery, sortColumn, movies : allMovies} = this.state;
    
    let filtered = allMovies;
    if(searchQuery) filtered = allMovies.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()))
    else filtered = (selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies);
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return {totalCount: filtered.length, data: movies }
    }

    render() { 
         const {length: count} = this.state.movies;
         const {pageSize, searchQuery, currentPage, selectedGenre,sortColumn} = this.state;
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
                    <Link className="nav-link" style={{marginBottom: 20, display:"inline-block"}}
                     to="/movies/new">
                        <button className="btn btn-primary m-2">New Movie</button>
                    </Link>
                    
                   <p>There are {totalCount} movies in the database.</p>
                        <SearchBox value={searchQuery} onChange={this.handleSearch} />
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
