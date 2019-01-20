import React, {Component} from 'react';
import {render} from 'react-dom';

class App extends Component{

    constructor(){
        super();
        this.state ={
            _id:'',
            title:'',
            description:'',
            tasks:[]
        }
        this.AgregarTarea = this.AgregarTarea.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.getTasks = this.getTasks.bind(this);
        this.DeleteTask = this.DeleteTask.bind(this);
        this.getTask = this.getTask.bind(this);
    }

    AgregarTarea(e)
    {
        if(this.state._id == '')
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
                Materialize.toast('Task Saved', 1000);
                this.setState({title:'', description:''})
                this.getTasks();
            })
            .catch(err =>console.log(err))
        }else{
            fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
    
                }
            }).then(resp => resp.json)
            .then(data => {
                console.log(data);
                Materialize.toast('Task Updated', 1000);
                this.setState({_id:'',  title:'', description:''})
                this.getTasks();
            })
            .catch(err =>console.log(err))
        }
        
        e.preventDefault();
    }

    componentDidMount(){
        this.getTasks();
    }

    getTasks(){
        fetch('/api/tasks').then(resp => resp.json()).then(data => {this.setState({tasks:data})})
    }

    getTask(id){
        fetch(`/api/tasks/${id}`)
        .then(resp=>resp.json())
        .then(data=>{
            const {_id, title, description} = data;
            this.setState({
                _id,
                title,
                description
            })
            console.log(this.state)
        })
    }

    DeleteTask(id){
        fetch(`/api/tasks/${id}`, {
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',

            }
        })
        .then(resp => resp.json)
        .then(data=>{
            console.log('Se ejecuto esta vaina');
            Materialize.toast('Task deleted', 1000);
            this.getTasks();
        })
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
                            <table className="">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task =>{
                                            return (
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button className="btn light-blue darken-4"
                                                                onClick={() => this.getTask(task._id)}>
                                                            <i className="material-icons">edit</i>
                                                            
                                                        </button>
                                                        <button className="btn light-blue darken-4"
                                                                style={{margin:'4px'}}
                                                                onClick={() => {this.DeleteTask(task._id)}}>
                                                            <i className="material-icons">delete</i>
                                                            
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

render(<App/>, document.getElementById('app'));