import React from 'react';
import ReactDOM from 'react-dom';
import RestaurantCard from './components/RestaurantCard.jsx';
// import '../dist/styles.css';
import Footer from './components/Footer.jsx';
import axios from 'axios';

export default class Nearby extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      currentRestaurant: this.props.currentRestaurant || {},
      nearbyRestaurants: this.props.nearbyRestaurants || [],
      checkID: true
    }
	}

  componentDidMount() {
		if (this.state.currentRestaurant = {}) {
			this._getData();
		}
  }

  _getData() {
		const id = this.props.placeId || window.location.href.split('/')[4];
		if (id !== undefined) {
			axios.get(`${BASE_URL}/api/restaurants/${id}/nearby`)
			// axios.get(`/api/restaurants/${id}/nearby`)
			.then(({data}) => {
				this.setState({
					currentRestaurant: data.restaurant,
					nearbyRestaurants: data.nearby,
				})
			})
			.catch((err) => {
	    	throw err;
	  	})
		}	else {
      this.setState({
        checkID: false
      })
    }
  }

  _goToRestaurant(id) {
    console.log('go to restaurant ' + id)
    location.href = '/restaurants/' + id;
  }

	render() {
    let restaurantCards = this.state.nearbyRestaurants.map((num, index) => {
      return (
        <RestaurantCard nearbyRestaurant={this.state.nearbyRestaurants[index]} key={index.toString()} switchRestaurant={this._goToRestaurant.bind(this)} />
      )
    })


		return (
			<div className="nearby-padding">
				<div className="restaurant-header">Restaurants Near {this.state.currentRestaurant.name ? this.state.currentRestaurant.name : "none"}</div>
        <div className="restaurant-cards">
				{restaurantCards}
        </div>
        <Footer />
			</div>
		)
	}
}

// ReactDOM.render(<App />, document.getElementById('nearby-app'));
