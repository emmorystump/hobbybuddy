import React from 'react';
import { MoonLoader } from 'react-spinners';

const PageLoader = () => {
    return (
        <div className="loading-indicator">
            <div className="loader">
                <MoonLoader size={80} color='red' />
            </div>
        </div>
    )
}

export default PageLoader;