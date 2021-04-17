import React, { Component } from 'react'
import Display from './Display'
import axios from 'axios'
import "./searchPage.css"

class GithubUserSearch extends Component{
    constructor(props){
        super(props);
        this.state={
            username : "",
            GithubUserInfo : [],
            clicked : false
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleClick=this.handleClick.bind(this);
        this.remove=this.remove.bind(this);
        this.clear=this.clear.bind(this);
    }
    handleChange(evt){
        this.setState({
            username : evt.target.value
        });
    }
    async handleClick(evt){
        evt.preventDefault();
        const Username = this.state.username;
        try{
            let URL= await axios.get(`https://api.github.com/users/${Username}`);
            let data=URL.data;
            this.setState(st =>({
                GithubUserInfo :[
                            {
                            profilePic: data.avatar_url,
                            followers : data.followers,
                            name : data.name,
                            following : data.following,
                            totalRepos : data.public_repos,
                            reposURL : data.repos_url,
                            accCreated : data.created_at,
                            lastPosted : data.updated_at,
                            profileLink : data.html_url,
                            id : data.id,
                            login : data.login
                            },
                            ...st.GithubUserInfo
                        ]
            }))
            this.setState({ username : "" , clicked: true})
        }
        catch(err){
            alert("User not found!!!")
            this.setState({ username : "" , clicked: true})
        }
    }
    remove(id){
        this.setState({
            GithubUserInfo : this.state.GithubUserInfo.filter(user => user.id!==id)
        })
    }
    clear(){
        this.setState({
            GithubUserInfo:[]
        })
    }

    render(){
        const display1 = () =>{
            if(this.state.GithubUserInfo.length!==0){
                return(
                    <div>
                        {this.state.GithubUserInfo.map(st => (
                            <div key={st.id}>
                                <Display info={st} display={this.display}/>
                                <button className="deleteButton" onClick={() => this.remove(st.id)}>Delete</button>
                            </div>
                            ))
                        }
                    </div>
                )
            }
            else{
                return(
                    <div className="Homepage">
                        <h1 className="heading">Search <span className="heading2">Here !</span></h1>
                    </div>
                );
            }
        }
        return(
            <div>
                <div className="searchBlock">
                    <div className="searchBar">
                        <input className="input" type="text" placeholder="Github user" value={this.state.username} onChange={this.handleChange}/>
                        <button className="button" onClick={this.handleClick}><i className="fas fa-search"></i></button>
                    </div>
                    <button className="clear" onClick={this.clear}>Clear all</button>
                </div>
                <div className="Info">
                    {display1()}
                </div>
            </div>
        );
    }
}

export default GithubUserSearch;