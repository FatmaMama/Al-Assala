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
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 1024,
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
              breakpoint: 600,
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
        <Slider ref={slider} {...settings} className='m-5'>
            {products && products.map(product => (
                <ProductCart product={product} key={product._id}/>
            ))}
        </Slider>
    </div>
  )
}
