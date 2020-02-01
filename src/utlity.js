export const initializeMedia = function(){
    if(!('mediaDevices' in navigator)){
        navigator.mediaDevices = {};
    }
    if(!('getUserMedia' in navigator.mediaDevices)){
        navigator.mediaDevices.getUserMedia = function(constraints){
            const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            if(!getUserMedia){
                return Promise.reject(new Error('getUserMedia not implemented'));
            }
            return new Promise((resolve,reject)=>{
                getUserMedia.call(navigator,constraints,resolve,reject);
            })
        }
    }
    
    return new Promise((resolve,reject)=>{
        navigator.mediaDevices.getUserMedia({video:true})
        .then((stream)=>{
            resolve(stream)
        })
        .catch(()=>{
            reject("errr")
        })
    })
}