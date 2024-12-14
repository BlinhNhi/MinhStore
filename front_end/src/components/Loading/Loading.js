import React, { Fragment } from 'react'
import LoadingLogo from './LoadingLogo'
import { useSelector } from 'react-redux'


export default function Loading(props) {
    const { isLoading } = useSelector(state => state.LoadingReducer);
    return (<Fragment >
        {isLoading ? <div style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 100
        }}>
            <div style={{ zoom: '0.6' }}><LoadingLogo /></div>
        </div> : ''}

    </Fragment>

    )
}
