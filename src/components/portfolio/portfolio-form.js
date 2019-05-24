import React, { Component } from "react";
import axios from "axios";
import DropzoneComponent from "react-dropzone-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";

// Nothing works without imports; you could write functions and methods below but you need to import them.

export default class PortfolioForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			description: "",
			category: "eCommerce",
			position: "",
			url: "",
			thumb_image: "",
			banner_image: "",
			logo: "",
			editMode: false,
			apiUrl: "https://johnphillips.devcamp.space/portfolio/portfolio_items",
			apiAction: "post"
		};
		// this is the Constructor method; We use the Constructor to call State and use props.
		// State means the initial state of your Application before any changes/updates(setState) are initiated.

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.componentConfig = this.componentConfig.bind(this);
		this.djsConfig = this.djsConfig.bind(this);
		this.handleThumbDrop = this.handleThumbDrop.bind(this);
		this.handleBannerDrop = this.handleBannerDrop.bind(this);
		this.handleLogoDrop = this.handleLogoDrop.bind(this);
		this.deleteImage = this.deleteImage.bind(this);

		this.thumbRef = React.createRef();
		this.bannerRef = React.createRef();
		this.logoRef = React.createRef();
	}
	// these are binding methods; they bind the functions below to the constructor.

	deleteImage(imageType) {
		axios
			.delete(
				`https://api.devcamp.space/portfolio/delete-portfolio-image/${this.state.id}?image_type=${imageType}`,
				{ withCredentials: true }
			)
			.then((response) => {
				this.setState({
					[`${imageType}_url`]: ""
				});
			})
			.catch((error) => {
				console.log("deleteImage error", error);
			});
	}

	componentDidUpdate() {
		if (Object.keys(this.props.portfolioToEdit).length > 0) {
			const {
				id,
				name,
				description,
				category,
				position,
				url,
				thumb_image_url,
				banner_image_url,
				logo_url
			} = this.props.portfolioToEdit;

			this.props.clearPortfolioToEdit();

			this.setState({
				id: id,
				name: name || "",
				description: description || "",
				category: category || "eCommerce",
				position: position || "",
				url: url || "",
				editMode: true,
				apiUrl: `https://johnphillips.devcamp.space/portfolio/portfolio_items/${id}`,
				apiAction: "patch",
				thumb_image_url: thumb_image_url || "",
				banner_image_url: banner_image_url || "",
				logo_url: logo_url || ""
			});
		}
	}

	handleThumbDrop() {
		return {
			addedfile: (file) => this.setState({ thumb_image: file })
		};
	}

	handleBannerDrop() {
		return {
			addedfile: (file) => this.setState({ banner_image: file })
		};
	}

	handleLogoDrop() {
		return {
			addedfile: (file) => this.setState({ logo: file })
		};
	}

	componentConfig() {
		return {
			iconFiletypes: [ ".jpg", ".png" ],
			showFiletypeIcon: true,
			postUrl: "https://httpbin.org/post"
		};
	}

	djsConfig() {
		return {
			addRemoveLinks: true,
			maxFiles: 1
		};
	}

	buildForm() {
		let formData = new FormData();

		formData.append("portfolio_item[name]", this.state.name);
		formData.append("portfolio_item[description]", this.state.description);
		formData.append("portfolio_item[url]", this.state.url);
		formData.append("portfolio_item[category]", this.state.category);
		formData.append("portfolio_item[position]", this.state.position);

		if (this.state.thumb_image) {
			formData.append("portfolio_item[thumb_image]", this.state.thumb_image);
		}
		if (this.state.banner_image) {
			formData.append("portfolio_item[banner_image]", this.state.banner_image);
		}
		if (this.state.logo_image) {
			formData.append("portfolio_item[logo_image]", this.state.logo_image);
		}
		// .append() method inserts the specified content as the last child of each element in the jQuery collection

		return formData;
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
			// this allows us to target the event(handleChange) and setState updates the value of name in each input
			// to whatever we type into each parameter(name, description, URL etc...)
		});
	}

	handleSubmit(event) {
		axios({
			method: this.state.apiAction,
			url: this.state.apiUrl,
			data: this.buildForm(),
			withCredentials: true
		})
			.then((response) => {
				if (this.state.editMode) {
					this.props.handleEditFormSubmission();
				} else {
					this.props.handleNewFormSubmission(response.data.portfolio_item);
				}
				this.setState({
					name: "",
					description: "",
					category: "eCommerce",
					position: "",
					url: "",
					thumb_image: "",
					banner_image: "",
					logo: "",
					editMode: false,
					apiUrl: "https://johnphillips.devcamp.space/portfolio/portfolio_items",
					apiAction: "post"
				});

				[ this.thumbRef, this.bannerRef, this.logoRef ].forEach((ref) => {
					ref.current.dropzone.removeAllFiles();
				});
			})
			.catch((error) => {
				console.log("portfolio form handle error", error);
			});

		event.preventDefault();
		// event.preventDefault prevents the page from refreshing after hitting the save button.
	}
	// these are functions built out so that you can call them later in any part of the component. It
	// neatens the code.

	render() {
		return (
			<form onSubmit={this.handleSubmit} className="portfolio-form-wrapper">
				{/* this onSubmit works when we hit the save button it creates the synthetic event inside the virtual DOM */}
				<div>
					<div className="two-column">
						<input
							type="text"
							name="name"
							placeholder="Portfolio Item Name"
							value={this.state.name}
							onChange={this.handleChange}
						/>

						<input
							type="text"
							name="url"
							placeholder="URL"
							value={this.state.url}
							onChange={this.handleChange}
						/>
					</div>

					<div className="two-column">
						<input
							type="text"
							name="position"
							placeholder="Position"
							value={this.state.position}
							onChange={this.handleChange}
						/>

						<select
							name="category"
							value={this.state.category}
							onChange={this.handleChange}
							className="select-element"
						>
							<option value="Southern Movement">Southern Movement</option>
							<option value="NXT LVL">NXT LVL</option>
							<option value="Breakin' Barriers">Breakin' Barriers</option>
						</select>
					</div>

					<div className="one-column">
						<textarea
							type="text"
							name="description"
							placeholder="Description"
							value={this.state.description}
							onChange={this.handleChange}
						/>
					</div>

					<div className="image-uploaders">
						{this.state.thumb_image_url && this.state.editMode ? (
							<div className="portfolio-manager-image-wrapper">
								<img src={this.state.thumb_image_url} />

								<div className="image-removal-link">
									<a onClick={() => this.deleteImage("thumb_image")}>
										<FontAwesomeIcon icon="minus-circle" />
									</a>
								</div>
							</div>
						) : (
							<DropzoneComponent
								ref={this.thumbRef}
								config={this.componentConfig()}
								djsConfig={this.djsConfig()}
								eventHandlers={this.handleThumbDrop()}
							>
								<div className="dz-message">Thumbnail</div>
							</DropzoneComponent>
						)}

						{this.state.banner_image_url && this.state.editMode ? (
							<div className="portfolio-manager-image-wrapper">
								<img src={this.state.banner_image_url} />
								<div className="image-removal-link">
									<a onClick={() => this.deleteImage("banner_image")}>
										<FontAwesomeIcon icon="minus-circle" />
									</a>
								</div>
							</div>
						) : (
							<DropzoneComponent
								ref={this.bannerRef}
								config={this.componentConfig()}
								djsConfig={this.djsConfig()}
								eventHandlers={this.handleBannerDrop()}
							>
								<div className="dz-message">Banner</div>
							</DropzoneComponent>
						)}

						{this.state.logo_image_url && this.state.editMode ? (
							<div className="portfolio-manager-image-wrapper">
								<img src={this.state.logo_image_url} />
								<div className="image-removal-link">
									<a onClick={() => this.deleteImage("logo_image")}>
										<FontAwesomeIcon icon="minus-circle" />
									</a>
								</div>
							</div>
						) : (
							<DropzoneComponent
								ref={this.logoRef}
								config={this.componentConfig()}
								djsConfig={this.djsConfig()}
								eventHandlers={this.handleLogoDrop()}
							>
								<div className="dz-message">Logo</div>
							</DropzoneComponent>
						)}
					</div>

					<div>
						<button className="btn" type="submit">
							Save
						</button>
					</div>
				</div>
			</form>
		);
	}
}

// This Render method renders everything onto the page; anything that "returns" in a render is shown on the server.
