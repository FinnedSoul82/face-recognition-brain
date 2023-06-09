import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boxes }) => {
    return (
        <div className='center ma'>
            <div className="absolute mt2">
                <img id='inputimage' src={imageUrl} alt='' width='500rem' height='auto' />
                {
                    boxes.map(box => {
                       return (
                        <div 
                        className='bounding-box' 
                        style={{
                            top: box.topRow,
                            bottom: box.bottomRow,
                            left: box.leftCol,
                            right: box.rightCol
                            }}>
                        </div>
                       )
                    })
                }
            </div>
        </div>
    )
}

export default FaceRecognition