import React, { Component } from 'react';

export default class TodoList extends Component {

    handleButtonClick = (e) => {

        this.props.toggleDone(e);
    } 
    render() {



       let itemsJSX = this.props.todoItems.map((item, i) => {
        // console.log(item.id)
           return (
            <ul key={i}>
                <span className={item.done ? "strike" : ""}>
                {item.value}
                </span> 
                <input type="checkbox" checked={item.done}
                onChange={(e) => { this.props.toggleDone(e, i) }}
                />
            </ul>
            
           )
       })
        return (
            <div className='TodoList'>
            <h1>To Do List</h1>
        <ul>
        {itemsJSX}
                </ul>
            </div>
        );
    }
}
