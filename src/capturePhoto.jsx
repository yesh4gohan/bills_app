import React, { Component } from 'react'
import {initializeMedia} from './utlity'
const styles = {
    width :Math.max(document.documentElement.clientWidth, window.innerWidth || 0) -50
};
export default class CapturePhoto extends Component {
    async componentDidMount(){
        const media = await initializeMedia();
        this.showVideo(media)
    }
    showVideo(media){
        const VideoPlayer = this.myRef.current;
        console.log(VideoPlayer)
        VideoPlayer.srcObject = media;
        VideoPlayer.style.display = 'block';
    }
    state = {
        data:[]
    }
    myRef = React.createRef();

    
    render() {
        return (
            <div className = "camera-container">
                <video id = "player"  style = {styles} ref={this.myRef} autoPlay></video>
                <button className = "capture-btn"><span></span></button>
            </div>
        )
    }
}
