import React from 'react';
import {Link} from 'react-router-dom';

import './styles.css';
import logo from '../../assets/logoSimple.png';

export default function Header(){
    return (
        <div className="header-container">

            <div className="header-list-options">
                <img className="logo" src={logo} alt ="iNeed"/>
                <Link className="header-link">
                    Início
                </Link>
                <Link className="header-link">
                    Items disponíveis
                </Link>
                <Link className="header-link">
                    Meus items
                </Link>
            </div>
            <div className="header-list-options">
                <Link className="header-link">
                    Pesquisar
                </Link>
                <Link className="header-link">
                    Perfil
                </Link>
                <Link className="header-link">
                    Sair
                </Link>
            </div>
        </div>
    );
};