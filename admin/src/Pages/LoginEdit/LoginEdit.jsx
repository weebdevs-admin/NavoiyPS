import React, { useContext, useState } from 'react';
import './LoginEdit.scss';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';
import { Context } from '../../Context/Context';
import { toast, ToastContainer } from 'react-toastify';

function LoginEdit() {
  const { navbar, setNavbar } = useContext(Context);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      toast.error('Iltimos, barcha maydonlarni to\'ldiring.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error('Yangi parolni tasdiqlash xato.');
      return;
    }

    axios
      .get('http://localhost:4100/login')
      .then((response) => {
        if (response.status === 200) {
          const apiPassword = response.data[0].Password;
          if (currentPassword === apiPassword) {
            // Joriy parol API-dagi parol bilan to'g'ri keladi
            axios
              .put('http://localhost:4100/login/update/658ad8c565e4331de7f6a815', {
                Password: newPassword,
              })
              .then((response) => {
                if (response.status === 200) {
                  toast.success('Parol muvaffaqiyatli o\'zgartirildi.');
                  setCurrentPassword('');
                  setNewPassword('');
                  setConfirmNewPassword('');
                }
              })
              .catch((error) => {
                toast.error('Parolni o\'zgartirishda xatolik yuzaga keldi.');
                console.error('Xatolik:', error);
              });
          } else {
            toast.error('Joriy parol xato.');
          }
        }
      })
      .catch((error) => {
        toast.error('Server bilan ulanishda xatolik yuzaga keldi.');
        console.error('Xatolik:', error);
      });
  };

  return (
    <>
      <ToastContainer />
      {navbar ? <Sidebar /> : null}
      <Navbar />
      <div className='Forgot'>
      <h3 className="title">Parolni o'zgartirish</h3>
      <form className="form">
        <input
          type="password"
          placeholder="Joriy Parol"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Yangi Parol"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Yangi Parolni Takrorlang"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
        <button type="button" onClick={handlePasswordChange}>
          Yangilash
        </button>
      </form>
      </div>
    </>
  );
}

export default LoginEdit;
