import React from 'react';
import { Card, CardBody, CardTitle, CardText, CardImg, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Row, Col, Label } from "reactstrap";
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';


const minLength = (len) => (val) => val && (val.length >= len);
const maxLength = (len) => (val) => !(val) || (val.length <= len);

class CommentForm extends Component {

    constructor(props){
        super(props);
        this.state={
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal(){
        this.setState({isModalOpen: !this.state.isModalOpen});
    }

    handleSubmit(values){
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render(){
        return(
            <div className="container">
                <Button outline color="primary" onClick={this.toggleModal} >Submit Comment</Button>

                
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit comment</ModalHeader>
                    <ModalBody>
                        <div className="col-12 col-md-9">
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label md={4}>Rating</Label>
                                    <Col md={8}>
                                        <Control.select model=".rating" name="rating" className="form-control" >
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Label md={4}>Full name</Label>
                                    <Col md={8}>
                                        <Control.text model=".author" name="author" className="form-control"
                                        validators={{minLength: minLength(3), maxLength: maxLength(15)}} />
                                        <Errors model=".author" className="test-danger" show="touched" messages={{
                                            minLength: "Characters must be greater than 3 ",
                                            maxLength: "Characters must be 15 or less "
                                        }} />
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Label md={4}>Comment</Label>
                                    <Col md={8}>
                                        <Control.textarea model=".comment" name ="comment" className="form-control" rows="6" />
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Col md={{size:7, offset:5}}>
                                        <Button outline type="submit">Submit comment</Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}


    function RenderDish({dish}){
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

    function RenderComments({comments, addComment, dishId})
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
                <CommentForm dishId={dishId} addComment={addComment} />
            </div>);
        }
        else {
            return(
                <div><CommentForm/></div>
            );
        }
    }

    const DishDetail = (props) => {
        if(props.isLoading){
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess){
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }else if (props.dish !=null){
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>   
                </div>

                <div className = "row">
                    <div className ="col-12 col-md-5 m-1">
                        <RenderDish dish = {props.dish}/>
                    </div>

                    <div className ="col-12 col-md-5 m-1">
                        <RenderComments comments = {props.comments} addComment={props.addComment} dishId={props.dish.id} />
                    </div>
                </div>
            </div>
        );}
        else{
            return(<div></div>);
        }
    }


export default DishDetail; 