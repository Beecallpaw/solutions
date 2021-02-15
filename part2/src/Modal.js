import React from 'react'
import DataService from "./Services/index"
import './modal.css';

export default class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      body: '',
    }
  }

  componentDidMount() {
    if (this.props.type == 'Edit'){
      this.setState({title: this.props.content[0].title, body: this.props.content[0].body})
    }
  }

  handleTitleChange = (evt) => {
    this.setState({ title: evt.target.value });
  }

  handleBodyChange = (evt) => {
    this.setState({ body: evt.target.value });
  }

  setTitle(){
    this.setState({title: this.props.content[0].title})
  }

  savePost = () => {
    DataService.create(this.state).then(resp => {
      if (resp.status === 201) {
        this.props.insert(resp.data)
        this.props.handleClose()
      }
    }).catch(err => {
      console.log('Error', err)
    })
  }
  updatePost = (id) =>{
    DataService.update(id, this.state).then(resp => {
      if(resp.status === 200){
        this.props.update(id, resp.data)
        this.props.handleClose()
      }
    })
  }

  viewPageContents = () => <div>
    <h5>Title</h5>
    <p>{this.props.content[0].title}</p>
    <hr />
    <h5>Body</h5>
    <p>{this.props.content[0].body}</p>
  </div>

  addPageContents = () => <div>
    <h5>Title</h5>
    <textarea cols="50" rows="5" value={this.state.title} onChange={this.handleTitleChange} />
    <h5>Body</h5>
    <textarea cols="50" rows="10" value={this.state.body} onChange={this.handleBodyChange} />
    <br />
    <button onClick={this.savePost}>Save</button>
  </div>

  editPageContents = () => {
    return <div>
      <h5>Title</h5>
      <textarea cols="50" rows="5" value={this.state.title} onChange={this.handleTitleChange} />
      <h5>Body</h5>
      <textarea cols="50" rows="10" value={this.state.body} onChange={this.handleBodyChange} />
      <br />
      <button onClick={() => this.updatePost(this.props.content[0].id)}>Update Post</button>
    </div>
  }

  render() {
    const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
    return (
      <div className={showHideClassName}>
        <section className="modal-main p-16">
          {this.props.type}
          {this.props.type === 'Add'
              ?  this.addPageContents() : this.props.type === 'View' ? this.viewPageContents(): this.editPageContents()}
          <a className="exit" onClick={this.props.handleClose}>X</a>
        </section>
      </div>
    )
  }
};