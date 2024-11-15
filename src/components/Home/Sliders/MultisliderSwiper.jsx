import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { LuCheckCircle } from 'react-icons/lu';

const MultisliderSwiper = ({ products }) => {
  return (
    <div className='w-full'>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
          el: '.custom-pagination',
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
        {
          products.map((product, i) => (
            <SwiperSlide>
              <div key={i} className="w-full border hover:border-none shadow-xl hover:shadow-none bg-white rounded-2xl overflow-hidden relative team-card m-4">
                <div className='p-[20px] flex justify-between items-center'>
                  <div className="card-body text-blue-900/85 space-y-2">
                    <h2 className="card-title">{product?.name}</h2>
                    <p className='text-orange-600 text-md font-semibold'>Price: Rs {product?.resalePrice}</p>
                    <p>Location: {product?.location}</p>
                    <p>Bought by: Rs {product?.originalPrice}</p>
                    <p>Old: {product?.usage}</p>
                    <p>Posted on: {product?.postedOn}</p>
                    <p className='flex gap-6 items-center text-green-500 text-lg font-semibold'>Seller: {product?.seller} {<LuCheckCircle className={`${product?.verified ? "font-bold text-blue-700 size-6" : "hidden"}`} />}</p>
                  </div>
                  <div className="w-1/2 overflow-hidden relative">
                    <img className="w-full object-contain h-[281px] hover:scale-110 scale-100 transition-all duration-500" src={product?.picture} alt="product" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>
      <div className="custom-pagination" />
    </div>
  );
};

export default MultisliderSwiper;