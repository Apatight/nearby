import React from 'react';
import ReactDOM from 'react-dom';
import RestaurantCard from './components/RestaurantCard.jsx';
import '../dist/styles.css';
import Footer from './components/Footer.jsx';
import $ from 'jquery';
import axios from 'axios';

class App extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      currentRestaurant: {},
      nearbyRestaurants: [],
      checkID: true
    }
	}

  componentDidMount() {
    this._getData();
  }

  _getData() {
    // console.log('window location.href: ', window.location.href);

    var id = window.location.href.split('/')[4];
    // console.log('getting recommended restaurants for id: ' + id)

    //error handling if id is included in URL
    if (window.location.href.split('/')[4] !== undefined) {
			axios.get(`/api/restaurants/${id}/nearby`)
			// axios.get(`${BASE_URL}/api/restaurants/${id}/nearby`)
			.then(({data}) => {
				// console.log('axios got', data )
				this.setState({
					currentRestaurant: data[0],
					nearbyRestaurants: data[1]
				})
			})
			.catch((err) => {
      	throw err;
    	})
		} else {
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

ReactDOM.render(<App />, document.getElementById('nearby-app'));
