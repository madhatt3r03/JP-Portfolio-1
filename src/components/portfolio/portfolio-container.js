import React, { Component } from "react";

import PortfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component {
  constructor() {
    super();

    this.state = {
      pageTitle: "Welcome to my portfolio",
      isLoading: false,
      data: [
        { title: "Outkast", category: "eCommerce", slug: 'outkast' },
        { title: "KidCudi", category: "Scheduling", slug: 'kidcudi' },
        { title: "J.I.D.", category: "Enterprise", slug: 'j.i.d' },
        { title: "JCole", category: "eCommerce", slug: 'j-cole' }
      ]
    };

    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter(filter) {
    this.setState({
        data: this.state.data.filter(item => {
            return item.category === filter;
        })
    })
  }

  portfolioItems() {
    return this.state.data.map(item => {
      return <PortfolioItem title={item.title} url={"google.com"} slug={item.slug} />;
    });
  }


  render() {
    if (this.state.isLoading) {
        return <div>Loading...</div>
    }


    return (
      <div>
        <h2>{this.state.pageTitle}</h2>

        <button onClick={() => this.handleFilter('eCommerce')}>
            eCommerce
        </button>
        <button onClick={() => this.handleFilter('Scheduling')}>
            Scheduling
        </button>
        <button onClick={() => this.handleFilter('Enterprise')}>
            Enterprise
        </button>

        {this.portfolioItems()}

      </div>
    );
  }
}