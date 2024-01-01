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
        const response = await axios.get('https://navoiyps.uz/contact');
        setContactFormData(response.data.reverse());
      } catch (error) {
        console.error('Malumotlarni olishda xatolik yuzaga keldi', error);
        toast.error('Malumotlarni olishda xatolik yuzaga keldi');
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

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
              <p>Telefon Raqami: {data.phone}</p>
              <p>Mavzu: {data.title}</p>
              <p>Xabari: {data.message}</p>
              <p>Sanasi: {formatDate(data.createdAt)}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ContactForm;
