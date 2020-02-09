import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { CameraFeed } from './capturePhoto';

import './styles.css';
import fs from 'fs';

// Upload to local seaweedFS instance
const uploadImage = async file => {
    const formData = new FormData();
    const date = new Date();
    fs.writeFile(`/image_files/${date.now}`,file)
    formData.append('file', file);
    
    // Connect to a seaweedfs instance
};

export default function App() {
    return (
        <div className="App">
            <h1>Image capture test</h1>
            <p>Capture image from USB webcamera and upload to form</p>
            <CameraFeed sendFile={uploadImage} />
        </div>
    );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
