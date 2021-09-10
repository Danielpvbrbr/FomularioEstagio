import React, { Component } from 'react' 
import "./Input.css"

export default class Inpunt extends Component {
    render(){
        return(
            <div>
                <input 
                 type={this.props.type}
                 name={this.props.name}
                 onChange={this.props.onChange}
                 value={this.props.value}
                 className={this.props.className}
                 placeholder={this.props.placeholder}
                 required={this.props.required}
                 onClick={this.props.onClick}
                 maxLength={this.props.maxLength}
                 checked={this.props.checked}
                 id={this.props.id}
                 />
            </div>
        )
    }

}
    