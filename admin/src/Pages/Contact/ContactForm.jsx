import React, { useContext, useEffect, useState } from 'react';
import './ContactForm.scss';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
import { Context } from '../../Context/Context';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

function ContactForm() {
  const { navbar, setNavbar } = useContext(Context);
  const [contactFormData, setContactFormData] = useState([]);

  // Malumotni serverdan olish uchun useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://navoiyps.uz/contact');
        setContactFormData(response.data.reverse());
      } catch (error) {
        console.error('Malumotlarni olishda xatolik yuzaga keldi', error);
        toast.error('Malumotlarni olishda xatolik yuzaga keldi');
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <ToastContainer />
      {navbar ? <Sidebar /> : null}
      <Navbar />
      <div className='main'>
      <h2 className="title">Taklif va Izoxlar</h2>
      <ul className="contact-form-list">
        {contactFormData.map((data) => (
          <li key={data._id}>
            <h4>Ismi: {data.firstname}</h4>
            <p>Email: {data.email}</p>
            <p>Mavzu: {data.title}</p>
            <p>Xabari: {data.message}</p>
          </li>
          
        ))}
      </ul>
      </div>
    </>
  );
}

export default ContactForm;
