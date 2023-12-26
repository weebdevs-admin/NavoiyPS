import React, { useContext, useState, useEffect } from 'react';
import './Main.scss';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
import { Context } from '../../Context/Context';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

function Main() {
  const { navbar, setNavbar } = useContext(Context);
  const [formData, setFormData] = useState({
    Title: '...',
    Desc: '...',
    Button: '...',
  });

  // API-dan ma'lumotlarni olish uchun useEffect qo'shing
  useEffect(() => {
    axios.get('http://localhost:4100/statist')
      .then((response) => {
        if (response.data.length > 0) {
          const initialData = response.data[0]; // Avvalgi ma'lumotlardan birini tanlab olish
          setFormData({
            established: initialData.established,
            teachers: initialData.teachers,
            exteacher: initialData.exteacher,
            students: initialData.students,
            winners: initialData.winners,
          });
        }
      })
      .catch((error) => {
        console.error('Ma\'lumotlarni olishda xatolik yuzaga keldi:', error);
      });
  }, []); // Bo'sh massiv berilganligi uchun faqat bir marta bajariladi

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.established !== '...' || formData.teachers !== '...' || formData.students !== '...') {
      try {
        const response = await axios.put(
          'http://localhost:4100/statist/update/658add8765e4331de7f6a829',
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
        <h2>Bosh Menyu</h2>
        <form className="main-form" onSubmit={handleSubmit}>
          <label>
            <input
              type="number"
              name="established"
              value={formData.established}
              onChange={handleInputChange}
              placeholder="Tashkil etilgan yil"
            />
          </label>
          <label>
            <input
              type='number'
              name="teachers"
              value={formData.teachers}
              onChange={handleInputChange}
              placeholder="O'qituvchilar"
            />
          </label>
          <label>
            <input
              type="number"
              name="exteacher"
              value={formData.exteacher}
              onChange={handleInputChange}
              placeholder="Chet ellik o'qituvchilar"
            />
          </label>
          <label>
            <input
              type="number"
              name="students"
              value={formData.students}
              onChange={handleInputChange}
              placeholder="O'quvchilar"
            />
          </label>
          <label>
            <input
              type="number"
              name="winners"
              value={formData.winners}
              onChange={handleInputChange}
              placeholder="Olimpiada g'oliblari"
            />
          </label>
          <button type="submit">Yangilash</button>
        </form>
      </div>
    </>
  );
}

export default Main;
