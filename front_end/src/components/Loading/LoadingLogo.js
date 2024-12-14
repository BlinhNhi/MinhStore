import React from 'react'
import './LoadingLogo.css'
import logoLoading from '../../assets/iconLoading.gif'
export default function LoadingLogo() {
    return (
        <div>
            <img src={logoLoading} alt='loading' />
        </div>
    )
}
