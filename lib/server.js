const express = require("express");
const calibre = require("./calibre");

module.exports = () => {
  const webserver = express();
  const port = process.env.PORT || 3001;
  const token = process.env.TOKEN;

  webserver.listen(port, null, function () {
    console.log(`Express webserver configured and listening on port: ${port}!`)
  });

  webserver.all('/run/:recipe', function (req, res, next) {
    //if a token is specified by env, check prior to execution
    if (token && !(req.query.token && req.query.token === token)) {
      {
        console.log("Error: bad token supplied");
        res.sendStatus(401);
      }
    }
    else {
      console.log(req.query);
      calibre(req.params.recipe);
      res.sendStatus(200);
    }
  });
}