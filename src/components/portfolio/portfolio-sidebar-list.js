import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
// always need to import React for any components built in React

const PortfolioSidebarList = (props) => {
	const portfolioList = props.data.map((portfolioItem) => {
		return (
			<div key={portfolioItem.id} className="portfolio-item-thumb">
				<div className="portfolio-thumb-img">
					<img src={portfolioItem.thumb_image_url} />
					{/* this is to get access to the images for each portfolioItem. The names thumb_image_url, name
                    and id each come from the devcamp.space where the items are located.  */}
				</div>

				<div className="text-content">
					<div className="title">{portfolioItem.name}</div>

					<div className="actions">
						<a className="action-icon" onClick={() => props.handleEditClick(portfolioItem)}>
							<FontAwesomeIcon icon="edit" />
						</a>
						<a className="action-icon" onClick={() => props.handleDeleteClick(portfolioItem)}>
							<FontAwesomeIcon icon="dumpster" />
						</a>
					</div>
				</div>
			</div>
		);
	});
	// We created a function to map over the portfolioItem data(which is what we called the prop) and the map
	// function iterates and returns each item in the array. Then we ret																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																					urn a div that contains a name and id
	// (h1 and h2) then we returned the portfolioList function in a div below.

	return <div className="portfolio-sidebar-list-wrapper">{portfolioList}</div>;
};

export default PortfolioSidebarList;
