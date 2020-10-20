
import React from 'react';
import { Row, Form, Col, Button } from 'react-bootstrap';

class AddPost extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      id: '',
      title: '',
      userID: ''
    }

    if(props.post){
      this.state = props.post
    } else {
      this.state = this.initialState;
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onFormSubmit(this.state);
    //this.props.onFormSubmit1(this.state);
    this.setState(this.initialState);
  }

  render() {

    return(
      <div>
        <Row>
          <Col sm={6}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="userId">
                <Form.Label>userID</Form.Label>
                <Form.Control
                  type="number"
                  name="userId"
                  value={this.state.userId}
                  onChange={this.handleChange}/>
              </Form.Group>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleChange}/>
              </Form.Group>
             
              <Form.Group>
                <Form.Control type="hidden" name="id" value={this.state.id} />
                <Button variant="success" type="submit">Save</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}

export default AddPost;
