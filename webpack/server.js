/* eslint no-console: 0 */

import WebpackDevServer from "webpack-dev-server";
import webpack from "webpack";
import config from "./dev.config";

const host = process.env.HOST || "0.0.0.0";
const port = (process.env.PORT + 1) || 3001;//we add a plus 1 here to ensure that this is the only application running on that port with no conflicts.

const options = {
  contentBase: `http://${host}:${port}`,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
};

export default function() {

  const compiler = webpack(config);
  const webpackDevServer = new WebpackDevServer(compiler, options);

  return webpackDevServer.listen(port, host, function() {
    console.log("Webpack development server listening on %s:%s", host, port);
  });
}
