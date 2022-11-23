import React from 'react'
import './Home.css';
import Product from './Product';

function Home() {
  return (
    <div className='home'>
        <div className='home__container'>
            <img className='home__image' src='https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg' alt="" />
            <div className='home__row'>
                <Product 
                id='123456'
                title='Mivi Play Bluetooth Speaker with 12 Hours...'
                price={809}
                rating={4}
                image='https://m.media-amazon.com/images/I/61UJnlIHF9S._SY355_.jpg'
                image_alt='Mivi Speaker image'         
                />
                <Product 
                id='123457'
                title='Green Soul Beast Racing Edition Ergonomic ...'
                price={15690}
                rating={4}
                image='https://m.media-amazon.com/images/I/61L1PJ4UAML._SX425_.jpg'
                image_alt='Gaming Chair image'         
                />
                <Product 
                id='123458'
                title='Lenovo IdeaPad Gaming 3 AMD Ryzen 7 5800H...'
                price={79999}
                rating={4}
                image='https://m.media-amazon.com/images/I/71NMjlewTAL._SY355_.jpg'
                image_alt='Lenovo ideapad Gaing 3 laptop image'         
                />
                <Product 
                id='123459'
                title='EvoFox Katana Pro RGB Mechanical Keyboard...'
                price={2499}
                rating={4}
                image='https://m.media-amazon.com/images/I/71S7LOlneCL._SY355_.jpg'
                image_alt='Katana Pro Mechanical Keyboard image'         
                />
            </div>
            <div className='home__row'>
                <Product 
                id='123460'
                title='Zaavic Two Layer Lucky Bamboo plant with Big Round Glass Pot...'
                price={199}
                rating={4}
                image='https://m.media-amazon.com/images/I/51goUkNZtgL._SX300_SY300_QL70_FMwebp_.jpg'
                image_alt='Round glass pot image'         
                />
                <Product 
                id='123461'
                title='Logitech G402 Hyperion Fury USB Wired Gaming Mouse, 4,000 DPI...'
                price={2295}
                rating={4}
                image='https://m.media-amazon.com/images/I/31nlfClYn7L._SX300_SY300_QL70_FMwebp_.jpg'
                image_alt='Logitech gaming mouse image'         
                />
                <Product 
                id='123462'
                title='JBL T460BT by Harman, Wireless On Ear Headphones with Mic...'
                price={1799}
                rating={4}
                image='https://m.media-amazon.com/images/I/41Y09Hbt5nL._SX300_SY300_QL70_FMwebp_.jpg'
                image_alt='JBL Wireless Headphone image'         
                />
            </div>
            <div className='home__row'>
                <Product 
                id='123463'
                title='Rage Coffee 100 Gms Vanilla Bubblegum Flavour - Premium Arabica Instant ...'
                price={412}
                rating={4}
                image='https://m.media-amazon.com/images/I/71dwiO86UCL._SX522_.jpg'
                image_alt='Rage Instant Coffee image'         
                />
                
            </div>
        </div>
    </div>
  )
}

export default Home
