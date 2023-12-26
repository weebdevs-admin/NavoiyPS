import React, { useContext, useEffect, useState } from 'react';
import './Abaut.scss';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
import { Context } from '../../Context/Context';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

function Abaut() {
  const { navbar, setNavbar } = useContext(Context);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    img: '...',
    title: '...',
    desc: '...',
  });
  useEffect(() => {
    axios.get('http://navoiyps.uz/abaut')
      .then((response) => {
        if (response.data.length > 0) {
          const initialData = response.data[0]; // Avvalgi ma'lumotlardan birini tanlab olish
          setFormData({
            img: initialData.img,
            title: initialData.title,
            desc: initialData.desc,
          });
        }
      })
      .catch((error) => {
        console.error('Ma\'lumotlarni olishda xatolik yuzaga keldi:', error);
      });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if ( formData.title !== '...' || formData.desc !== '...') {
      try {
        const response = await axios.put(
          'http://navoiyps.uz/abaut/update/658adc8865e4331de7f6a824',
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
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setFormData({
      ...formData,
      img: event.target.files[0] ? event.target.files[0].name : '...',
    });
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Iltimos rasm tanlang!');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Make a POST request to upload the image
      await axios.post('http://navoiyps.uz/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });


      // Display success message
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Error uploading image');
    }
  };
 
  

  

  return (
    <>
      <ToastContainer />
      {navbar ? <Sidebar /> : null}
      <Navbar />
      <div className='main'>
        <h2>Biz Haqimizda</h2>
        <form onSubmit={handleSubmit} className='main-form'>
          <label>
            <input type="file" onChange={handleFileChange} />
          </label>
          <label>
            <input
              type='text'
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Sarlavha"
            />
          </label>
          <label>
            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleInputChange}
              placeholder="To'liq ma'lumot"
            />
          </label>
          <button type="submit" onClick={handleUpload}>Yangilash</button>
        </form>
        
      </div>
    </>
  );
}

export default Abaut;
