import React from "react";
import "./style2.css"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useParams,
  useRouteMatch
} from "react-router-dom";


export default function NestingExample(props) {
    const {info} = props
  return (
    <Router>
      <div>
        <ul className="header">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/topics">Topics</NavLink>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/topics">
            <Topics info={info}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Topics({info}) {


  let { path, url } = useRouteMatch();
  const listItems = info.map(info=>{ return (
      <li key ={info.id}>
          <NavLink to={`${url}/${info.id}`}>{info.title}</NavLink>
    </li>
  )

})

  return (
    <div>
      <h2>Topics</h2>
      <p>size {info.length}</p>
      <ul>
       {listItems}
      </ul>

    <div className= "content">
      <Switch>
        <Route exact path={path}>
          <h3>Please select a topic.</h3>
        </Route>
        <Route path={`${path}/:topicId`}>
          <Topic info ={info}/>
        </Route>
      </Switch>
      </div>
    </div>
  );
}

function Topic(props) {
  const {info} = props
  let { topicId } = useParams();

    const topic = info.find((topic)=> topicId === topic.id)

  return (
    <div>
      <h3>{topicId}</h3>
        <h3>title</h3> 
        {topic.title}
      <h3>info</h3>
      {topic.info}
    </div>
  );
}