'use strcit';

var elasticsearch = require('elasticsearch');

var elasticsearchclient = new elasticsearch.Client({
	host: 'localhost:9201',
  	log: 'trace'
});

elasticsearchclient.ping({
  	// ping usually has a 3000ms timeout 
  	requestTimeout: Infinity,
 
  	// undocumented params are appended to the query string 
  	hello: "elasticsearch!"
}, function (error) {
  	if (error) {
	    console.trace('elasticsearch cluster is down!');
  	} else {
	    console.log('All is well');
  	}
});

module.exports = elasticsearchclient;