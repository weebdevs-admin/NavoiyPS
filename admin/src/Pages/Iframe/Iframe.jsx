import React, { useContext, useState, useEffect } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
import { Context } from '../../Context/Context';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

function Iframe() {
  const { navbar, setNavbar } = useContext(Context);
  const [formData, setFormData] = useState({
    Title: '...',
    Desc: '...',
    Button: '...',
  });

  // API-dan ma'lumotlarni olish uchun useEffect qo'shing
  useEffect(() => {
    axios.get('https://navoiyps.uz/iframes')
      .then((response) => {
        if (response.data.length > 0) {
          const initialData = response.data[0]; // Avvalgi ma'lumotlardan birini tanlab olish
          setFormData({
            src: initialData.src,
          });
        }
      })
      .catch((error) => {
        console.error('Ma\'lumotlarni olishda xatolik yuzaga keldi:', error);
      });
  }, []); // Bo'sh massiv berilganligi uchun faqat bir marta bajariladi

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.src !== '...') {
      try {
        const response = await axios.put(
          'https://navoiyps.uz/iframes/update/658f2afabc94be5b09881a06',
          formData
        );

        if (response.status === 200) {
          toast.success('Ma\'lumot muvaffaqiyatli yangilandi')
        }
      } catch (error) {
        console.error('Ma\'lumotni yangilashda xatolik yuzaga keldi:', error);
        // Xatolikni qayta ishlang
      }
    } else {
      toast.warning('Ma\'lumotlarda o\'zgartirishsiz holatda saqlanildi.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
     <ToastContainer />
      {navbar ? <Sidebar /> : null}
      <Navbar />
      <div className="main">
        <h2>You Tube Iframe</h2>
        <form className="main-form" onSubmit={handleSubmit}>
          <label>
            <input
              type='String'
              name="src"
              value={formData.src}
              onChange={handleInputChange}
              placeholder="You Tube Iframe SRC"
            />
          </label>
          
          <button type="submit">Yangilash</button>
        </form>
      </div>
    </>
  );
}

export default Iframe;
