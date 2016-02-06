import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";

import Photo from "../components/Photo";
import PhotoMeta from "../components/PhotoMeta";

@connectToStores(["PhotoStore"], (context, props) =>
  ({ photo: context.getStore("PhotoStore").get(props.id) })
)
export default class PhotoPage extends Component {

  static propTypes = {
    photo: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired
  }

  render() {
    const { photo } = this.props;
    const { id } = this.props;
   //I TOOK OUT THE IMAGE WIDHT AND HEIGHT OUT OF THE URL, SO IT WOULD RENDER TO IT'S ACTUAL DIMENSIONS
   var imageUrl =  'https://surfphotos.imgix.net/' + id + '.jpeg?q=80&fm=pjpg&usm=10&fit=scale&markalpha=100&mark=http%3A%2F%2Fgoo.gl%2FEbdw92&markw=.4&vib=10&markalign=center%2Cmiddle&txt=papaRatzi.com&txtalign=left%2C+bottom&txtclr=%23ffffff&txtfont=Verdana+Bold&txtshad=20&txtsize=20';
    const imgStyle = {
      backgroundImage: `url(${imageUrl})`, //EXAMPLE OF ES6 STRING INTERPOLATION
      backgroundSize: '100% 100%', //STRETCHES BACKBROUND IMAGE TO FIT ON NAVLINK ANCHOR ELEMENT
      height: 250, //SETTING THE HEIGHT AND WIDTH, SETS THE DIMENSIONS OF THE DIV, SO THE BACKGROUND IMAGE HAS SOMETHING TO FILL
      width: 350,//OMIT THE 'px' ON INLINE STYLES
      margin: 'auto' //CENTERS IMAGE IN PAGE
    };

    console.log('PROPS AVAILABLE IN PHOTO PAGE: ', this.props);
    return (
      <div style={imgStyle}>
        {/*// <h1>{ photo.name }</h1>
        // <PhotoMeta photo={ photo } />
        // <Photo imageSize={ 4 } photo={ photo } />*/}
      </div>
    );
  }

}
