import React, { Component } from 'react'
import './card.css'

class Display extends Component{
    constructor(props){
        super(props);
        this.state={
            height :300,
            width :300,
            borderRadius: 150,
        }
    }
    render(){
        const info=this.props.info
        // console.log(info)
        const repos = `https://github.com/${info.login}?tab=repositories`
        return(
            <div className="Block">
                <div className="card">
                    <br/>
                    <h1>{info.name}</h1>
                    <img style={this.state} src={info.profilePic} alt="img"/>
                    <div className="Following">
                        <h2>Followers : {info.followers}</h2>
                        <h2>Following : {info.following}</h2>
                    </div>
                    <h2>Total public repos : {info.totalRepos}</h2>
                    <h2>Account created on : {info.accCreated.slice(0,10)}</h2>
                    <h2>Last posted on : {info.lastPosted.slice(0,10)}</h2>
                    <h2>Profile : <a target="_blank" rel="noopener noreferrer" href={info.profileLink}>Click here</a></h2>
                    <h2>Repos URL : <a target="_blank" rel="noopener noreferrer" href={repos}>Click here</a> </h2>
                </div>
            </div>
        );
    }
}

export default Display;