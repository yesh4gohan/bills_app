import React, { Component } from 'react';

export class CameraFeed extends Component {
    /**
     * Processes available devices and identifies one by the label
     * @memberof CameraFeed
     * @instance
     */
    // processDevices(devices) {
    //     devices.forEach(device => {
    //         console.log(device.label);
    //         this.setDevice(device);
    //     });
    // }

    /**
     * Sets the active device and starts playing the feed
     * @memberof CameraFeed
     * @instance
     */
    async setDevice() {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
        console.log(
            stream
        )
        this.videoPlayer.srcObject = stream;
        this.setState({stream})
    }
    state = {
        stream:{}
    }
    /**
     * On mount, grab the users connected devices and process them
     * @memberof CameraFeed
     * @instance
     * @override
     */
    async componentDidMount() {
        await this.setDevice();
    }

    /**
     * Handles taking a still image from the video feed on the camera
     * @memberof CameraFeed
     * @instance
     */
    takePhoto = () => {
        console.log(this.state)
        const { sendFile } = this.props;
        const context = this.canvas.getContext('2d');
        context.drawImage(this.videoPlayer, 0, 0, 680, 360);
        this.canvas.toBlob(sendFile);
        this.videoPlayer.style.display = 'none'
        console.log(this.videoPlayer)
        this.state.stream.getVideoTracks().forEach(function(track) {
            track.stop();
            track.enabled = false; 
          });  
    };

    render() {
        return (
            <div className="c-camera-feed">
                <div className="c-camera-feed__viewer">
                    <video ref={ref => (this.videoPlayer = ref)} width="680" heigh="360" autoPlay/>
                </div>
                <button onClick={this.takePhoto}>Take photo!</button>
                <div className="c-camera-feed__stage">
                    <canvas width="680" height="360" ref={ref => (this.canvas = ref)} />
                </div>
            </div>
        );
    }
}
