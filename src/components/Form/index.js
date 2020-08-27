import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core'
import './styles.scss'

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {label, title, textarea, body, header, labelbutton} = this.props
    return (
      <div className="form">
        <h3>{header}</h3>
        <form onSubmit={this.props.handleSubmit}>
          <div>
            {label ? (<TextField
              fullWidth
              required
              id="outlined-required"
              label={label}
              defaultValue={title}
              variant="outlined"
              onChange={ this.props.handleChangeTitle}
            />) : null }
          </div>
          <div>
            {textarea ? (<TextField
              fullWidth
              required
              id="outlined-required"
              label={textarea}
              defaultValue={body}
              variant="outlined"
              onChange={ this.props.handleChangeTitle}
            />) : null}
          </div>
          <Button type="submit" variant="contained" color="primary">{labelbutton}</Button>
          <Button variant="contained" color="secondary" onClick={this.props.closeEdit}>Cancel</Button>
        </form>
      </div>
    )
  }
}
export default Form
