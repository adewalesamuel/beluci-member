import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg'
import { 
    FiBook as IconBook,
    FiCalendar as IconEvent, 
    FiUsers as IconUsers, 
    FiMessageSquare as IconForum } from 'react-icons/fi';
import { TbLogout } from 'react-icons/tb';
import { Services } from '../services';
import { Utils } from '../utils';

export function MainMenu() {
    const abortController = new AbortController();

    const navigate = useNavigate();

    const handleLogoutClick = e => {
        e.preventDefault();

        if (confirm('Voulez vous vraiment vous deconnecter ?')) {
            Services.AuthService.logout(
                JSON.stringify({}), abortController.signal);
            Utils.Auth.removeSessionToken();
            
            navigate('/connexion', {replace: true});
        }
    }
    return (
        <aside className="js-navbar-vertical-aside navbar navbar-vertical-aside 
            navbar-vertical navbar-vertical-fixed navbar-expand-xl navbar-dark bg-dark">
            <div className="navbar-vertical-container">
                <div className="navbar-vertical-footer-offset">
                    <div className="navbar-brand-wrapper justify-content-between">
                        <Link className="navbar-brand" to="/" aria-label="Front">
                            <img className="navbar-brand-logo" src={logo} alt="Logo" />
                        </Link>
                    </div>

                    <div className="navbar-vertical-content">
                        <div id="navbarVerticalMenu" className="nav nav-pills nav-vertical card-navbar-nav">
                            <span className="dropdown-header mt-4">Pages</span>
                            <small className="bi-three-dots nav-subtitle-replacer"></small>
                            <div id="navbarVerticalMenuPagesMenu">
                                <div className="nav-item">
                                    <NavLink className="nav-link" to="/">
                                        <IconBook size={18} className='nav-icon'/>
                                        <span className="nav-link-title">Annuaire</span>
                                    </NavLink>
                                </div>
                                <div className="nav-item">
                                    <NavLink className="nav-link" to="/events">
                                        <IconEvent size={18} className='nav-icon'/>
                                        <span className="nav-link-title">Evènements</span>
                                    </NavLink>
                                </div>
                                <div className="nav-item">
                                    <NavLink className="nav-link" to="/forums">
                                        <IconForum size={18} className='nav-icon'/>
                                        <span className="nav-link-title">Forums</span>
                                    </NavLink>
                                </div>
                                <div className="nav-item">
                                    <NavLink className="nav-link" to="/mon-profil">
                                        <IconUsers size={18} className='nav-icon'/>
                                        <span className="nav-link-title">Mon Profil</span>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
            
                    <div className="navbar-vertical-footer">
                        <div className="text-danger" onClick={handleLogoutClick} role="button">
                            <TbLogout size={20}/> Se Deconnecter
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
} 