import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchUserPosts, fetchUserComments } from '../../../../actions/index';
import { Card, CardContent, Typography, Avatar, CardActions, Button, Grid, CardActionArea } from '@material-ui/core'
import Loading from '../../../../components/Loading/index'
import ImageMale from '../../../../assets/image/img_1.jpeg'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Form from '../../../../components/Form/index'
import _ from 'lodash'
import './styles.scss'

const mapStateToProps = (state) =>{
  return{
    loading: state.loadingReducers.loading,
    posts: state.userPostsReducers,
    comments: state.userCommentReducers
  }
}

class Album extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showComments: false,
      showModal: false,
      photoUrl: '',
      indexPost: 0,
      indexEdit: 0,
      showEdit: false
    }
  }

  componentDidMount() {
    const { posts } = this.props
    const paramId = this.props.match.params.id
    if (!_.size(posts)) {
      this.props.dispatch(fetchUserPosts(paramId))
    }
  }

  getComments(id) {
    const { showComments } = this.state
    if (!showComments) {
      this.props.dispatch(fetchUserComments(id))
    }
    this.setState({
      showComments: !this.state.showComments,
      indexPost: id
    })
  }

  handleChangeBody(e) {}

  handleChangeTitle(e) {}

  handleSubmit(e, data) {
    e.preventDefault();
    let dataForm = {}
    dataForm.id = data.postId
    dataForm.userId = data.userId
    dataForm.title = e.target[0].value
    dataForm.body = e.target[2].value
    console.log(dataForm)
  }

  showEdit(id) {
    this.setState({
      showEdit: !this.state.showEdit,
      indexEdit: id
    })
  }

  render() {
    const { loading, posts, comments } = this.props
    const { showComments, indexPost, showEdit, indexEdit } = this.state
    return (
      <div className="posts">
        {loading && <Loading />}
        <div className="posts-add-post">
          <Card>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  ADD POST
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
        {
          posts.map((post, i) => 
          <div key={i} >
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {post.title}
                </Typography>
                <Typography gutterBottom variant="h6" component="h2">
                  {post.body}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={() => this.getComments(post.id)}>
                  {showComments && indexPost === post.id ? 'Hide Comments' : 'Show Comments'}
                </Button>
                <Button size="small" color="primary">
                  Delete
                </Button>
                <Button size="small" color="primary" onClick={() => this.showEdit(post.id)}>
                  {showEdit && indexEdit === post.id ? 'Cancel Edit' : 'Edit'}
                </Button>
              </CardActions>
            </Card>
            {
              showEdit && indexEdit === post.id ? (
                <Form
                header="Edit Post"
                label="Title"
                textarea="Body"
                title={post.title}
                body={post.body}
                handleChangeTitle={ (e) => this.handleChangeTitle(e.target.value)}
                handleChangeBody={(e) => this.handleChangeBody(e.target.value)}
                handleSubmit={(e) => this.handleSubmit(e, {postId: post.id, userId: post.userId})}
                closeEdit={() => this.showEdit()}
              />
              ) : null
            }
            <div className="posts-image">
              {
                comments ? comments.map((comment, i) => {
                  return comment.postId === post.id ? (
                    showComments ? 
                      <React.Fragment key={i}>
                        <Grid container item lg={12} md={12} sm={12} xs={12} spacing={0}>
                          <Grid container item lg={11} md={11} sm={12} xs={12} spacing={0}>
                            <div className="posts-image-avatar" >
                              <div>
                                <Avatar alt="Remy Sharp" src={ImageMale} />
                                <label>{comment.name}</label>
                              </div>
                            </div>
                            <p>"{comment.body}"</p>
                          </Grid>
                          <Grid container item lg={1} md={1} sm={1} xs={1} spacing={1} justify="center" alignItems="center">
                            <div>
                              <p>
                                <DeleteIcon/>
                              </p>
                              <p>
                                <EditIcon/>
                              </p>
                            </div>
                          </Grid>
                        </Grid>
                      </React.Fragment>
                    : null
                  ) : null
                }) : null
              }
            </div>
          </div>
          )
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(Album);
