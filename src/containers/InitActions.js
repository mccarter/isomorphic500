// Actions to run when the router matches a route. Used in app/routes.js

import { loadFeaturedPhotos, loadPhoto } from "../actions/PhotoActionCreators";

export default {

  featuredPage(context, route, done) {
    const menuOption = route.getIn(["params", "day"]);//ex: 'Today'
    context.executeAction(loadFeaturedPhotos, { menuOption }, done);// in ES6, {menuOption} is equivalent to {menuOption: menuOption}
  },

  photoPage(context, route, done) {//This function is executed on load of the photo page after a user clicks on a gallery image
    const id = route.getIn(["params", "id"]); //Gets the value from the navParams, in this case, the id of the photo
    context.executeAction(loadPhoto, { id }, done); //This is the code the app came with which calls a service

  },

  // do not load something, just send an error in the callback
  // to show how the app react with errors
  badPage(context, route, done) {
    const err = new Error();
    err.message = "Do not worry, just giving a try.";
    done(err);
  }

};
