import React, { useContext, useEffect, useState } from 'react';
import './Slider.scss';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
import { Context } from '../../Context/Context';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

function Slider() {
  const { navbar, setNavbar } = useContext(Context);
  const [selectedFile, setSelectedFile] = useState(null);
  const [images, setImages] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
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
      const response = await axios.post('http://navoiyps.uz/slider/create', { img: selectedFile.name }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data) {
        toast.success('Slider joylandi');
      } else {
        toast.error('Xatolik yuz berdi!');
      }


      // Display success message
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Error uploading image');
    }
  };
  useEffect(() => {
    // Fetch the list of images when the component mounts
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://navoiyps.uz/slider');
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleDelete = async (image) => {
    try {
      // Make a DELETE request to delete the image from the server
      await axios.delete(`http://navoiyps.uz/delete-image/${image.img}`);
      await axios.delete(`http://navoiyps.uz/slider/delete/${image._id}`);



      // Display success message
      toast.success('Image deleted successfully');

      // Fetch the updated list of images
      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Error deleting image');
    }
  };

  return (
    <>
      <ToastContainer />
      {navbar ? <Sidebar /> : null}
      <Navbar />
      <div className='main'>
        <h2>Slider O'rnatish</h2>
        <div className='main-form'>
          <label>
            <input type="file" onChange={handleFileChange} />
          </label>
          <button onClick={handleUpload}>Qo'shish</button>
        </div>
        <div className="image-container">
          {images && images.map((e) => (
            <div key={e.index} className="image-card">
              <img src={`http://navoiyps.uz/uploads/${e.img}`} alt={e} />
              <button className='del-btn' onClick={() => handleDelete(e)}>O'chirish</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Slider;
