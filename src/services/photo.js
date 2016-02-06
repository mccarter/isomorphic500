import { get } from "../utils/APIUtils";

// Fetchr service to load a photo given an id.

export default {
  name: "photo",

  read(req, resource, { id, imageSize=1600 }, config, done) {
    // const query = {
    //   "image_size": imageSize
    // };
    // const options = {
    //   locale: req.locale
    // };
    // get(`/photos/${id}`, query, options, done);

    var transformations = 'q=80&fm=pjpg&usm=10&w=500&h=300&fit=scale&markalpha=100&mark=http%3A%2F%2Fgoo.gl%2FEbdw92&markw=.4&vib=10&markalign=center%2Cmiddle&txt=papaRatzi.com&txtalign=left%2C+bottom&txtclr=%23ffffff&txtfont=Verdana+Bold&txtshad=20&txtsize=20';
    var url = `https://surfphotos.imgix.net/${id}?${transformations}`;
    done(null, url);

  }

};
