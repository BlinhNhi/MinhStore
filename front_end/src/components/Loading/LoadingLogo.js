import React from 'react'
import './LoadingLogo.css'
import logoLoading from '../../assets/iconLoading.gif'
export default function LoadingLogo() {
    return (
        <div className='dark:bg-gray-900'>
            <img src={logoLoading} alt='loading' />
        </div>
    )
}
