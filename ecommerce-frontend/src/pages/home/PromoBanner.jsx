import React from 'react'

const PromoBanner = () => {
  return (
    <section className='section__container banner__containner'>
        <div className='banner__card'>
            <span><i className="ri-truck-line"></i></span>
            <h4>Free Delivery</h4>
            <p>Offers convenience and the ability to shop anywhere, anytime.</p>
        </div>
        <div className='banner__card'>
            <span><i className="ri-money-dollar-circle-line"></i></span>
            <h4>100% Money Back Guaranty</h4>
            <p>E-commerce have a review system where customers can share feedback.</p>
        </div>
        <div className='banner__card'>
            <span><i className="ri-user-voice-fill"></i></span>
            <h4>Strong Support</h4>
            <p>Offer customer support services to assist customers with queries and issues.</p>
        </div>
    </section>
  )
}

export default PromoBanner