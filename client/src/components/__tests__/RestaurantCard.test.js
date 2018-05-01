import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';
import RestaurantCard from '../RestaurantCard.jsx';
import PhotoCarousel from '../PhotoCarousel.jsx';
import RestaurantDetails from '../RestaurantDetails.jsx';

Enzyme.configure({ adapter: new Adapter() });

test('Restaurant Card shallow copy should be equal to Snapshot', () => {
    const wrapper = shallow(
        <RestaurantCard />
    );
    expect(wrapper).toMatchSnapshot();
});

const restaurant = 
    { photos: 
     [ 'CmRaAAAArs7yP4EYbcPwgoJoIBwOzTw0zTk1TV6P_vP9yaSvzduoNi2UWwivXVeGr9XgE-CiZvDEpIq_2_RontnFoLsQWi1RWnD6Llx8-_Ah5PQPDdMtWEbwovN3kldRkDxV90XsEhBy_H4_YZZMeYZC74FOcmteGhS7Faa_ZVw06Wc_Y8XeSR7JdlTbug',
       'CmRaAAAAaRvIH2tVgPOYsiYRvxBj1v-mF9C3uuloDlUfwfZFzyLAacNuU1aIRosUfU3ielQGZl-F4RKtfsLUtwbHZTw3i6LQ8jexB4iY9yV2nkmeEKljtg5fBItzqyvi2cKISnPUEhCNTLMtLLVXS7aXoxMaltpwGhSEYi4p34AJ8P8zJ01e23pBfMw0xA',
       'CmRaAAAAMRxXd0C0sx5dlxmRDJ31P9HZsCK0LtN3qTvHI84KYIe46_hXYkn24ENjlk7xmzArc47QvxJO5fKrlQPqR73RHmvfYaD5tv1pqzbu3PSriRu5CBN_mobOhcl_gxqPYxQAEhB8EGsW61qJb680opLp8QhIGhQXKapKlU36eHQRE9ddX0yUsRA3kg',
       'CmRaAAAA081C62aKoSoqrHSk3TGf3N7lvu-NR0-1Ai82PuJbmL5rdhywPYM2jAKQvL6hiDTKN3NREKasMMSEptHgD774yg2Kxu0TDu4DxFQl_5AlDOYem91-nmvI88_FCMG9cSFQEhCqFVlTa7BYhpZe7FlgCawUGhR-sTw20pnlEUhA9sIw351Uc7NUfA',
       'CmRaAAAAK2DNR3J5M6RreY0JkGtYSyJmrgdwCMxqnAXj3ZwPJHmMp0UdhhE7pw_oKUdQbil3JObB1_POTzNyjxdJ5aQpAg87F1FR9KZOf5A6Yd3v5lt4eQrkGemUXRPvNlP7pq0CEhCGUnRt0XWOChyPv-1JHWQ1GhSpJdvS2u1b7pg3ACozDBPUAiRzHw',
       'CmRaAAAAelxIapeWYaFD2OVG-WWnO5JFkgdoRRZgR7JKmC6yMhbreynt9Ud5rRxQpVKKQJJKyr8HcwwNgw0I1_QLFnoS-WTCHEZhikq_YcC1wSnaJzSeoNPQW8RJLHVhc5pQMBlSEhDnwI2eMpC1tTyegRkdBblsGhQwi6G_9Uci5exQRXLq_0OaS9NPzA',
       'CmRaAAAACWujGCbVpg_ZH3nB384vJxU1vXqTAzz0eNWK6Qy8SetrUPTZPc972pYk7SjJQwjhGJpem6ufJdYxSazKDYTxsX1Fs4WLnBuzqRfXyOr99s_1ylAdoS379htbD-BhkhqOEhDyshsi7wnMeE9MA-IL0FwXGhS58SdududKUIl8OBnU0RvQpx9scw',
       'CmRaAAAA7fWBvFQFdVgqAijZx35-fSa2oNSb_jm80lrxWWqyQRDGyGjotYn7eAG65-i9rHEHGTh4DoY5hSIdYzzIK4tMtkzH40LIblnbVpkyqT6O_6dCI09Rcm8nDrXEa19snl5TEhD-NUkT25328OuHIcoeLUn6GhTpzwqcQWIVptM19UuVVSnpSX1tTg',
       'CmRaAAAANuEuwMsU7iM2Q_gm0hQvV2vCyMPVdHvZFA30G-f4NcqeYMk1dZ1WLbJD67Xu7TDDfCRU2EYiG1bTHgN7sAGiucHDTEOz8AnXFshA_VK6J-B_iW2CETPcEh-8COfxC0AXEhC9J6oMGvdZfUGHhCCLDnMMGhRp0_IjQooHAq61lJ0fyLfRpxZecg',
       'CmRaAAAAv_BDLnr6uLEV_WW1G-xlwGnTK3Ghmyai_tQgNXbXkjc-Rn1rE5pVliramiLAphQemRa5Y5o8lPCCMB0-Fh_rhqyJNLrYgLAlWy7IB4SM8eGXnOgwjvemanZWyZtB396YEhCj2zcH7uissrhjJ39XuQekGhQ0B5cwiMUQv3cayt6ZE_xb2liWfA' ],
    nearby: 
     [ 'ChIJTel9dGCAhYARQGwrTfGZ07M',
       'ChIJcUlD0eOAhYARucGJj8eN9I8',
       'ChIJG-PkK4-AhYARxW6vm0X9kCQ',
       'ChIJWTGPjmaAhYARgXpiJ-aACYM',
       'ChIJX1E5fyZ-j4ARjujgYYPmhWA',
       'ChIJ1T-IlZiAhYAR5m-Mps4qLFk' ],
    name: 'Taverna Aventine',
    place_id: 'ChIJk2EFyIqAhYARXlKs2zO34Fg',
    google_rating: 4.2,
    zagat_rating: 1,
    neighborhood: 'Financial District',
    price_level: 2,
    types: 'restaurant',
    __v: 0 }

describe('Photo Carousel', () => {
  it('should be defined', () => {
    let wrapper = shallow(<PhotoCarousel
      nearbyRestaurant={restaurant}
    />) 
    expect(wrapper).toBeDefined();
  });
});

describe('Restaurant Detail', () => {
  it('should be defined', () => {
    let switchFunc = (id) => {
      location.href = '/restaurants/' + id;
    }
    let wrapper = shallow(<RestaurantDetails
      nearbyRestaurant={restaurant}
      switchRestaurant={switchFunc} 
    />) 
    expect(wrapper).toBeDefined();
  });
});

