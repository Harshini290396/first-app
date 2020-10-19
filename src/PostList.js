
import React from 'react';
import { Table, Button, Alert } from 'react-bootstrap';

class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      posts: [],
      response: {}
    }
  }

  componentDidMount() {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

    fetch(apiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            posts: result
          });
        },
        (error) => {
          this.setState({ error });
        }
      )
  }


  deletePost(id) {
    const { posts } = this.state;

    const apiUrl = 'https://jsonplaceholder.typicode.com/posts/'+id;
    const formData = new FormData();
    formData.append('id', id);

    const options = {
      method: 'DELETE',
      body: formData
    }

    fetch(apiUrl, options)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            response: result,
            posts: posts.filter(post => post.id !== id)
          });
        },
        (error) => {
          this.setState({ error });
        }
      )
      console.log(apiUrl)
  }



  render() {
    const { error, posts} = this.state;

    if(error) {
      return (
        <div>Error: {error.message}</div>
      )
    } else {
      return(
        <div>
          <h2>Posts List</h2>
          {this.state.response.message && <Alert variant="info">{this.state.response.message}</Alert>}
          <Table>
            
            <tbody>
              {posts.map(post => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{post.userId}</td>
                  <td>{post.title}</td>
                  <td>
                    <Button variant="info" onClick={() => this.props.editPost(post.id)}>Update</Button>
                    &nbsp;<Button variant="danger" onClick={() => this.deletePost(post.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
              
            </tbody>
          </Table>
        </div>
      )
    }
  }
}

export default PostList;
