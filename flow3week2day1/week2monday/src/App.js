import React, {useState} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useParams,
  useRouteMatch
} from "react-router-dom";

function App({bookFacade}) {
  const[loginStatus, setLoginStatus] = useState(false);

  const login = (loginState) => {
    setLoginStatus(loginState);
  };
    


    return (
    <div className="content"> 
    <Header loginStatus={loginStatus} />
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/products">
        <Products bookFacade={bookFacade} />
      </Route>
      <Route path="/add-book">
        <AddBook bookFacade={bookFacade}/>
      </Route>
      <Route path="/company">
        <Company />
      </Route>
      <Route path="/findBook">
        <FindBook bookFacade={bookFacade}/>
      </Route>
      <Route>
      <NoMatch />
    </Route>
    </Switch>
    </div>
   

  );
}

function Header({loginStatus, login}){
  return( 
  <ul className="header">
  <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
  <li><NavLink activeClassName="active" to="/products">Products</NavLink></li>
  <li><NavLink activeClassName="active" to="/add-book">Add Book</NavLink></li>
  <li><NavLink activeClassName="active" to="/company">Company</NavLink></li>
  <li><NavLink activeClassName="active" to="/findBook">FindBook</NavLink></li>
  </ul>
)}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function AddBook({bookFacade}) {
  const initialBook = {id:"", title: "", info: ""};
  const[book, setBook] = useState(initialBook);
  const[isBlocked, setIsBlocked] = useState(false);

  function updateBook(evt){
    let t = evt.target
    let updatedBook = {...book};
    updatedBook[t.id] = t.value;
    setIsBlocked(updatedBook.title.length > 0 || updatedBook.info.length > 0)
    setBook(updatedBook);
  }

  function saveBook(evt){
    evt.preventDefault();
    bookFacade.addBook(book);
    setBook(initialBook);
  }

   return(
    <div>
      <h2>Add Book</h2>
      <form onSubmit={saveBook}>
      
      
        <input id='title' type='text' placeholder='Add title' value={book.title} onChange={updateBook}/><br/>
        <input id='info' type='text' placeholder='Add info' value={book.info} onChange={updateBook}/><br/>
        <input type='submit' value='Save'/>
        {/* <p>{isBlocked ? 'Blocked' : 'Clear'}</p> */}
      </form>
    </div>
  );
};

function Products({bookFacade}) {
  
  let { path, url } = useRouteMatch();
  return (
    <div>
      <h2>Products</h2>
      <p>Antal bøger {bookFacade.getBooks().length}</p>
    
    <ul>
    {bookFacade.getBooks().map(book => {
      return (
        <li key={book.id}>
          {book.title}, <NavLink exact activeClassName="active" to={`${url}/${book.id}`}>Information</NavLink>
        </li>
      );
    })}
    </ul>
    <Route exact path={path}>
        <p>Informationer omkring bøger</p>
      </Route>
      <Route path={`${path}/:id`}>
        <Information bookFacade={bookFacade}/>
      </Route>
      


    </div>
  );
}

function Information({bookFacade}){
  let { id } = useParams();
  let searchedBook = bookFacade.findBook(id);
  return (
    <p>
      <b>ID:</b> {searchedBook.id}<br/>
      <b>Title:</b> {searchedBook.title}<br/>
      <b>Info:</b> {searchedBook.info}
    </p>
  );
};

function Company() {
  return (
    <div>
      
      <h2>Products</h2>
    </div>
  );
}



function FindBook({bookFacade}){
  const[id, setId] = useState();
  const[book, setBook] = useState();
  const[searched, setSearched] = useState(false);

  function changeHandler(evt){
    setId(evt.target.value);
  };

  function submitHandler(evt){
    evt.preventDefault();
    setBook(bookFacade.findBook(id));
    setSearched(true);
  };

  function deletingBook(evt){
    evt.preventDefault();
    bookFacade.deleteBook(book.id);
    setSearched(false);
    setId('');
  }

  function readBook(){
    return !book ? (<p>No matching book</p>) : (
      <p>
        <b>ID:</b> {book.id}<br/>
        <b>Title:</b> {book.title}<br/>
        <b>Info:</b> {book.info}<br/>
        <button onClick={deletingBook}>Delete Book</button>
      </p>
    )
  };

  return(<form onSubmit={submitHandler}>
    <input type='number' placeholder='Enter book id' value={id} onChange={changeHandler}/>
    <input type='submit' value='Find book'/><br/>
    {searched ? readBook() : <p>Enter ID for book to see</p>}
  </form>);
};

function NoMatch(){
  return(
    <h3>Unkown</h3>
  )
}
export default App;