import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './News.scss';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
import { Context } from '../../Context/Context';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

function News() {
  const { navbar, setNavbar } = useContext(Context);
  const [selectedFile, setSelectedFile] = useState(null);
  const [images, setImages] = useState(null);
  const [formData, setFormData] = useState({
    option: 'rasm',
    img: '',
    iframe: '',
    title: '',
    desc: '',
  });

  const [editingItemId, setEditingItemId] = useState(null); // Yangi qo'shilgan qism taxrirlanishi uchun

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get('https://navoiyps.uz/news');
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleDelete = async (newsItem) => {
    try {
      await axios.delete(`https://navoiyps.uz/news/delete/${newsItem._id}`);
      toast.success('deleted successfully');
      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Error deleting image');
    }
  };

  const handleEdit = (newsItem) => {
    setEditingItemId(newsItem._id);
    setFormData({
      option: 'rasm', // Sizning option turingizga qarab, agar tanlangan option 'rasm' bo'lsa, sizga rasmni tanlash uchun input chiqadi; aks holda, 'video' bo'lsa, video linkni kiritish uchun text input.
      img: newsItem.img,
      iframe: newsItem.iframe || '', // Video linki bor yoki yo'qligini tekshirish
      title: newsItem.title,
      desc: newsItem.desc,
    });
  };

  // ... (yukoridagi kodlar)

const handleInputChange = (e) => {
  const { name, value } = e.target;

  // Agar o'zgaruvchini nomi "option" bo'lsa va qiymati "video" bo'lsa, "img"ni bo'sh qo'yamiz
  if (name === 'option' && value === 'video') {
    setFormData({
      ...formData,
      [name]: value,
      img: '', // Rasmni bo'sh qilish
    });
  } else if (name === 'option' && value === 'rasm') {
    setFormData({
      ...formData,
      [name]: value,
      iframe: '', // Video linkni bo'sh qilish
    });
  } else {
    setFormData({
      ...formData,
      [name]: value,
    });
  }
};

// ... (qolgan kodlar)


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
      await axios.post('https://navoiyps.uz/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Error uploading image');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.title !== '...' || formData.desc !== '...') {
      try {
        if (editingItemId) {
          // If editingItemId exists, update the existing item
          await axios.put(`https://navoiyps.uz/news/update/${editingItemId}`, formData);
          toast.success('Information updated successfully');
        } else {
          // If editingItemId doesn't exist, create a new item
          await axios.post('https://navoiyps.uz/news/create', formData);
          toast.success('Ma\'lumot qo\'shildi');
        }

        setEditingItemId(null);
        setFormData({ option: 'rasm', img: '', iframe: '', title: '', desc: '' });
        setSelectedFile(null);
        fetchImages();
      } catch (error) {
        console.error('Error updating/adding information:', error);
        toast.error('Error updating/adding information');
      }
    } else {
      toast.warning('Information not modified in the fields.');
    }
  };

  return (
    <>
      <ToastContainer />
      {navbar ? <Sidebar /> : null}
      <Navbar />
      <div className='main'>
        <h2>Yangiliklar</h2>
        <form onSubmit={handleSubmit} className='main-form'>
          <label>
            <select name="option" onChange={handleInputChange} value={formData.option || ''}>
              <option value="rasm">Rasm</option>
              <option value="video">Video</option>
            </select>
          </label>

          {formData.option === 'rasm' && (
            <label>
              <input type="file" onChange={handleFileChange} />
            </label>
          )}

          {formData.option === 'video' && (
            <label>
              <input
                type='text'
                name="iframe"
                value={formData.iframe}
                onChange={handleInputChange}
                placeholder="Video havolasi"
              />
            </label>
          )}

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

          <button type="submit" onClick={handleUpload}>
            Yangilash
          </button>
        </form>
        <div className="news-container">
          {images &&
            images.map((newsItem) => (
              <div key={newsItem._id} className="news-card">
                {newsItem.img && <img src={`https://navoiyps.uz/uploads/${newsItem.img}`} alt={newsItem.title} />}
                {newsItem.iframe && <iframe width="100%" height="auto" src={newsItem.iframe} title={newsItem.title}></iframe>}
                <div className="news-content">
                  <h3>{newsItem.title}</h3>
                </div>
                <div className="news-actions">
                  <button className='edit-btn' onClick={() => handleEdit(newsItem)}>
                    Taxrirlash
                  </button>
                  <button className='delete-btn' onClick={() => handleDelete(newsItem)}>
                    O'chirish
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default News;
