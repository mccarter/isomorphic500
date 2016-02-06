
import React, { PropTypes, Component } from "react";
import { provideContext, connectToStores } from "fluxible-addons-react";
import { handleHistory } from "fluxible-router";
import Immutable from "immutable";//Immutable data cannot be changed once created: https://www.npmjs.com/package/immutable
//Subscribing to data events throughout your application, by using Object.observe, or any other mechanism, creates a huge overhead
//of book-keeping which can hurt performance, sometimes dramatically, and creates opportunities for areas of your application to get
//out of sync with each other due to easy to make programmer error. Since immutable data never changes, subscribing to changes throughout
//the model is a dead-end and new data can only ever be passed from above.
import Page from "../components/Page";

import NotFoundPage from "../containers/NotFoundPage";
import ErrorPage from "../containers/ErrorPage";
import LoadingPage from "../containers/LoadingPage";

import trackPageView from "../utils/trackPageView";//Tracks page views for Google Analytics

if (process.env.BROWSER) {
  require("../style/Root.scss");
}

// Wrap Root with the fluxible context. Provides executeAction and getStore to child contexts.
@provideContext

// Wrap with fluxible-router's history handler (required for routing)
// This also passes `currentRoute` as prop to the component
@handleHistory

// Listen to HtmlHeadStore and pass the document title to the component
//connectToStores takes an array of stores
@connectToStores(["HtmlHeadStore"], context =>
  ({ documentTitle: context.getStore("HtmlHeadStore").getTitle() })//documentTitle is passed as a prop to top level component, Root.js
)

export default class Root extends Component {

  static propTypes = {

    // props coming from fluxible-router's handleHistory
    isNavigateComplete: PropTypes.bool,
    currentRoute: PropTypes.object,
    currentNavigateError: PropTypes.shape({
      statusCode: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired
    }),

    // prop coming from HtmlHeadStore
    documentTitle: PropTypes.string

  }

  componentDidUpdate(prevProps) {
    const { documentTitle, currentRoute } = this.props;

    if (prevProps.documentTitle !== documentTitle) {//If the document's title has changed, update the document's title
      document.title = documentTitle;
    }

    if (!Immutable.is(prevProps.currentRoute, currentRoute)) {//If the previous route matches the current route, log a page view for the current route
      //Immutable collections should be treated as values rather than objects. While objects represents some thing which could
      //change over time, a value represents the state of that thing at a particular instance of time.
      //In order to treat Immutable.js collections as values, it's important to use the Immutable.is()
      //to determine value equality instead of the === operator which determines object reference identity.
      trackPageView(currentRoute.get("url"));
    }
  }

  render() {
    const { currentRoute, currentNavigateError, isNavigateComplete } = this.props;

    const Handler = currentRoute && currentRoute.get("handler");//If the currentRoute or route handler is not found, then display 'page not found'

    let content;

    if (currentNavigateError && currentNavigateError.statusCode === 404) {
      // This "not found" error comes from a page init actions (InitActions.js)
      // e.g. when a 500px API responds 404
      content = <NotFoundPage />;
    }
    else if (currentNavigateError) {
      // Generic error, usually always with statusCode 500
      content = <ErrorPage err={ currentNavigateError } />;
    }
    else if (!Handler) {
      // No handler: this is another case where a route is not found (e.g.
      // is not defined in the routes.js config)
      content = <NotFoundPage />;
    }
    else if (!isNavigateComplete) {
      // Render a loading page while waiting the route's action to finish
      content = <LoadingPage />;
    }
    else {
      // Render the Handler (aka the page) for the current route. The route params
      // (e.g. values from the URLs) are props being sent to the page component,
      // for example the `id` of a photo for the `PhotoPage` component.
      const params = currentRoute.get("params").toJS();// returns an object with the url path. EX: {feature: 'popular'} or {feature: 'upcoming'}
      content = <Handler {...params} />;//WHAT IS HANDLER???
    }
    return (
      <Page footer={ isNavigateComplete }>
        { content }
      </Page>
    );
  }

}

