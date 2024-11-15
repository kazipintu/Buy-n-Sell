import React from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  return (
    <div className='bg-slate-200 py-[100px]'>
      <h1 className='w-1/2 mx-auto text-3xl lg:text-5xl text-center font-bold text-blue-500  capitalize tracking-wide'>discover your affordable and durable <span className='underline'>used items</span></h1>
      <div className='lg:w-[95%] px-[1%] mx-auto pt-[70px]'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <div className='border hover:border-none shadow-2xl hover:shadow-none bg-white rounded-2xl overflow-hidden relative team-card p-4'>
            <div className="overflow-hidden relative space-x-2 text-center">
              <img className="inline w-[130px] object-contain h-[130px] hover:scale-110 scale-100 transition-all duration-500" src="/assets/bed2.png" alt="furniture" />
              <img className="inline w-[130px] object-contain h-[130px] hover:scale-110 scale-100 transition-all duration-500" src="/assets/living-room.png" alt="furniture" />
              <img className="inline w-[130px] object-contain h-[130px] hover:scale-110 scale-100 transition-all duration-500" src="/assets/table.png" alt="furniture" />
            </div>

            <div className="w-full bg-white tracking-wider px-5 pt-5 flex justify-between items-center">
              <h4 className="text-xl font-bold text-blue-900">Furnitures</h4>
              <Link to={'/furnitures'}><button className="btn btn-neutral">Explore</button></Link>
            </div>
          </div>
          <div className='border hover:border-none shadow-2xl hover:shadow-none bg-white rounded-2xl overflow-hidden relative team-card p-4'>
            <div className="overflow-hidden relative space-x-2 text-center">
              <img className="inline w-[130px] object-contain h-[130px] hover:scale-110 scale-100 transition-all duration-500" src="/assets/scooter2.png" alt="furniture" />
              <img className="inline w-[130px] object-contain h-[130px] hover:scale-110 scale-100 transition-all duration-500" src="/assets/scooter3.png" alt="furniture" />
              <img className="inline w-[130px] object-contain h-[130px] hover:scale-110 scale-100 transition-all duration-500" src="/assets/scooter1.png" alt="furniture" />
            </div>

            <div className="w-full bg-white px-5 pt-5 tracking-wider flex justify-between items-center">
              <h4 className="text-xl font-bold text-blue-900">Scooters</h4>
              <Link to={'/scooters'}><button className="btn btn-neutral">Explore</button></Link>
            </div>
          </div>
          <div className='border hover:border-none shadow-2xl hover:shadow-none bg-white rounded-2xl overflow-hidden relative team-card p-4'>
            <div className="overflow-hidden relative space-x-2 text-center">
              <img className="inline w-[130px] object-contain h-[130px] hover:scale-110 scale-100 transition-all duration-500" src="/assets/electronics1.png" alt="furniture" />
              <img className="inline w-[130px] object-contain h-[130px] hover:scale-110 scale-100 transition-all duration-500" src="/assets/electronics2.png" alt="furniture" />
              <img className="inline w-[130px] object-contain h-[130px] hover:scale-110 scale-100 transition-all duration-500" src="/assets/electronics3.png" alt="furniture" />
            </div>

            <div className="w-full bg-white tracking-wider px-5 pt-5 flex justify-between items-center">
              <h4 className="text-xl font-bold text-blue-900">Appliances</h4>
              <Link to={'/appliances'}><button className="btn btn-neutral">Explore</button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;