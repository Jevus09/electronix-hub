import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import apple from '../images/carousel/apple.webp';
import android from '../images/carousel/android.jpg';
import fitbit from '../images/carousel/fitbit.webp';
import sale from '../images/carousel/sale.jpg';
import watch from '../images/carousel/watch.webp';
import { Link } from 'react-router-dom';


const Carousel = () => {
  const responsive = {
    0: {
      items: 1,


    },
    924: {
      items: 1,
      itemsFit: 'contain ',
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
      image: sale,
      title: 'sale',
    },
    {
      id: 5,
      image: watch,
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
        <img
          src={item.image}
          title={item.title}
          alt={item.title}
          style={{ height:'40vh', maxHeight:'400px', width:'100%' }}
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