'use strict';

import logo from '../../public/images/ubuntu128.png';
import smallLogo from '../../public/images/ubuntuLogo40.png';
import React from 'react';

var Header = React.createClass({
	getInitialState : function() {
	    return {tabBarFixedStyle: {'position' : 'absolute'}, tabBarLogo: {'display' : 'none'}, tabs: {'padding-left' : '100px'}};
	},
	fixTabBar : function(e) {
		var target = e.currentTarget;
		if (target.scrollY > 192) { //banner height is 192px
		    this.setState({tabBarFixedStyle: {'position' : 'fixed', 'top' : 0}});
		} 
		else {
		    this.setState({tabBarFixedStyle: {'position' : 'absolute'}});
		}
	},
	componentDidMount: function(){
	    window.addEventListener('scroll', this.fixTabBar.bind(this));
	},
	render: function() {
		return (
			<div className="header">
				<div className="banner">
					<span><img src={logo} /></span>
					<span className="bannerName"></span>
				</div>
				<div className="tab-bar" style={this.state.tabBarFixedStyle}>
					<div style={this.state.tabBarLogo} className="tab-logo">
						<span><img src={smallLogo} /></span>
					</div>
					<ul className="tabs" style={this.state.tabs}>
						<li>Create</li>
						<li>View</li>
						<li>Notifications</li>
					</ul>
				</div>
			</div>
		);
	}
});

var Footer = React.createClass({
	render() {
		return (
			<div className="footer">
				<ul>
					<li></li>
				</ul>
			</div>
		);
	}
});

var Layout = React.createClass({
	render() {
		return (
			<div>
				<Header />
				<div className="content">
					{this.props.children}
					<Footer />
				</div>
				
			</div>
		);
	}
});

export default Layout;