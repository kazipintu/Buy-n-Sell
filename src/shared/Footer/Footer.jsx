import React from 'react';

const Footer = () => {
  return (
    <div className='bg-slate-300'>
      <div className=" lg:w-[95%] px-[1%] mx-auto py-16">
        <footer className="">
          <div className="footer justify-between">
            <nav>
              <h6 className="footer-title text-[18px]">SERVICES</h6>
              <a className="link link-hover text-[16px]">Customer Care</a>
              <a className="link link-hover text-[16px]">Easy Refund</a>
              <a className="link link-hover text-[16px]">Authenticity</a>
              <a className="link link-hover text-[16px]">Warranty</a>
            </nav>
            <nav>
              <h6 className="footer-title text-[18px]">PRODUCT QUALITY</h6>
              <a className="link link-hover text-[16px]">Verified Seller</a>
              <a className="link link-hover text-[16px]">Inspect to Purchase</a>
              <a className="link link-hover text-[16px]">Product Refurbishment</a>
            </nav>
            <nav>
              <h6 className="footer-title text-[18px]">OUR ADDRESS</h6>
              <a className="link link-hover text-[16px]">Signal, 151/7, 4th Floor, GoodLuck Center, <br /> Panthapath, Green Rd, <br />Dhaka 1205, <br />Bangladesh</a>
            </nav>
          </div>
        </footer>

        <div className="text-center pt-24">
          <p>Copyright 2024 No Rights Reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;