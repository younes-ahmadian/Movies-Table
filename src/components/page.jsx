import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Movies from './movies';
import Customers from './customers';
import Rental from './rental';
import NavBar from './navbar';
import NotFound from './notFound';
import LoginForm from './loginForm';
import Register from './registerForm';
import MovieForm from './movieForm';


const Page = () => {
    return ( 
        <React.Fragment>
        <NavBar />
        <div className='main'> 
        <Switch>
            <Route path="/movies/:id" component={MovieForm}></Route>
            <Route path="/Register" component={Register}></Route>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/notFound" component={NotFound} />
            <Route path="/customers" component={Customers}/>
            <Route path="/rental" component={Rental}/>
            <Route path="/movies" component={Movies}/>
            <Redirect from='/' exact to='/movies' />
            <Redirect to="/notFound" />
        </Switch>
        </div>
        </React.Fragment>

     );
}
 
export default Page;