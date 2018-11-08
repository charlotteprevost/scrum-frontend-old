import React, { Component } from 'react';
// import { Route, Switch } from 'react-router-dom';
import Repos from './Repos';
import RepoIssues from './RepoIssues';
import Choose from './Choose';
import GamesPast from './GamesPast';
import GameCurrent from './GameCurrent';
import GamesPending from './GamesPending';
import GameCreateFinal from './GameCreateFinal';
import GameCreateUserStory from './GameCreateUserStory';
import GameCreateEstimInvites from './GameCreateEstimInvites';
import { Header } from 'semantic-ui-react';


class GameContainer extends Component {

	constructor(){
    super();

    this.state = {
    	gamePage: 'Choose',
    	games: [],
    	game : {
	    	title: '',
	    	description: '',
        scrumMaster: [],
	    	estimators: [],
        status: 'Pending'
	    }
    }
    this.updateGamePageShowing = this.updateGamePageShowing.bind(this);
	}

  updateGamePageShowing = async (gamePage) => {
      console.log(`gamePage: `, gamePage);

      await this.setState({gamePage: gamePage});
  }


	updateUserStory = async (userStory, e) => {
		e.preventDefault();

		try {
			await console.log(`userStory: `, userStory);
	    await this.setState({
	    	game: {
	    		title: userStory.title,
	    		description: userStory.description
	    	}
	    });

	    await console.log(`this.state in updateUserStory() GameContainer: `, this.state);

		} catch(err){
			console.error(`Error in updateUserStory() GameContainer`, err);
		}
	}


	updateEstimators = async (data, e) => {
		e.preventDefault();

		try {

			await console.log(`'data' in updateEstimators() in GameContainer: `, data);
	    await this.setState({
	    	game: {
	    		title: this.state.game.title,
	    		description: this.state.game.description,
	    		estimators: data.estimators,
          scrumMaster: data.scrumMaster
	    	}
	    });

	    await console.log(`this.state in updateEstimators() GameContainer: `, this.state);

		} catch(err){
			console.error(`Error in updateEstimators() GameContainer`, err);
		}

	}


  addGame = async (game, e) => {
    e.preventDefault();
    console.log(`this.state in addGame() GameContainer: `, this.state);
    console.log(`game in addGame() GameContainer: `, game);

    try {
      const createdGame = await fetch('http://localhost:9000/games/', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(game),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const parsedResponse = await createdGame.json();

      await console.log(`parsedResponse from addGame: `, parsedResponse);

      await this.setState({games: [...this.state.games, parsedResponse.data]});

			await console.log(`State after adding game: `, this.state);

      await this.updateGamePageShowing('Choose');

    } catch(err){
        console.log('error')
        console.log(err)
    }
  }

    render(){
    	console.log(`this.state.game from GameContainer on render`, this.state.game);
      return(
        <div>
      	<Header as="h1">--------------- GameContainer ---------------</Header>
        
        {this.state.gamePage === "Choose" ? 
          <div>
            <Choose 
            updateGamePageShowing={this.updateGamePageShowing} 
            />
          </div> 
          : null} 
        {this.state.gamePage === "GameCreateUserStory" ? 
          <div>
            <GameCreateUserStory 
            updateGamePageShowing={this.updateGamePageShowing} 
            updateUserStory={this.updateUserStory}/>
          </div> 
          : null}       
        {this.state.gamePage === "Repos" ? 
          <div>
            <Header as="h2">Repos</Header>
            <Repos updateGamePageShowing={this.updateGamePageShowing} />
          </div> 
          : null}  
        {this.state.gamePage === "RepoIssues" ? 
          <div>
            <Header as="h2">RepoIssues</Header>
            <RepoIssues updateGamePageShowing={this.updateGamePageShowing} />
          </div> 
          : null}          
        {this.state.gamePage === "GameCreateEstimInvites" ? 
          <div>
            <Header as="h2">Estimator Invites</Header>
            <GameCreateEstimInvites 
            updateGamePageShowing={this.updateGamePageShowing} 
            updateEstimators={this.updateEstimators} 
            appState={this.props.appState}/>
          </div> 
          : null}  
        {this.state.gamePage === "GameCreateFinal" ? 
          <div>
            <Header as="h2">Overview</Header>
            <GameCreateFinal 
            updateGamePageShowing={this.updateGamePageShowing} 
            addGame={this.addGame} 
            gameToCreate={this.state.game}/>
          </div> 
          : null}  
        {this.state.gamePage === "GamesPast" ? 
          <div>
            <Header as="h2">GamesPast</Header>
            <GamesPast updateGamePageShowing={this.updateGamePageShowing} />
          </div> 
          : null}          
        {this.state.gamePage === "GameCurrent" ? 
          <div>
            <Header as="h2">GameCurrent</Header>
            <GameCurrent updateGamePageShowing={this.updateGamePageShowing} />
          </div> 
          : null}          
        {this.state.gamePage === "GamesPending" ? 
          <div>
            <Header as="h2">GamesPending</Header>
            <GamesPending updateGamePageShowing={this.updateGamePageShowing} />
          </div> 
          : null}          
          </div>	
      )
    }
}
export default GameContainer;
		        // <Route exact path="/new" component={ GameCreate }/>
		        // <Route exact path="/current" component={ GameCurrent }/>
	    		// <Route exact path="/pending" component={ ProfileContainer }/>
		      	// <Route exact path="/past" component={ GameContainer }/>