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
    img: '',
    title: '',
    desc: '',
  });

  const [editingItemId, setEditingItemId] = useState(null); // Yangi qo'shilgan qism taxrirlanishi uchun

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://85.209.2.107:4100/news');
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleDelete = async (newsItem) => {
    try {
      await axios.delete(`http://85.209.2.107:4100/delete-image/${newsItem.img}`);
      await axios.delete(`http://85.209.2.107:4100/news/delete/${newsItem._id}`);
      toast.success('Image deleted successfully');
      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Error deleting image');
    }
  };

  const handleEdit = (newsItem) => {
    setEditingItemId(newsItem._id);
    setFormData({
      img: newsItem.img,
      title: newsItem.title,
      desc: newsItem.desc,
    });
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
      await axios.post('http://85.209.2.107:4100/upload', formData, {
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
          await axios.put(`http://85.209.2.107:4100/news/update/${editingItemId}`, formData);
          toast.success('Information updated successfully');
        } else {
          // If editingItemId doesn't exist, create a new item
          await axios.post('http://85.209.2.107:4100/news/create', formData);
          toast.success('Ma\'lumot qo\'shildi');
        }

        setEditingItemId(null);
        setFormData({ img: '', title: '', desc: '' });
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
          <button type="submit" onClick={handleUpload}>
            Yangilash
          </button>
        </form>
        <div className="news-container">
          {images &&
            images.map((newsItem) => (
              <div key={newsItem._id} className="news-card">
                <img src={`http://85.209.2.107:4100/uploads/${newsItem.img}`} alt={newsItem.title} />
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
