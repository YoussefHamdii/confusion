import {Navbar, NavbarBrand} from 'reactstrap';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import { Component } from 'react';
import DishDetail from './DishDetailComponent';

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: null
    };
  }
  onDishSelect(dishId){
    this.setState({selectedDish: dishId});
  }

  render (){
    return (
      <div className="container">
        <Navbar dark color='primary'>
            <NavbarBrand href="/">Restorante Con fusion</NavbarBrand>
        </Navbar>
        <div className="container">
            <Menu dishes = {this.state.dishes} onClick = {(dishId) => this.onDishSelect(dishId)}/>
            <DishDetail dish = {this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}/>
        </div>
      </div>
    );
  }
}

export default Main;
