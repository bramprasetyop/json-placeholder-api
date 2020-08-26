import React, {Component} from 'react'
import { connect } from 'react-redux'
import { fetchDataUsers } from '../../actions/index'
import Loading from '../../components/Loading/index'
import CarouselComponent from '../../components/Carousel'
import './styles.scss'

const mapStateToProps = (state) =>{
  return{
    users : state.userReducers,
    loading: state.loadingReducers.loading
  }
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.props.dispatch(fetchDataUsers())
  }

  render() {
    const { users, loading } = this.props
    return (
      <div className="home">
        {loading && <Loading />}
        <CarouselComponent
          authors={users}
        />
      </div>
    )
  }
}



export default connect(mapStateToProps, null)(Home);