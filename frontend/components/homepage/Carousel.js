import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import React, { useState } from 'react'
import Slider from 'react-slick'
import Image from 'next/image'
import { Dialog, DialogContent, IconButton } from '@mui/material'
import { ArrowBack, ArrowForward } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import '../../app/globals.css'

const images = {
  dark: [
    '/sliderDesktopDark1.png',
    '/sliderDesktopDark2.png',
    '/sliderDesktopDark3.png',
  ],
  light: [
    '/sliderDesktopLight1.png',
    '/sliderDesktopLight2.png',
    '/sliderDesktopLight3.png',
  ],
}

const Carousel = () => {
  const theme = useTheme()
  const isDarkMode = theme.palette.mode === 'dark'
  const [open, setOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const currentImages = isDarkMode ? images.dark : images.light

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  const handleOpenModal = (index) => {
    setCurrentIndex(index)
    setOpen(true)
  }

  const handleCloseModal = () => {
    setOpen(false)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? currentImages.length - 1 : prev - 1
    )
  }

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === currentImages.length - 1 ? 0 : prev + 1
    )
  }

  return (
    <>
      <Slider {...settings}>
        {currentImages.map((image, index) => (
          <div key={index} onClick={() => handleOpenModal(index)}>
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              priority
              width={600}
              height={350}
              style={{
                cursor: 'pointer',
                width: '100%',
                maxWidth: 600,
                height: 'auto',
              }}
            />
          </div>
        ))}
      </Slider>

      {/* Modal to display image in larger size */}
      <Dialog
        open={open}
        onClose={handleCloseModal}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          style: {
            borderRadius: '8px',
            borderColor: 'white',
            background: 'transparent',
            boxShadow: 'none',
            padding: 0,
            margin: 0,
          },
        }}
      >
        <DialogContent
          style={{
            padding: 0,
            textAlign: 'center',
            position: 'relative',
            background: 'transparent',
          }}
        >
          {/* Navigation Arrows */}
          <IconButton
            onClick={handlePrev}
            style={{
              position: 'absolute',
              top: '50%',
              left: 10,
              transform: 'translateY(-50%)',
              color: 'white',
            }}
          >
            <ArrowBack />
          </IconButton>
          <IconButton
            onClick={handleNext}
            style={{
              position: 'absolute',
              top: '50%',
              right: 10,
              transform: 'translateY(-50%)',
              color: 'black!important',
            }}
          >
            <ArrowForward />
          </IconButton>

          <Image
            src={currentImages[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            width={1200}
            height={800}
            style={{
              maxWidth: '100%',
              maxHeight: '80vh',
              objectFit: 'contain',
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Carousel
