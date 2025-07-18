import React from 'react';

const Pages = () => {
  return (
    <section className="section__container py-10 px-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-6">About Us</h1>

      <p className="text-gray-700 mb-4">
        Welcome to <strong>Lebaba</strong>, your one-stop destination for the latest in fashion and jewelry. 
        Our mission is to empower individuals to express themselves through elegant clothing and timeless accessories.
      </p>

      <h2 className="text-xl font-semibold text-primary mb-2">Our Story</h2>
      <p className="text-gray-700 mb-4">
        Founded in 2025,Lebaba began as a passion project for affordable fashion. From curated collections of sarees,
        western wear, and daily wear to stunning handcrafted jewelry — we bring style to your doorstep.
      </p>

      <h2 className="text-xl font-semibold text-primary mb-2">Why Shop With Us?</h2>
      <ul className="list-disc pl-6 text-gray-700 mb-4">
        <li>High-quality products at affordable prices</li>
        <li>Fast and reliable delivery</li>
        <li>Easy return policy</li>
        <li>Secure checkout and customer support</li>
      </ul>

      <p className="text-gray-700">
        Thank you for choosing ChicAura. We are proud to be a part of your fashion journey. 💖
      </p>
    </section>
  );
};

export default Pages;
