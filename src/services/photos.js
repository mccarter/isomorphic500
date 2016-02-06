
//===============Amazon Stuff
import AWS from "aws-sdk";
AWS.config.region = 'us-west-2';
import config from "../config";

//Amazon S3 Keys
const S3Key = config.AWS_ACCESS_KEY_ID;
const S3Secret = config.AWS_SECRET_ACCESS_KEY;

import knox from 'knox';

//=================Amazon Stuff

// Fetchr service to load photos for the given feature.

export default {
  name: "photos",

  read(req, resource, params, config, done) {
    var client = knox.createClient({
      key: S3Key,
      secret: S3Secret,
      bucket: 'surfphotos'
    });

    client.list({ prefix: '' }, function(err, data){
      if (err) {
        if (err.status) {
          // Normalize statusCode vs. status
          err.statusCode = err.status;
        }

        return done(err);
      }
      /* `data` will look roughly like:
      {
        Prefix: 'my-prefix',
        IsTruncated: true,
        MaxKeys: 1000,
        Contents: [
          {
            Key: 'whatever'
            LastModified: new Date(2012, 11, 25, 0, 0, 0),
            ETag: 'whatever',
            Size: 123,
            Owner: 'you',
            StorageClass: 'whatever'
          },
          ⋮
        ]
      }

      */
      var transformations = 'q=80&fm=pjpg&usm=10&w=500&h=300&fit=scale&markalpha=100&mark=http%3A%2F%2Fgoo.gl%2FEbdw92&markw=.4&vib=10&markalign=center%2Cmiddle&txt=papaRatzi.com&txtalign=left%2C+bottom&txtclr=%23ffffff&txtfont=Verdana+Bold&txtshad=20&txtsize=20';
      var photoUrls = data.Contents.map((photo, index) => {
        return `https://surfphotos.imgix.net/${photo.Key}?${transformations}`;
      });

      done(null, photoUrls);//sends photo urls back to client

    });
  }
};
