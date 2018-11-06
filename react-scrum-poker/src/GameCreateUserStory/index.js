import React, { Component } from 'react';
import { Form, Button, Label, Segment } from 'semantic-ui-react';


class GameCreateUserStory extends Component {
  constructor(){
    super();

    this.state = {
      title: '',
      description: ''
    }
  }
  
  updateUserStory = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  render(){
    return(
      <div>
        <h1>Create Game</h1>
        <Segment>
        	<h3>User Story</h3>
          <Form onSubmit={this.props.updateGame.bind(null, this.state)}>

            <Label htmlFor="name=title">Title:</Label>
            <Form.Input type='text' name='title' value={this.state.title} onChange={this.updateUserStory}/>

            <Label>Description:</Label>
            <Form.Input type='text' name='description' value={this.state.description} onChange={this.updateUserStory}/>

            <Button color="blue" type='Submit'>Submit User Story</Button>
          </Form>
        </Segment>
      </div>            
    )
  }
}
export default GameCreateUserStory;