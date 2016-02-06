// Similar to react-intl's Mixin `getIntlMessage`, but it receives the messages
// as argument. It is used by the IntlStore the get a message from its path

function getIntlMessage(messages, path, invoked) {
  console.log('getIntMessage invoked from: ', invoked, 'messages: ', messages, 'path: ', path);
  const pathParts = path.split(".");//ex: [ 'features', 'Today' ]

  let message;
  try {
    message = pathParts.reduce((obj, pathPart) => obj[pathPart], messages);//what the fuck does this do?
    // var count = 1;
    // message = pathParts.reduce((obj, pathPart) => {
    //   // console.log('obj', obj, 'count', count);
    //   // count++;
    //  return obj[pathPart], messages;//what the fuck does this do?
    // });
    console.log('////???///message: ', message)
  } finally {
    if (message === undefined) {
      throw new ReferenceError("Could not find Intl message: " + path);
    }
  }

  return message;
}

export default getIntlMessage;

//Example messages:
// var messages = {   meta:
//      { title: 'isomorphic500',
//        description: 'Demo application made with React and Fluxible',
//        loadingTitle: 'Loading…',
//        errorTitle: 'Error displaying this page',
//        notFoundTitle: 'Page not found' },
//     features:
//      { popular: 'Most Popular',
//        highest_rated: 'Highest Rated',
//        upcoming: 'Upcoming',
//        editors: 'Editors picks',
//        fresh_today: 'Fresh Today',
//        fresh_yesterday: 'Fresh Yesterday',
//        fresh_week: 'Fresh This Week' },
//     featured: { documentTitle: '{feature} on 500px' },
//     home: { welcome: 'Welcome to isomorphic500. Now explore some photo...' },
//     photo:
//      { documentTitle: '{name} – by {user}',
//        documentDescription: '{name} is a photo by {user} published on 500px',
//        attribution: 'Photo by {userLink}',
//        rating: 'Rating {rating}' }
// }


// message = pathParts.reduce((obj, pathPart) => {
//   console.log('obj', obj, 'count', count);
//   count++;
//  return obj[pathPart], messages;//what the fuck does this do?
// });
