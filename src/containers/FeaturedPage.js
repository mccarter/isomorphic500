import React, { PropTypes } from "react";
import { connectToStores } from "fluxible-addons-react";

import Thumbnail from "../components/Thumbnail";

if (process.env.BROWSER) {
  require("../style/ThumbnailCollection.scss");
}

@connectToStores(["FeaturedStore"], context => {
  const photoUrls = context.getStore("FeaturedStore").getPhotos();
  const photoUrl = context.getStore("PhotoStore").getPhotoUrl();
  // const ids = context.getStore("FeaturedStore").getFeaturedPhotos();
  // const photos = context.getStore("PhotoStore").getMultiple(ids);
  return {
    photoUrls: photoUrls
  };
})
export default class FeaturedPage extends React.Component {

  static propTypes = {
    photoUrls: PropTypes.array.isRequired
  }

  getId(url) {//gets photo ID from imigx.net image url;
    var splitOnSlashes = url.split('?')[0].split('/');
    return splitOnSlashes[splitOnSlashes.length - 1].split('.')[0];
  }

  render() {
    console.log('///LIST OF PHOTO URLS: ', this.props.photoUrls);
    const { photoUrls } = this.props;//photo is the image url. ex: https://surfphotos.imgix.net/100.jpeg?q=80&fm=pjpg…ffffff&txtfont=Verdana+Bold&txtshad=20&txtsize=20"
    return (
      <div>
        <div className="ThumbnailCollection">{/*THIS IS THE CLASSNAME THAT HOLDS ALL THE IMAGE THUMBNAILS*/}
          {
            photoUrls.map((photoUrl, index) =>
              <Thumbnail size="small" photoUrl={ photoUrl } index={index} id={this.getId(photoUrl)} />
            )
          }
        </div>
      </div>
    );
  }

}
