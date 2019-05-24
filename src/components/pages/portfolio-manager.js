import React, { Component } from 'react';
import axios from 'axios';

import PortfolioSidebarList from '../portfolio/portfolio-sidebar-list';
import PortfolioForm from '../portfolio/portfolio-form';

export default class PortfolioManager extends Component {
	// We need to call the constructor and super to use "this.state" and and to bind the initial state with
	// "this.setState" to change that initial value(this.state)
	constructor() {
		super();

		this.state = {
			portfolioItems: [],
			portfolioToEdit: {}
		};

		this.handleNewFormSubmission = this.handleNewFormSubmission.bind(this);
		this.handleEditFormSubmission = this.handleEditFormSubmission.bind(this);
		this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
		this.handleDeleteClick = this.handleDeleteClick.bind(this);
		this.handleEditClick = this.handleEditClick.bind(this);
		this.clearPortfolioToEdit = this.clearPortfolioToEdit.bind(this);
		// So these binding methods are used to bind the functions right below to the PortfolioForm component
		// far down below. Need to do more research and bind methods and their purposes.
	}

	clearPortfolioToEdit() {
		this.setState({
			portfolioToEdit: {}
		});
	}
	// this function above's only job is returning the portfolioToEdit to an empty object.

	handleEditClick(portfolioItem) {
		this.setState({
			portfolioToEdit: portfolioItem
		});
	}

	handleDeleteClick(portfolioItem) {
		axios
			.delete(`https://api.devcamp.space/portfolio/portfolio_items/${portfolioItem.id}`, {
				withCredentials: true
			})
			.then((response) => {
				this.setState({
					portfolioItems: this.state.portfolioItems.filter((item) => {
						return item.id !== portfolioItem.id;
					})
				});

				return response.data;
				// we're using setState here to update my local server with remaining portfolioItems by filtering
				// through them. (item) is a variable function we're calling with the action of returning all the
				// item.ids(portfolioItems) except the one with the id we deleted
			})
			.catch((error) => {
				console.log('handleDeleteClick error', error);
			});
	}

	handleEditFormSubmission() {
		this.getPortfolioItems();
	}

	handleNewFormSubmission(portfolioItem) {
		this.setState({
			portfolioItems: [ portfolioItem ].concat(this.state.portfolioItems)
			// this HandleSuccessfulFormSubmission uses setState to updated the submission of a new portfolio item
			// and also uses concat to combine/connect with the other portfolio items(this.state.portfolioItems)
		});
	}

	handleFormSubmissionError(error) {
		console.log('handleFormSubmissionError', error);
	}

	getPortfolioItems() {
		axios
			.get('https://johnphillips.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc', {
				// (?order_by=created_at&direction=desc) this allows newly created portfolioitems to stack on top of
				// pre-existing ones, even after refreshing the page
				withCredentials: true
				// axios is used here to communicate with the API to grab the items from devcamp.space, using withCredentials
				// to verify the authorized user
			})
			.then((response) => {
				this.setState({
					portfolioItems: [ ...response.data.portfolio_items ]
				});
				// then is used to receive the items after getting a "response" from calling the API
			})
			.catch((error) => {
				// catch is used to "catch" any errors if there are any from our request.
				console.log('error in getPortfolioItems', error);
			});
	}

	componentDidMount() {
		this.getPortfolioItems();
	}
	// still researching componentDidMount and lifecycle methods, keep researching until makes sense.

	render() {
		return (
			<div className="portfolio-manager-wrapper">
				<div className="left-column">
					<PortfolioForm
						handleNewFormSubmission={this.handleNewFormSubmission}
						handleEditFormSubmission={this.handleEditFormSubmission}
						handleFormSubmissionError={this.handleFormSubmissionError}
						clearPortfolioToEdit={this.clearPortfolioToEdit}
						portfolioToEdit={this.state.portfolioToEdit}
					/>
				</div>

				<div className="right-column">
					<PortfolioSidebarList
						handleDeleteClick={this.handleDeleteClick}
						data={this.state.portfolioItems}
						handleEditClick={this.handleEditClick}
					/>
					{/* so data is a prop passed into PortfolioSidebarList. It takes in the initial state(this.state) of 
                    portfolioItems and populates it when we call get portfolioItems using axios and we pass that 
					to props(data)   */}

					{/* the prop(handleDeleteClick function) makes the "call" to axios to delete the 
				record from the API using that record's ID  */}
				</div>
			</div>
		);
	}
}
