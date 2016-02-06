import { BaseStore } from "fluxible/addons";
import Actions from "../constants/Actions";

/*
This is a "list store", i.e. it holds only ids referring to another
"resource store". This one keeps the `id` of the photos in PhotoStore
when the featured photos has been loaded.
 */

export default class FeaturedStore extends BaseStore {

  static storeName = "FeaturedStore"

  static handlers = {
    [Actions.LOAD_PHOTOS_SUCCESS]: "handleLoadSuccess"
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.photoUrls = [];
    this.currentFeature = null;
  }

  handleLoadSuccess({ photoUrls }) {
    //this.dispatcher.waitFor("PhotoStore", () => {//What is this.dispatcher.waitFor????
      this.photoUrls = photoUrls;
      this.emitChange();
    //});
  }

  getPhotos() {
    return this.photoUrls;
  }

  getCurrentFeature() {
    return this.currentFeature;
  }

  dehydrate() {
    return {
      featured: this.featured,
      currentFeature: this.currentFeature
    };
  }

  rehydrate(state) {
    this.featured = state.featured;
    this.currentFeature = state.currentFeature;
  }

}
