import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchDataUsers, fetchUserAlbum } from '../../actions/index';
import { Grid } from '@material-ui/core'
import Loading from '../../components/Loading/index'
import  { Link } from 'react-router-dom';
import Routes from './routes'
import _ from 'lodash'
// import  from '@material-ui/core/CircularProgress';
// import './styles.scss'

const mapStateToProps = (state) =>{
  return{
    users : state.userReducers,
    loading: state.loadingReducers.loading
  }
}

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.props.dispatch(fetchDataUsers())
  }

  getAlbum(id){
    this.props.dispatch(fetchUserAlbum(id))
  }

  render() {
    const currentUrl = this.props.location.pathname
    const { users, loading } = this.props
    const paramId = Number(this.props.match.params.id)
    const filteredUser = users ? users.filter(user => {
      return user.id === paramId;
    }): []
    return (
      <div className="home">
        <Grid container spacing={2}>
          {loading && <Loading />}
          <Grid container item lg={6} md={6} sm={12} xs={12} spacing={2}>
            <div>
              <img src="https://images4.penguinrandomhouse.com/author/2276" alt=""/>
              {
                filteredUser.map((user, i) => {
                  return (
                    <React.Fragment key={i}>
                    <h1 > {user.name} </h1>
                    <h4>About the Author</h4>
                    <p> {user.name} is the author of four acclaimed collections of poetry, most recently The Players; three critically acclaimed novels, most recently, The Prize; a New York Times best-selling memoir, History of a Suicide: My Sister’s Unfinished Life; and Poetry Will Save Your Life: A Memoir. Her poems and essays have appeared in Best American Poetry, The New Yorker, The Atlantic, Harper’s, O Magazine, The Kenyon Review, Harvard Review, and Paris Review, among others. She coedited, with Helen Schulman, the anthology Wanting a Child. She is an Executive Editor and Vice President at W. W. Norton &amp; Company. Her work has been a finalist for the James Laughlin Prize, The Patterson Prize, and Books for a Better Life. In 2014, she was honored by the Poetry Society of America for her distinguished contribution to poetry. She lives in New York City.</p>
                    </React.Fragment>
                  )
                })
              }
            </div>
          </Grid>
          <hr/>
          <Grid container item lg={6} md={6} sm={12} xs={12} spacing={2} justify="center" alignItems="center">
            <Grid className={_.includes(currentUrl, 'posts') ? 'home-button active' : 'home-button'} item lg={6} md={6} sm={6} xs={6}>
              <Link to={{pathname:`/users/${paramId}/posts`}}>
                <h1>POSTS</h1>
              </Link>
            </Grid>
            <Grid className={_.includes(currentUrl, 'album') && _.includes(currentUrl, 'users') ? 'home-button active' : 'home-button'} item lg={6} md={6} sm={6} xs={6}>
              <Link to={{pathname:`/users/${paramId}/album`}}>
                <h1>ALBUMS</h1>
              </Link>
            </Grid>
            <Grid container item lg={12} md={12} sm={12} xs={12} spacing={2}>
              <Routes/>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}



export default connect(mapStateToProps, null)(Detail);