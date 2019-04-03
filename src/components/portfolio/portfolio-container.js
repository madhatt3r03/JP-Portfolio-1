import React, { Component } from 'react';

import PortfolioItem from "./portfolio-item";
 
export default class PortfolioContainer extends Component {
    constructor() {
        super();

        
        console.log("Portfolio container has rendered");
    }

    portfolioItems() {
        const data = ["Mainstream", "OffDaZoinkys", "LoveIsAlwaysThere"];

        return data.map(item => {
            return <PortfolioItem title={item} />;
        })
    }


    render() {
        return (
            <div>
                <h2>Portfolio items goes here...</h2>

                {this.portfolioItems()}
            </div>
        )
    }
}