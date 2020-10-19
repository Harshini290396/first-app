
import React, { Component } from 'react';
import './App.css';
import { Container, Button, Alert } from 'react-bootstrap';
import PostList from './PostList';
import AddPost from './AddPost';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddPost: false,
      error: null,
      response: {},
      post: {},
      isEditPost: false
    }
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onCreate() {
    this.setState({ isAddPost: true });
  }

  onFormSubmit(data) {
    let apiUrl='https://jsonplaceholder.typicode.com/posts';

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      myHeaders
    };

    fetch(apiUrl, options)
      .then(res => res.json())
      .then(result => {
        this.setState({
          response: result,
          isAddPost: false,
          isEditPost: false
        })
        console.log(result);
      },
      (error) => {
        this.setState({ error });
      }
    )
  }

  editPost = id => {

    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
    const formData = new FormData();
    formData.append('id', id);

    const options  = {
      method: 'POST',
      body: formData
    }

    fetch(apiUrl, options)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            post: result,
            isEditPost: true,
            isAddPost: true
          });
          console.log(result);
          console.log(apiUrl)
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  render() {

    let postForm;
    if(this.state.isAddPost || this.state.isEditPost) {
      postForm = <AddPost onFormSubmit={this.onFormSubmit} post={this.state.post} />
    }

    return (
      <div className="App">
        <Container>
          {!this.state.isAddPost && <Button variant="primary" onClick={() => this.onCreate()}>Add Post</Button>}
          {this.state.response.status === 'success' && <div><br /><Alert variant="info">{this.state.response.message}</Alert></div>}
          {!this.state.isAddPost && <PostList editPost={this.editPost}/>}
          { postForm }
          {this.state.error && <div>Error: {this.state.error.message}</div>}
        </Container>
      </div>
    );
  }
}

export default App;

