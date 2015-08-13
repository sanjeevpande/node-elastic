'use strict';

var elasticsearchclient = require('../utils/elasticsearchclient.js');

var model = {

	saveData : function(data, callback){
		
		elasticsearchclient.index({
			index: 'employee',
		  	type: 'developer',
		  	body: data
		}, 
	  	function (err, resp) {
		  	if (err) {
			    console.trace('Error in saving the index.');
		  	} else {
		  		console.log('Index saved successfully : ');
		  		for(var x in resp){
		  			console.log(x + ' : ' + resp[x]);
		  		}
			    callback('Saved successfully');
		  	}
		});
	},

	fetchData : function(data, callback){

		var queryObj;
		if(!data){
			queryObj = {match_all: {}};
		}
		else{
			queryObj =  {
	                        wildcard: {
	                            name: "*" + data.toLowerCase() + "*"
	                        }
	                    };
		}

		elasticsearchclient.search({
			index: 'employee',
			type: 'developer',
		  	size: 50,
		  	body: {
			    query: queryObj
			}
		}).then(function (resp) {
			var hits = resp.hits.hits;
		  	callback(hits);
		});
	}
}

module.exports = model;