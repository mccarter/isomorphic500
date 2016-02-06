import Actions from "../constants/Actions";

// Tip: in your fetchr service calls, make sure you set a timeout higher than
// the default of 3000ms. See https://github.com/yahoo/fetchr/issues/58
const TIMEOUT = 20000;

export default {

  loadFeaturedPhotos(context, { feature="popular" }, done) {

    context.service.read("photos", { feature }, { timeout: TIMEOUT },
      (err, data) => {
        let photoUrls = data;
        if (err) {
          return done(err);
        }
        context.dispatch(Actions.LOAD_PHOTOS_SUCCESS, {
          photoUrls: photoUrls
        });

        done();
      }
    );
  },

  loadPhoto(context, { id, imageSize }, done) {//This action is executed when a user clicks on a gallery image

    // context.service.read("photo", { id, imageSize }, { timeout: TIMEOUT },//This is the code the app came with. Instead of calling a service, we'll dispatch the photo id to the PhotoStore
    //   (err, url) => {
    //     if (err) {
    //       return done(err);
    //     }
    //     context.dispatch(Actions.LOAD_PHOTO_SUCCESS, url);
    //     done();
    //   }
    // );
    context.dispatch(Actions.LOAD_PHOTO_SUCCESS, id);//Sends photo id to PhotoStore
    done();
  }

};
