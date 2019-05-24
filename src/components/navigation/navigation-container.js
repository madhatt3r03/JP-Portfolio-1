import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// using axios to communicate to the logout endpoint
import { withRouter } from 'react-router';
// withRouter is name of HOC(Higher Order Component)
import { NavLink } from 'react-router-dom';

// Refactored Component, reverted a class component back to a functional one by taking away the constructor and super,
// if an already built class component is not using State or any lifecycle hooks and also taking away unnecessary code
const NavigationContainer = (props) => {
	// dynamicLink variable function built so that we can just call the variable name inside ternary operator(minimizes code needed!)
	const dynamicLink = (route, linkText) => {
		return (
			<div className="nav-link-wrapper">
				<NavLink to={route} activeClassName="nav-link-active">
					{linkText}
				</NavLink>
			</div>
		);
	};

	const handleSignOut = () => {
		axios
			.delete('https://api.devcamp.space/logout', { withCredentials: true })
			.then((response) => {
				// "delete" verb in axios is used to discontinue session, using withCredentials to authenticate ourself (auth user)
				if (response.status === 200) {
					// if status equals 200 (meaning that everything worked), push back to homepage(/)
					props.history.push('/');
					props.handleSuccessfulLogout();
					// props called here to update state to LOGGED_OUT
				}
				return response.data;
				// return response.data doesn't necessarily need to return anything only used because of (.then) promise
			})
			.catch((error) => {
				console.log('Error signing out', error);
			});
	};

	return (
		<div className="nav-wrapper">
			<div className="left-side">
				<div className="nav-link-wrapper">
					<NavLink exact to="/" activeClassName="nav-link-active">
						Home
					</NavLink>
				</div>

				<div className="nav-link-wrapper">
					<NavLink to="/about-me" activeClassName="nav-link-active">
						About
					</NavLink>
				</div>

				<div className="nav-link-wrapper">
					<NavLink to="/contact" activeClassName="nav-link-active">
						Contact
					</NavLink>
				</div>

				<div className="nav-link-wrapper">
					<NavLink to="/blog" activeClassName="nav-link-active">
						Blog
					</NavLink>
				</div>

				{props.loggedInStatus === 'LOGGED_IN' ? dynamicLink('/portfolio-manager', 'Portfolio Manager') : null}
				{/*Ternary Operator serving as a conditional for blog link to only be accessed while logged in */}
			</div>

			<div className="right-side">
				John Phillips
				{props.loggedInStatus === 'LOGGED_IN' ? (
					<a onClick={handleSignOut}>
						<FontAwesomeIcon icon="sign-out-alt" />
					</a>
				) : null}
			</div>
		</div>
	);
};

export default withRouter(NavigationContainer);

// Higher Order Component allows us to combine specific functions (In this case gives us the ability to access to the
// history that we'd normally have inside the auth router) to our navigation-container component to
// form a "merged component."
