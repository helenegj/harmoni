import React from 'react';
import { withRouter } from 'react-router';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Main from '../src/views/main';
import Menu from './components/Menu/Menu';
import LogIn from './components/LogIn/LogIn';
import Footer from './components/Footer/Footer';
import ProfileNew from './components/profile/ProfileNew/ProfileNew';
import EventDetails from './components/event/EventDetails/EventDetails';
import EventDetailsLoggedInUser from './components/event/EventDetailsArtist/EventDetailsArtist';
import EventDetailsLoggedInOrganiser from './components/event/EventDetailsLoggedIn/EventDetailsLoggedIn';
import ProfileEdit from './components/profile/ProfileEdit/ProfileEdit';
import ProfileEditUser from './components/profile/ProfileEdit/ProfileEditUser';
import Profile from './components/profile/Profile/Profile';
import LoggedIn from './views/loggedIn';
import EventDeleted from './components/event/EventDeleted/EventDeleted';
import Admin from './components/Admin/Admin';
import DeleteOrganiser from './components/Admin/DeleteOrganiser';
import Feedback from './components/Feedback/Feedback';
import ForgottenPassword from './components/ForgottenPassword/ForgottenPassword';
import ForgottenPasswordRegistered from './components/ForgottenPassword/ForgottenPasswordRegistered';
import ProfileDeleted from './components/profile/ProfileDeleted/ProfileDeleted';
import EditEvent from './components/event/EventNew/EditEvent';
import FeedbackRegistered from './components/Feedback/FeedbackRegistered';
import EventEditArtist from './components/event/EventEditArtist/EventEditArtist';

const NoMatch = () => (
  <div className="card" id="NotFound">
    <h1 data-testid="not-found">404 Not Found</h1>
    <p>Oisann.. Siden finnes ikke, eller du mangler rettighetene som kreves for å gå inn på den.</p>
  </div>
);
const LocationDisplay = withRouter(({ location }) => (
  <div data-testid="location-display">{location.pathname}</div>
));

/**
 * Runs the client application.
 */

function App() {
  return (
    <Router basename="/">
      <Link to=""></Link>
      <Menu />
      <div className="maindiv">
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/newevent" component={EditEvent} />
          <Route exact path="/editevent" render={props => <EditEvent {...props} edit={true} />} />
          <Route exact path="/register" component={ProfileNew} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/editprofile/organiser" component={ProfileEdit} />
          <Route exact path="/editprofile/user" component={ProfileEditUser} />
          <Route exact path="/profile/summary" component={LoggedIn} />
          <Route exact path="/eventdeleted" component={EventDeleted} />
          <Route exact path="/event/:id" component={EventDetails} />
          <Route exact path="/events" component={LoggedIn} />
          <Route exact path="/userevent/:id" component={EventDetailsLoggedInUser} />
          <Route exact path="/orgevent/:id" component={EventDetailsLoggedInOrganiser} />
          <Route exaxt path="/admin" component={Admin} />
          <Route exaxt path="/deleteuser" component={DeleteOrganiser} />
          <Route exaxt path="/deletedprofile" component={ProfileDeleted} />
          <Route exaxt path="/feedback" component={Feedback} />
          <Route exaxt path="/feedbackregistered" component={FeedbackRegistered} />
          <Route exaxt path="/password" component={ForgottenPassword} />
          <Route exact path="/userevent/edit/:id" component={EventEditArtist} />
          <Route exaxt path="/passwordregister" component={ForgottenPasswordRegistered} />
          <Route component={NoMatch} />
        </Switch>
      </div>
      {/*<LocationDisplay />*/}
      <Footer />
    </Router>
  );
}

export default App;
