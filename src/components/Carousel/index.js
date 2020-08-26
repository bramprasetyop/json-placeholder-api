import React, {Component} from 'react';
import  { Link } from 'react-router-dom';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from '../../assets/image/img_3.jpeg'
import './styles.scss'

  const responsiveDefaultCard = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024
      },
      items: 4
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0
      },
      items: 1
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464
      },
      items: 3
    }
  }


  class CarouselComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }


  render() {
    const { authors } = this.props
    return (
      <div 
        className="carousel"
        authors={authors}
      >
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          containerClass="container"
          dotListClass=""
          draggable
          focusOnSelect={false}
          keyBoardControl
          minimumTouchDrag={80}
          renderDotsOutside
          responsive={{...responsiveDefaultCard}}
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          {
            authors.map((user, i) => {
              const { name, id, website, email } = user
              return (
                <div className="sc-card-image" key={i} >
                  <Link to={{pathname:`/users/${id}/posts`}}>
                    <img
                      id={i}
                      src={Image} alt=""
                      style={{
                        display: 'block',
                        height: '95%',
                        width: '95%'
                      }}
                    />
                    <h1>{name}</h1>
                  </Link>
                  <div className="flex start-xs">
                    <a href={`http://${website}`} target="blank">{website}</a>
                    <p>{email}</p>
                  </div>
                </div>
              )
            })
          }
        </Carousel>
      </div>
    )
  }
}
export default CarouselComponent