import React from 'react';
import Enzyme from 'enzyme'
import { shallow, configure, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

global.shallow = shallow;