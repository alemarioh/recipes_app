import React, { Component } from 'react';
import './App.css';
import {recipes} from './tempList';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';


class App extends Component {
  
  state = {
    // recipes: [],
    recipes: recipes,
    url: 'https://www.food2fork.com/api/search?key=c84dac66af6ae320bb2c7736ce2d3b50',
    base_url: 'https://www.food2fork.com/api/search?key=c84dac66af6ae320bb2c7736ce2d3b50',
    details_id: 35375,
    pageIndex: 1,
    search:'',
    query: '&q=',
    error:''
  }

async getRecipes() {
  try{

    const Data = await fetch(this.state.url);
    const jsonData = await Data.json();

    console.log(jsonData);
  
    if(jsonData.recipes.length === 0) {
      this.setState(()=>{
        return {
          error:'sorry, but your search did not get any results'
        }
      })
    } else {
      this.setState(()=>{
      return {recipes: jsonData.recipes}
    });
    }

  }
  catch(error){
    console.log(error);
  }
}


componentDidMount(){
  this.getRecipes()
}

  displayPage(index) {
    switch(index){
      default:
      case 1:
        return (<RecipeList 
          recipes={this.state.recipes}
          handleDetails={this.handleDetails}
          value={this.state.search }
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit} 
          error={this.state.error}   
        />)
      case 0:
        return (<RecipeDetails 
          id={this.state.details_id }
          handleIndex={this.handleIndex}
        />)

    }
  }

  handleIndex = index => {
    this.setState({
      pageIndex: index
    })
  }

  handleDetails = (index, id) => {
    this.setState({
      details_id: id,
      pageIndex: index
    })
  }

  handleChange = (e) => {
    this.setState({
      search: e.target.value
    },
    () => {
      console.log(this.state.search)
    })
  } 

  handleSubmit = (e) => {
    e.preventDefault();
    const {base_url, query, search} = this.state; 
    this.setState(()=> {
      return {
        url:`${base_url}${query}${search}`,
        search:''
      }
    }, ()=>{ 
      this.getRecipes();
    })
  } ;

  render() { 

    // console.log(this.state.recipes)

    return (
      <React.Fragment>
        {this.displayPage(this.state.pageIndex)}
      </React.Fragment>
        
    );
  }
}

export default App;
