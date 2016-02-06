import { BaseStore } from "fluxible/addons";
import Actions from "../constants/Actions";
import _ from "lodash";

/*
This is a "resource store", holding the photo objects loaded by the app.
Photo objects can come either loading a single photo (`LOAD_PHOTO_SUCCESS`)
or after loading featured photos (`LOAD_FEATURED_PHOTOS_SUCCESS`).
*/

export default class PhotoStore extends BaseStore {

  static storeName = "PhotoStore"

  static handlers = {
    [Actions.LOAD_FEATURED_PHOTOS_SUCCESS]: "handleLoadFeaturedSuccess",
    [Actions.LOAD_PHOTO_SUCCESS]: "handleLoadSuccess"
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.photos = {};
    this.photoId = "";
    this.photo = "";
  }

  handleLoadSuccess(id) {
    //this.photos[photo.id] = _.merge({}, this.photos[photo.id], photo);
    // this.photo = id;//saves url that is in view
    this.photoId = id;
    console.log('PHOTO ID in PHOTO STORE: ', this.photoId);
    this.emitChange();
  }

  handleLoadFeaturedSuccess({ photos }) {
    this.photos = _(photos).indexBy("id").merge(this.photos).value();
    this.emitChange();
  }

  getPhotoUrl() {
    return this.photo;
  }

  get(id, minSize=0) {
    // return _.find(this.photos, photo =>
    //   photo.id === parseInt(id) && photo.images[0].size >= minSize
    // );
  }

  getMultiple(ids) {
    return ids.map(id => this.photos[id]);
  }

  dehydrate() {
    return {
      photos: this.photos,
      photo: this.photo
    };
  }

  rehydrate(state) {
    this.photos = state.photos;
    this.photo = state.photo;
  }

}
