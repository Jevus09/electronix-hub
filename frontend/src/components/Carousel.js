import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import apple from '../images/carousel/apple.webp';
import android from '../images/carousel/android.jpg';
import fitbit from '../images/carousel/fitbit.webp';
import banner1 from '../images/carousel/banner1.jpg'
import banner2 from '../images/carousel/banner2.jpg'
import banner3 from '../images/carousel/banner3.jpg'
import banner4 from '../images/carousel/banner4.jpg'
import banner5 from '../images/carousel/banner5.jpg'
import banner6 from '../images/carousel/banner6.webp'
import { Link } from 'react-router-dom';


const Carousel = () => {
  const responsive = {
    0: {
      items: 1,
      itemsFit: 'fill',


    },
    524: {
      items: 1,

    },
  };

  const data = [
    {
      id: 1,
      image: apple,
      title: 'apple',
    },
    {
      id: 2,
      image: android,
      title: 'android',
    },
    {
      id: 3,
      image: fitbit,
      title: 'fitbit',
    },

    {
      id: 4,
      image: banner1,
      title: 'apple',
    },
    {
      id: 5,
      image: banner2,
      title: 'android',
    },
    {
      id: 6,
      image: banner3,
      title: 'fitbit',
    },
    {
      id: 7,
      image: banner4,
      title: 'sale',
    },
    {
      id: 8,
      image: banner5,
      title: 'watch',
    },
    {
      id: 9,
      image: banner6,
      title: 'watch',
    },
  ];

  const items = data.map((item) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '2vh'
      }}
      key={item.id}
    >
      <Link to='/products'>
        <img className='carousel-image'
          src={item.image}
          title={item.title}
          alt={item.title}
          style={{ height:'40vh', width:'100%' }}
        />
      </Link>
    </div>
  ));

  return (
    <AliceCarousel
      mouseTracking
      autoPlay
      infinite
      autoPlayInterval={2500}
      animationDuration={1500}
      responsive={responsive}
      disableButtonsControls
      autoWidth
    >
{items}
    </AliceCarousel>
  );
};

export default Carousel;