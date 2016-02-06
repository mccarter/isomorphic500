import React, { PropTypes } from "react";

import { NavLink } from "fluxible-router";

if (process.env.BROWSER) {
  require("../style/Thumbnail.scss");
}

export default class Thumbnail extends React.Component {

  static propTypes = {
    photoUrl: PropTypes.object.isRequired,
    index: PropTypes.object.isRequired
  }

  render() {
    const { photoUrl } = this.props;
    const style = {
      backgroundImage: `url(${photoUrl})`, //EXAMPLE OF ES6 STRING INTERPOLATION
      backgroundSize: '100% 100%' //STRETCHES BACKBROUND IMAGE TO FIT ON NAVLINK ANCHOR ELEMENT
    };
    let index = this.props.index;
    // <NavLink className="Thumbnail" style={ style } routeName="photo" navParams={ {id: photo.id} } />
    return (
      //The navParams will be used together with the routeName to form the href for the link. ex: photo/100
      //https://github.com/yahoo/flux-router-component/blob/master/docs/navlink.md
      <NavLink key={ index } routeName="photo" navParams={ {id: this.props.id} } className="Thumbnail" style={ style } />
    );
  }

}
