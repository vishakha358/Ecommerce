import React from 'react'
import dealsImg from "../../assets/deals.png"

const DealsSection = () => {
  return (
    <section className='section__container deals__container flex flex-col items-center text-center gap-6'>
      {/* Image */}
      <div className='deals__image'>
        <img src={dealsImg} alt="Deals" className='w-full max-w-md mx-auto' />
      </div>

      {/* Content */}
      <div className='deals__content max-w-xl'>
        <h5 className='text-primary text-lg font-medium'>Get Up To 20% Discount</h5>
        <h4 className='text-2xl font-semibold'>Deals Of This Month</h4>
        <p className='text-gray-600 mt-2'>
          Our Women's fashion Deals of the Month are here to make your style dreams a reality without breaking the bank.
          Discover a curated collection of exquisite clothing, accessories, and footwear, all handpicked to elevate your wardrobe.
        </p>

        {/* Countdown */}
        <div className='deals__countdown flex justify-center gap-4 mt-4'>
          <div className='deals__countdown__card'>
            <h4 className='text-xl font-bold'>14</h4>
            <p>Days</p>
          </div>
          <div className='deals__countdown__card'>
            <h4 className='text-xl font-bold'>20</h4>
            <p>Hours</p>
          </div>
          <div className='deals__countdown__card'>
            <h4 className='text-xl font-bold'>15</h4>
            <p>Mins</p>
          </div>
          <div className='deals__countdown__card'>
            <h4 className='text-xl font-bold'>05</h4>
            <p>Secs</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DealsSection;
