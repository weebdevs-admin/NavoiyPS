import React, { useContext } from 'react';
import './Sidebar.scss';
import {Link} from 'react-router-dom'
import { Context } from '../../Context/Context';

const Sidebar = () => {
    const {setNavbar}= useContext(Context)
    function logout(){
        window.localStorage.clear() 
    }
    return (
        <aside className="sidebar contai">
            <ul className="sidebar-list container">
                <Link className='exit-btn'><li className="sidebar-item"><i onClick={()=>setNavbar(false)} className="fa-solid fa-xmark"></i> </li></Link>
                <Link className='dashboard'><li className="sidebar-item"><i className="fa-solid fa-gear"></i> Boshqaruv</li></Link>
                <Link to='/'><li className="sidebar-item"><i className="fa-solid fa-house"></i> Bosh Menyu</li></Link>
                <Link to='/iframe'><li className="sidebar-item"><i className="fa-solid fa-link"></i> You Tube Link</li></Link>
                <Link to='/slider'><li className="sidebar-item"><i className="fa-solid fa-image"></i> Slayder</li></Link>
                <Link to='/photos'><li className="sidebar-item"><i className="fa-solid fa-image"></i> Foto Lavhalar</li></Link>
                <Link to='/abaut'><li className="sidebar-item"><i className="fa-solid fa-address-card"></i> Biz Haqimizda</li></Link>
                <Link to='/partners'><li className="sidebar-item"><i className="fa-solid fa-users"></i> Xamkorlar</li></Link>
                <Link to='/news'><li className="sidebar-item"><i className="fa-solid fa-book"></i> Yangiliklar</li></Link>
                <Link to='/contact'><li className="sidebar-item"><i className="fa-solid fa-address-book"></i> Bog'lanish</li></Link>
                <Link to='/team'><li className="sidebar-item"><i className="fa-solid fa-users"></i> Jamoa</li></Link>
                
                <Link to='/password'><li className="sidebar-item"><i class="fa-solid fa-lock"></i> Parolni o'zgartirish</li></Link>
                <Link onClick={logout}><li className="sidebar-item"><i className="fa-solid fa-right-to-bracket"></i> Chiqish</li></Link>
            </ul>
        </aside>
    );
};

export default Sidebar;
