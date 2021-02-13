import React from 'react';
import DataService from "./Services/index"
import "./App.css"
import Modal from './Modal'

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      showModal: false,
      title: '',
      content: [],
      type: ''
    }
    this.insert = this.insert.bind(this)
    this.update = this.update.bind(this)
  }

  componentDidMount() {
    this.getAllData()
  }

  async getAllData() {
    let allData = await DataService.getAll();
    this.setState({ data: allData.data })
  }

  truncate = (input) => input.length > 50 ? `${input.substring(0, 50)}...` : input;

  showModal = () => {
    this.setState({ showModal: true });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  async add() {
    this.setState({ title: "Add a new Post", content: [], type: "Add" })
    this.showModal();
  }

  findById = id => this.state.data.filter(post => post.id === id)

  async view(id) {
    this.setState({ title: "View Post", content: this.findById(id), type: "View" });
    this.showModal();

  }

  edit(id) {
    this.setState({ title: "Edit Post", content: this.findById(id), type: "Edit" })
    this.showModal();
  }

  insert(data) {
    this.setState({ data: [...this.state.data, { ...data }] })
  }

  update(id, data){
    this.setState({data: [...this.state.data.filter(post => post.id !== id), {...data}] })
  }

  async delete(id) {
    if (window.confirm("Are you sure you want to delete this?")) {
      let response = await DataService.delete(id);
      if (response.status = 200) {
        this.setState({ data: this.state.data.filter(post => post.id !== id) })
      }
    }
  }

  render() {
    return (
      <div className="container">
        <div className="notify"></div>
        <a href="#" onClick={() => this.add()}>Add</a>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((x, i) => <tr key={i}>
              <td>{x.id}</td>
              <td>{this.truncate(x.title)}</td>
              <td>{this.truncate(x.body)}</td>
              <td>
                <a href="#" onClick={() => this.view(x.id)}>View </a>
                <a href="#" onClick={() => this.edit(x.id)}>Edit </a>
                <a href="#" onClick={() => this.delete(x.id)}>Delete</a>
              </td>
            </tr>
            )}
          </tbody>
        </table>
        {this.state.showModal &&
          <Modal
            show={this.state.showModal}
            handleClose={this.hideModal}
            content={this.state.content}
            insert={this.insert}
            update={this.update}
            type={this.state.type}
          >
            <p>{this.state.title}</p>
          </Modal>
        }
      </div>
    )
  }

}