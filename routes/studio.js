// var express = require('express'),
// 	db    = require('nano')('https://a12f00f3-b761-4132-8873-73cfe07030b1-bluemix.cloudant.com/my_sample_db/_all_docs');
var async = require('async');
var $ = require('jquery');

exports.list = function(req, res){
	var studios = [],
		location = req.body.studioLocation,
		budget = req.body.budget;
	console.log(location, budget);
	db.list({include_docs: true}, function(err, data) {
	  if (!err) {
	  	data.rows.forEach(function(doc) {
	  		var studio = doc.doc;
	  		if(location.toLowerCase().indexOf("all") != -1 && (!budget ||parseInt(studio.price) <= budget)){
	  			// console.log(studio.price, budget);
	  			studios.push(studio);
	  		}else{
	  			if(studio.location && studio.location.toLowerCase().indexOf(location.toLowerCase()) != -1){
	  				studios.push(studio);
	  			}
	  		}
	  	});
	  }
    res.render('studio', { location: location, studios: studios, budget: budget});
	});

};


