import React, { Component } from 'react';

export default class TodoInput extends Component {
    
    render() {
       
       
       
        return (
           <form onSubmit={this.props.addItem}>
               <input name="todo"/>
               <button type="submit">Add</button>
           </form>

        )
    }
}