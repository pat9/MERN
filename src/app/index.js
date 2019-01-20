import React, {Component} from 'react';
import {render} from 'react-dom';

class App extends Component{

    constructor(){
        super();
        this.state ={
            title:'',
            description:''
        }
        this.AgregarTarea = this.AgregarTarea.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    AgregarTarea(e)
    {
        fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',

            }
        }).then(resp => resp.json)
        .then(data => {
            console.log(data);
            Materialize.toast('Task Saved');
            this.setState({title:'', description:''})
        })
        .catch(err =>console.log(err))
        e.preventDefault();
    }

    handleOnChange(e)
    {
        const {name, value} = e.target;
        this.setState({
            [name]:value
        })
    }

    render(){
        return(
            <div>
                {/* Navegacion */}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">Mern Stack</a>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.AgregarTarea}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input type="text" name="title" onChange={this.handleOnChange} value={this.state.title} placeholder="Task Title"/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea placeholder="Task Description" value={this.state.description} name="description" onChange={this.handleOnChange} className="materialize-textarea"></textarea>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-blue darken-4">Send</button>
                                        
                                    </form>
                                </div>
                                    
                            </div>
                        </div>
                        <div className="col s7">
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

render(<App/>, document.getElementById('app'));