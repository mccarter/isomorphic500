
import InitActions from "./containers/InitActions";

import menuOptions from "./constants/menuOptions";//returns an array of filter options: ["Today", "Yesterday", "2_Days_Ago", "3_Days_Ago"]

import HomePage from "./containers/HomePage";
import PhotoPage from "./containers/PhotoPage";
import FeaturedPage from "./containers/FeaturedPage";


export default {

  home: {
    path: "/",
    method: "get",
    handler: HomePage
  },

  menuOption: {
    //path looks like this: /time/:day(Today|Yesterday|2 Days Ago)
    path: `/time/:day(${menuOptions.join("|")})`,//The $ sign with the back ticks are ES6 string interpolation. https://babeljs.io/docs/learn-es2015/#template-strings
    method: "get",
    handler: FeaturedPage, //The handler is the UI or React component that is rendered when the url is hit
    action: InitActions.featuredPage //The action is a function that is executed on load of the new route
  },

  photo: {
    path: "/photo/:id",
    method: "get",
    handler: PhotoPage,
    action: InitActions.photoPage
  },

  // This route doesn't point to any handler.
  // I made it just as example for showing an action responding with an error
  bad: {
    path: "/bad",
    method: "get",
    action: InitActions.badPage
  }

};
