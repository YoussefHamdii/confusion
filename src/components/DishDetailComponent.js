import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardText, CardImg, ListGroup, ListGroupItem} from 'reactstrap';


class DishDetail extends Component {
    constructor(props){
        super(props);
        
    }

    renderDish(dish){
        if(dish != null){
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }else {
            return(<div></div>);
        }
    }

    renderComments(comments)
    {
        
        
        const comm = comments.map((comment) => {
            return(
                
                
                <list class = "list-unstyled">
                    <li>{comment.comment}</li>
                    <li>-- {comment.author, comment.date}</li> 
                </list>
                
            );
        });
        return (
            <div>
                <h4>comments</h4>
                {comm}
            </div>);
    }

    render(){
        return (
            <div className = "row">
                <div className ="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.selectedDish)}
                </div>

                <div className ="col-12 col-md-5 m-1">
                    {this.renderComments(this.props.selectedDish.comments)}
                    
                </div>
            </div>
        );
    }
}

export default DishDetail; 