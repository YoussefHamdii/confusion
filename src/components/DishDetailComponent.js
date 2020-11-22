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
                
                
                <list className = "list-unstyled">
                    <li>{comment.comment}</li>
                    <li>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</li> 
                </list>
                
            );
        });

        if(comments != null){
        return (
            <div>
                <h4>comments</h4>
                {comm}
            </div>);
        }
        else {
            return(
                <div></div>
            );
        }
    }

    render(){
        if (this.props.dish !=null){
        return (
            <div>
            <div className = "row">
                <div className ="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.dish)}
                </div>

                <div className ="col-12 col-md-5 m-1">
                    {this.renderComments(this.props.dish.comments)}
                </div>
            </div>
            </div>
        );}
        else{
            return(<div></div>);
        }
    }
}

export default DishDetail; 