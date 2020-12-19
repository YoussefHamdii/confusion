import Menu from './MenuComponent';
import { Component } from 'react';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { Switch, Route, Redirect, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';


const mapStateToProps = state => {
  return{
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos())
});


class Main extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }

  render (){
   console.log(this.props.promotions);
    const HomePage = () =>{
      return(
        <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading = {this.props.dishes.isLoading}
              dishesErrMess = {this.props.dishes.errmess}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}
              promotion = {this.props.promotions.promotions.filter((promotion) => promotion.featured)[0]}
              promotionLoading = {this.props.promotions.isLoading}
              promotionErrMess = {this.props.promotions.errMess}
              />
      );
    }

    const dishwithid = ({match}) =>{
      return(
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
            isLoading = {this.props.dishes.isLoading}
            errMess = {this.props.dishes.errmess}
            comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} 
            commentsErrMess={this.props.comments.errMess}
            addComment={this.props.addComment} />
      );
    }

    return (
        <div>
            <Header />
            <div className = 'container'>
                <Switch>
                  <Route path='/home' component={HomePage} />
                  <Route exact path='/menu' component={() => <Menu dishes ={this.props.dishes} /> } />
                  <Route path='/menu/:dishId' component={dishwithid} />
                  <Route exact path='/contactus' component={() => < Contact resetFeedbackForm = {this.props.resetFeedbackForm} />} />
                  <Route path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
                  <Redirect to='/home' />
                </Switch>
            </div>
            <Footer />
        </div>
      
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
