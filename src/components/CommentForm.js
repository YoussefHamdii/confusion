import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Row, Col, Label } from "reactstrap";
import { Control, LocalForm, Errors } from 'react-redux-form';

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
        alert(JSON.stringify(values));
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

export default CommentForm;