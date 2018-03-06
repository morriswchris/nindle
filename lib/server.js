const express = require("express");
const calibre = require("./calibre");

module.exports = () => {
  const webserver = express();
  const port = process.env.PORT || 3001;
  const host = "0.0.0.0";
  const token = process.env.TOKEN;

  webserver.listen(port, host, function () {
    console.log(`Express webserver configured and listening on ${host}:${port}!`)
  });

  webserver.all('/', function(req, res, next) {
    res.send("Nindle");
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
      res.sendStatus(200);
      calibre(req.params.recipe);
    }
  });
}