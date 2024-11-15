import React, { useEffect } from 'react';
import { productData } from '../../util/productData';
import Categories from './Categories/Categories';
import MultisliderSwiper from './Sliders/MultisliderSwiper';
import Contact from '../Contact/Contact';


const Home = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      <div className='bg-slate-100 w-full mx-auto pt-[200px] pb-[100px]'>
        <MultisliderSwiper products={productData} />
      </div>
      <Categories />
      <Contact />
    </div>
  );
};

export default Home;