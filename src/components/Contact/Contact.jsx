import React, { useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

const Contact = () => {

  const form = useRef();

  const handleSend = (event) => {
    event.preventDefault();

    emailjs
      .sendForm('service_74gfynj', 'template_x318ajb', form.current, {
        publicKey: 'Znxd_Shf7UA5AjS3N'
      })
      .then(() => {
        toast.success("We will get back to you soon");
        event.target.reset();
      },
        (error) => {
          toast.error("Sorry, message could not be delivered");
        },
      );
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='py-[100px]'>
      <h1 className="text-3xl text-center font-semibold text-blue-500 underline-offset-4">Contact Form</h1>
      <form onSubmit={handleSend} ref={form} className="w-[300px] mx-auto mb-10">
        <input type="text" name="subject" placeholder="subject" className="w-full mt-6 p-3 ring rounded-md" />
        <input type="text" name="name" placeholder="Full Name" className="w-full mt-6 p-3 ring rounded-md" />
        <input type="email" name="email" placeholder="Email ID" className="w-full mt-6 p-3 ring rounded-md" />
        {/* <input type="file" name="photo" placeholder="Photo" className="w-full mt-6 p-3 ring rounded-md" /> */}
        <textarea type="" name="message" placeholder="message" className="w-full h-[100px] mt-6 p-3 ring rounded-md" />
        <button type="submit" name="submit" className="w-full mt-6 p-3 ring rounded-md bg-slate-500 text-white font-semibold">Submit</button>
      </form>
    </div>
  );
};

export default Contact;