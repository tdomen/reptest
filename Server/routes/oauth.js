var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
var client = require('cheerio-httpcli');//スクレイピング用
var WSS = require('ws').Server;
var request = require('request');
var headers = {'Content-Type':'application/json'};

//自作jsの読み込み
var slackRequests = require('../public/javascripts/server/SlackRequest');
var IPv4 = require('./modules/getMyIP');

const AccessToken = require('../models/accesstoken');

var slack_client_id = '254821626421.255281971077';
var slack_client_secret = '6dbab0ed4bfeb2f602d0831e1edcaf47';

var github_client_id = '9bd1ccc0db7adf39ff87';
var github_client_secret = 'f425b4c195b08d2099ba2e8e2847f8562944324f';

// var hostURL = 'http://13.115.41.122:3000';
// var hostURL = 'https://172.20.11.172:3000';

var hostURL = 'https://192.168.128.102:3000';

var slack_access_token;
var github_access_token;
var musicid = 0;
var videoID;
var messageJson;

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("GET request to the /")
  res.render('index',
    { title: 'Express' ,
      token: ""
    });
});

//slack appのoauth認証
router.get('/slack', function(req, res, next) {
  console.log('GET request to the /oauth/slack');

  var options = {
    url: 'https://slack.com/api/oauth.access?client_id='+slack_client_id
      +'&client_secret='+slack_client_secret
      +'&code='+req.query.code
      +'&redirect_uri='+hostURL+'/oauth/slack',
    json: true
  };

  request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      slack_access_token = body.access_token;

      console.log(body.scope+'\n');
      console.log('Slack Token : '+slack_access_token+'\n');
      res.redirect('https://github.com/login/oauth/authorize?'
        +'client_id='+github_client_id
        +'&redirect_uri='+hostURL+'/oauth/github');//Slackのoauth認証後はGithubのoauth認証へ
    } else {
      console.log('error: '+ response.statusCode);
    }
  });
});

//github app のoauth認証
router.get('/github', function(req, res, next) {
  console.log('GET request to the /oauth/github');

  var options = {
    url: 'https://github.com/login/oauth/access_token?client_id='+ github_client_id
      +'&client_secret='+github_client_secret
      +'&code='+req.query.code,
    json: true
  };

  request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      github_access_token = body.access_token;
      console.log('Github Token : '+github_access_token+'\n');
      res.redirect(hostURL+'/oauth/makechannel');//Githubのoauth認証後はSlackのチャンネル生成へ
    } else {
      console.log('error: '+ response.statusCode);
    }
  });
});

router.get('/makechannel', function(req, res, next) {
  console.log('GET request to the /oauth/makechannel');
  AccessToken.find({"slack": slack_access_token},function(err,result){
    if (err) console.log(err);
    AccessToken.count(function(err,allAccessTokenNum){
      if (err) console.log(err);
       // 新規登録
      if (result.length == 0){
        var accesstoken = new AccessToken();
        accesstoken.id = allAccessTokenNum;
        accesstoken.slack  = slack_access_token;
        accesstoken.github = github_access_token; 
        
        accesstoken.save(function(err){
          if (err) console.log(err);
        });
      }
    })
    // res.json({ 'status' : 200 });
  });
  console.log('Slack Token : '+slack_access_token+'\n');
  console.log('Github Token : '+github_access_token+'\n');

  slackRequests.makeChannnel(slack_access_token,'regist DB test');


  res.redirect(hostURL+'/regist/schema');//チャンネル生成後は/regist/schemaへ
  // res.redirect(hostURL+'/main');//チャンネル生成後はmainへ
  
});
module.exports = router;
