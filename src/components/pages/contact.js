import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import contactPagePicture from "../../../static/assets/images/auth/blog-pics/aliens.jpg";

export default function() {
	return (
		<div className="content-page-wrapper">
			<div
				className="left-column"
				style={{
					background: "url(" + contactPagePicture + ") no-repeat",
					backgroundSize: "cover",
					backgroundPosition: "center"
				}}
			/>
			<div className="right-column">
				<div className="contact-bullet-points">
					<div className="bullet-point-group">
						<div className="icon">
							<FontAwesomeIcon icon="phone" />
						</div>
						<div className="text">333-333-3333</div>
					</div>

					<div className="bullet-point-group">
						<div className="icon">
							<FontAwesomeIcon icon="envelope" />
						</div>
						<div className="text">John@example.com</div>
					</div>

					<div className="bullet-point-group">
						<div className="icon">
							<FontAwesomeIcon icon="map-marked-alt" />
						</div>
						<div className="text">Saint George, UT</div>
					</div>
				</div>
			</div>
		</div>
	);
}
