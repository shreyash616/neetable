import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import galleryData from './data.json'

const Gallery = () => {

    const navigate = useNavigate()
    const imageCategory = useParams('category').category
    const gallery = useRef(galleryData)
    const categoryIdentified = !!Object.keys(gallery.current).includes(imageCategory)

    const [imagesToShow, setImagesToShow] = useState(Object.values(gallery.current))

    console.log(imagesToShow)

    useEffect(() => {
        if (categoryIdentified) {
            setImagesToShow(gallery.current[imageCategory].images)
        } else {
            setImagesToShow(Object.values(gallery.current))
        }
    }, [categoryIdentified])

    return <div className='container h-100 d-flex flex-row justify-content-center mt-5'>
        {categoryIdentified
            ? <div className='row'>
                {imagesToShow.map(image => <div className='m-2 rounded' style={{
                    backgroundImage: `url(${image})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    height: '200px',
                    width: '240px',
                }} />)}
            </div>
            : <div className='row'>
                {imagesToShow.map(image => <div onClick={() => navigate(`/gallery/${image.label.toLowerCase()}`)} className='m-2 rounded d-flex justify-content-center align-items-center text-light display-6'
                    style={{
                        backgroundImage: `url(${image.background})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        height: '200px',
                        width: '240px',
                        cursor: 'pointer'
                    }}>
                    {image.label}
                </div>)}
            </div>}
    </div>

}

export default Gallery