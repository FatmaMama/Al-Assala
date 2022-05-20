import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCart from '../products/ProductCart';

export default function Slide({products}) {
    const slider = React.useRef(null);

    let settings = {
        arrows: false,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        responsive: [
            {
              breakpoint: 1750,
              settings: {
              slidesToShow: 5,
              }
            },
            {
              breakpoint: 1450,
              settings: {
              slidesToShow: 4,
              }
            },
            {
              breakpoint: 1100,
              settings: {
               slidesToShow: 3,
              }
            },
            {
                breakpoint: 900,
                settings: {
                 slidesToShow: 2,
                }
              },
            {
              breakpoint: 608,
              settings: {
               slidesToShow: 2,
              }
             },
             {
              breakpoint: 540,
              settings: {
               slidesToShow: 1,
              }
             }
          ]
    };

  return (
    <div className='slider'>
        <button className='slider__btn-left' onClick={() => slider?.current?.slickPrev()}>
            <i className="fa fa-chevron-left"></i>
        </button>
        <button className='slider__btn-right' onClick={() => slider?.current?.slickNext()}>
            <i className="fa fa-chevron-right"></i>
        </button>
        <Slider ref={slider} {...settings} className='slider__slide'>
            {products && products.map(product => (
                <ProductCart product={product} key={product._id}/>
            ))}
        </Slider>
    </div>
  )
}
