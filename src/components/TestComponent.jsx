var React           = require('react');

var TestComponent = React.createClass({
  	render: function() {
	    return (
	    	<div>
	    		<div>
			      	<SaveComponent />
			      	<FetchComponent />
			    </div>
			    <div id='grid'>
			    	
			    </div>		
	    	</div>
	    );
  	}
});

var GridComponent = React.createClass({
  	render: function() {
  		
  		var data;

  		try{
  			data = JSON.parse(this.props.results);
  		}
  		catch(err){
  			data = this.props.results;
  		}

  		if(!data.length){
			return <div>No data found !</div>
		}

		if(!(data instanceof Array)){
			return <div>{data}</div>
		}

		return (
	      <div>
				{data.map(function(result){
					return <div className='grid-content'>
							Name : <span>{result._source.name}, </span>
							id : <span>{result._id}</span>
						</div>
				})}

			</div>
	    );
  	}
});

var FetchComponent = React.createClass({
  	fetchData: function(){
  		var url = '/fetchData';
		var xmlhttp = new XMLHttpRequest();
		var _self = this;
		var searchInput = React.findDOMNode(_self.refs.searchInput).value;
		xmlhttp.onreadystatechange=function(){
			if (xmlhttp.readyState==4 && xmlhttp.status==200){
				_self.onSuccess(xmlhttp.responseText);
		    }
		}
		xmlhttp.open("GET", url+'?searchInput='+searchInput,true);
		xmlhttp.send();
  	},
  	onSuccess: function(responseText){
  		console.log("Success.");
  		console.log(responseText);
  		React.render(<GridComponent results={responseText}/>, document.getElementById('grid'));
  	},
  	render: function() {
	    return (
	      <div>
	      	<input ref="searchInput" type="text" placeholder="Enter field name to search" id="search" />
	      	<button onClick={this.fetchData}>Fetch</button>
	      </div>
	    );
  	}
});


var SaveComponent = React.createClass({
  	saveData: function(){
  		var url = '/saveData';
		var xmlhttp = new XMLHttpRequest();
		var _self = this;
		var data = {
			nameInput : React.findDOMNode(_self.refs.nameInput).value
		};
		if(!data.nameInput){
			React.render(<GridComponent results='Please enter valid name'/>, document.getElementById('grid'));
			return;
		}
		xmlhttp.onreadystatechange=function(){
			if (xmlhttp.readyState==4 && xmlhttp.status==200){
				_self.onSuccess(xmlhttp.responseText);
		    }
		}
		xmlhttp.open("POST", url,true);
		xmlhttp.setRequestHeader("Content-type","application/json");
		xmlhttp.send(JSON.stringify(data));
  	},
  	onSuccess: function(responseText){
  		console.log("Success.");
  		console.log(responseText);
  		React.render(<GridComponent results={responseText}/>, document.getElementById('grid'));
  		React.findDOMNode(this.refs.nameInput).value = '';
  	},
  	render: function() {
	    return (
	      <div>
	      	<input ref="nameInput" type="text" placeholder="Enter your name" id="name" />
	      	<button onClick={this.saveData}>Save</button>
	      </div>
	    );
  	}
});
module.exports = TestComponent;