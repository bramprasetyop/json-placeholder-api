import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchUserPosts, fetchUserComments, fetchEditUserPost, fetchDeleteUserPost, fetchCreateUserPost, fetchCreateUserPostComment, fetchDeleteUserPostComment, fetchEditUserPostComment } from '../../../../actions/index';
import { Card, CardContent, Typography, Avatar, CardActions, Button, Grid, CardActionArea } from '@material-ui/core'
import Loading from '../../../../components/Loading/index'
import ImageMale from '../../../../assets/image/img_1.jpeg'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ModalComponent from '../../../../components/Modal'
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
      showModalPost: false,
      showModalComment: false,
      photoUrl: '',
      indexPost: 0,
      indexEdit: 0,
      showEdit: false,
      indexEditComment: 0,
      showEditComment: false
    }
  }

  componentDidMount() {
    const { posts } = this.props
    const paramId = this.props.match.params.id
    if (!_.size(posts)) {
      this.props.dispatch(fetchUserPosts(paramId))
    }
  }

  windowConfirm(str) {
    return window.confirm(str)
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

  modalBodyAddPost() {
    return (
      <div className="posts-add-post-body">
        <Form
          labelbutton="Save"
          header="Add Post"
          label="Title"
          textarea="Body"
          handleChangeTitle={ (e) => this.handleChangeTitle(e.target.value)}
          handleChangeBody={(e) => this.handleChangeTitle(e.target.value)}
          handleSubmit={(e) => this.handleSubmitAdd(e,{ addPost: true })}
          closeButton={() => this.addPost({openModalPost: true})}
        />
      </div>
    )
  }

  modalBodyAddComment(data) {
    return (
      <div className="posts-add-post-body">
        <Form
          labelbutton="Save"
          header="Add Comment"
          label="Name"
          textarea="Comment"
          email="Email"
          handleChangeTitle={ (e) => this.handleChangeTitle(e.target.value)}
          handleChangeBody={(e) => this.handleChangeBody(e.target.value)}
          handleChangeEmail={(e) => this.handleChangeEmail(e.target.value)}
          handleSubmit={(e) => this.handleSubmitAdd(e,{ addComment: true, postId: data.postId })}
          closeButton={() => this.addPost({openModalComment: true})}
        />
      </div>
    )
  }

  handleChangeTitle(e) {}
  handleChangeBody(e) {}
  handleChangeEmail(e) {}

  handleSubmitEdit(e, data) {
    e.preventDefault();
    let str
    let dataForm = {}
    if (data.editPost) {
      dataForm.id = data.postId
      dataForm.userId = data.userId
      dataForm.title = e.target[0].value
      dataForm.body = e.target[2].value
      str = "Do you really want to save changes?"
      if(this.windowConfirm(str)){
        this.props.dispatch(fetchEditUserPost(dataForm))
      }
      this.showEdit({showPost: true})
    } else if (data.editComment) {
      str = "Do you really want to save this comment changes?"
      dataForm.userId = data.userId
      dataForm.name = e.target[0].value
      dataForm.email = e.target[2].value
      dataForm.body = e.target[4].value
      dataForm.postId = data.postId
      dataForm.id = data.commentId
      if(this.windowConfirm(str) === true){
        this.props.dispatch(fetchEditUserPostComment(dataForm))
        console.log(dataForm)
      }
      this.showEdit({showComment: true})
    }
  }

  handleSubmitAdd(e, type) {
    e.preventDefault();
    let str
    const paramId = this.props.match.params.id
    let dataForm = {}
    if (type.addPost) {
      str = "Do you really want to post this data?"
      dataForm.userId = paramId
      dataForm.title = e.target[0].value
      dataForm.body = e.target[2].value
      if(this.windowConfirm(str)){
        this.props.dispatch(fetchCreateUserPost(dataForm))
      }
      this.addPost({openModalPost: true})
    } else if (type.addComment) {
      str = "Do you really want to post this comment?"
      dataForm.userId = paramId
      dataForm.name = e.target[0].value
      dataForm.email = e.target[2].value
      dataForm.body = e.target[4].value
      dataForm.postId = type.postId
      if(this.windowConfirm(str) === true){
        this.props.dispatch(fetchCreateUserPostComment(dataForm))
      }
      this.addPost({openModalComment: true})
    }
  }

  deletePost(data) {
    let str
    if (data.deletePost) {
      str = "Do you really want to delete post?"
      if(this.windowConfirm(str)){
        this.props.dispatch(fetchDeleteUserPost(data.postId))
      }
    } else if (data.deleteComment) {
      str = "Do you really want to delete this comment?"
      if(this.windowConfirm(str)){
        this.props.dispatch(fetchDeleteUserPostComment(data.commentId))
      }
    }
  }

  showEdit(data) {
    if (data.showPost) {
      this.setState({
        showEdit: !this.state.showEdit,
        indexEdit: data.postId
      })
    } else if (data.showComment) {
      this.setState({
        showEditComment: !this.state.showEditComment,
        indexEditComment: data.commentId
      })
    }
  }

  addPost(type) {
    if (type.openModalPost) {
      this.setState({
        showModalPost: !this.state.showModalPost
      })
    } else if (type.openModalComment) {
      this.setState({
        showModalComment: !this.state.showModalComment
      })
    }
  }

  render() {
    const { loading, posts, comments } = this.props
    const { showComments, indexPost, showEdit, indexEdit, showModalPost, showModalComment, indexEditComment, showEditComment } = this.state
    return (
      <div className="posts">
        {loading && <Loading />}
        <div className="posts-add-post">
          <Card onClick={() => this.addPost({openModalPost: true})}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  ADD POST
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <ModalComponent
            open={showModalPost}
            handleClose={() => this.addPost({openModalPost: true})}
            modalbody={this.modalBodyAddPost()}
          />
        </div>
        {
          posts.map((post, i) => 
          <div key={i} >
            <Card className="posts-card">
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
                <Button size="small" color="primary" onClick={() => this.deletePost({postId:post.id, deletePost: true})}>
                  Delete
                </Button>
                <Button size="small" color="primary" onClick={() => this.showEdit({showPost: true, postId: post.id})}>
                  {showEdit && indexEdit === post.id ? 'Cancel Edit' : 'Edit'}
                </Button>
              </CardActions>
            </Card>
            {
              showEdit && indexEdit === post.id ? (
                <Form
                labelbutton="Save"
                header="Edit Post"
                label="Title"
                textarea="Body"
                title={post.title}
                body={post.body}
                handleChangeTitle={ (e) => this.handleChangeTitle(e.target.value)}
                handleChangeBody={(e) => this.handleChangeBody(e.target.value)}
                handleSubmit={(e) => this.handleSubmitEdit(e, {postId: post.id, userId: post.userId, editPost: true})}
                closeButton={() => this.showEdit({showPost: true})}
              />
              ) : null
            }
            {
              showComments ? (<div className="posts-image">
              {
                comments ? comments.map((comment, i) => {
                  return comment.postId === post.id ? (
                    <Card className="posts-image-card" key={i}>
                      <Grid container item lg={12} md={12} sm={12} xs={12} spacing={1}>
                        <Grid container item lg={11} md={11} sm={11} xs={11} spacing={0}>
                          <div className="posts-image-card-avatar" >
                            <div>
                              <Avatar alt="Remy Sharp" src={ImageMale} />
                              <label>{comment.name}</label>
                            </div>
                          </div>
                          <p>"{comment.body}"</p>
                        </Grid>
                        <Grid container item lg={1} md={1} sm={1} xs={1} spacing={0} justify="center" alignItems="center">
                          <div>
                            <p onClick={() => this.addPost({openModalComment: true})}><AddCircleIcon/></p>
                            <ModalComponent
                              open={showModalComment}
                              handleClose={() => this.addPost({openModalComment: true})}
                              modalbody={this.modalBodyAddComment({postId: post.id})}
                            />
                            <p onClick={() => this.showEdit({showComment: true, commentId: comment.id})}><EditIcon/></p>
                            <p onClick={() => this.deletePost({commentId: comment.id, deleteComment: true})}><DeleteIcon/></p>
                          </div>
                        </Grid>
                      </Grid>
                      {
                        showEditComment && indexEditComment === comment.id ? (
                          <Form
                          labelbutton="Save"
                          header="Edit Comment"
                          label="Name"
                          textarea="Body"
                          email="Email"
                          title={comment.name}
                          body={comment.body}
                          emailvalue={comment.email}
                          handleChangeTitle={ (e) => this.handleChangeTitle(e.target.value)}
                          handleChangeBody={(e) => this.handleChangeBody(e.target.value)}
                          handleSubmit={(e) => this.handleSubmitEdit(e, {postId: post.id, userId: post.userId, commentId: comment.id, editComment: true})}
                          closeButton={() => this.showEdit({showComment: true})}
                        />
                        ) : null
                      }
                    </Card>
                  ) : null
                }) : null
              }
            </div>) : null
            }
          </div>
          )
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(Album);
