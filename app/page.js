'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function HomePage() {
  const [index, setIndex] = useState(0);
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const startXRef = useRef(0);
  const draggedRef = useRef(false);
  const sliderRef = useRef(null);

  const dots = useMemo(() => [0, 1, 2, 3], []);

  const SLIDE_W = 430; // card width + gap
  const translate = { transform: `translateX(-${index * SLIDE_W}px)` };

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % dots.length), 3000);
    return () => clearInterval(id);
  }, [paused, dots.length]);

  const onPointerDown = (e) => {
    setDragging(true);
    draggedRef.current = false;
    startXRef.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
  };

  const onPointerMove = (e) => {
    if (!dragging) return;
    const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const dx = currentX - startXRef.current;
    if (Math.abs(dx) > 50 && !draggedRef.current) {
      draggedRef.current = true;
      if (dx < 0) {
        setIndex((i) => (i + 1) % dots.length);
      } else {
        setIndex((i) => (i - 1 + dots.length) % dots.length);
      }
    }
  };

  const onPointerUp = () => {
    setDragging(false);
    draggedRef.current = false;
  };

  const validateField = (field, value) => {
    let msg = '';
    if (!value.trim()) {
      msg = `${field === 'name' ? 'Name' : field === 'email' ? 'Email' : 'Message'} is required`;
    } else if (field === 'email') {
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (!emailOk) msg = 'Enter a valid email address';
    }
    setErrors((prev) => ({ ...prev, [field]: msg }));
    return msg === '';
  };

  const onBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get('name') || '').toString().trim();
    const email = (formData.get('email') || '').toString().trim();
    const message = (formData.get('message') || '').toString().trim();
    const okName = validateField('name', name);
    const okEmail = validateField('email', email);
    const okMsg = validateField('message', message);
    if (!okName || !okEmail || !okMsg) {
      toast.error('Please fix the errors before submitting');
      return;
    }
    toast.success(`Thanks ${name}! Your message has been sent.`);
    form.reset();
    setErrors({ name: '', email: '', message: '' });
  };

  return (
    <>
      <header className="main-header">
        <div className="container">
          <div className="logo">IWMYWIF</div>
          <nav className="navbar">
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#about">About Me</a></li>
              <li><a href="#works">Works</a></li>
              <li><a href="#section4">Blog</a></li>
              <li>
                <a href="#contact">
                  <button className="contact-btn">Get in Touch</button>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-content">
          <h1>
            Create your website <br />
            in <span className="highlight">less than 12 days</span>
          </h1>
          <p>
            Hey, I’m Mark Es, a web developer with 7 years of experience building
            responsive websites and applications. I can build a high-converting
            website for you as quick as possible!
          </p>
          <a href="#contact" className="hero-btn">Get in Touch</a>
        </div>

        <div className="hero-image">
          <img src="/images/Main_banner.png" alt="Hero Image" />
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="about-container">
          <div className="about-icons">
            <img src="/images/html-icon.png" alt="HTML" />
            <img src="/images/css-icon.png" alt="CSS" />
            <img src="/images/react-icon.png" alt="React" />
            <img src="/images/vue-icon.png" alt="Vue" />
            <img src="/images/js-icon.png" alt="JavaScript" />
          </div>

          <div className="about-content">
            <h2>About Me</h2>
            <p>
              My passion for building websites started in 2013, and since then I have
              helped companies around the world build amazing websites and products
              that create real value for businesses and users.
            </p>
            <p>
              I enjoy solving problems with clean, scalable solutions and have a
              genuine passion for inspiring design.
            </p>
            <p>
              I am a full-stack developer focusing on core frontend and backend
              technologies which include HTML, CSS, JavaScript, React, and other core
              languages.
            </p>
          </div>
        </div>

        <div className="companies">
          <h3>Companies I have worked for</h3>
          <div className="companies-logos">
            <img src="/images/google.png" alt="Google" />
            <img src="/images/bolt.png" alt="Bolt" />
            <img src="/images/amazon.png" alt="Amazon" />
            <img src="/images/paypal.png" alt="PayPal" />
            <img src="/images/netflix.png" alt="Netflix" />
          </div>
        </div>
      </section>

      <section className="works-section" id="works">
        <div className="works-container">
          <h2>My Recent Works</h2>

          <div className="works-grid">
            <div className="work-card">
              <img src="/images/work1.jpg" alt="Ecommerce Landing page" />
              <div className="work-info">
                <h3>Ecommerce Landing page</h3>
                <span className="work-days">11 days</span>
              </div>
            </div>

            <div className="work-card">
              <img src="/images/work2.jpg" alt="Basketball Studio" />
              <div className="work-info">
                <h3>Basketball Studio</h3>
                <span className="work-days">9 days</span>
              </div>
            </div>

            <div className="work-card">
              <img src="/images/work3.jpg" alt="Perfume Company site" />
              <div className="work-info">
                <h3>Perfume Company site</h3>
                <span className="work-days">10 days</span>
              </div>
            </div>

            <div className="work-card">
              <img src="/images/work5.jpg" alt="Health care site" />
              <div className="work-info">
                <h3>Health care site</h3>
                <span className="work-days">11 days</span>
              </div>
            </div>

            <div className="work-card">
              <img src="/images/work6.jpg" alt="Real Estate" />
              <div className="work-info">
                <h3>Real Estate</h3>
                <span className="work-days">7 days</span>
              </div>
            </div>

            <div className="work-card">
              <img src="/images/work6.jpg" alt="Bank Wallet" />
              <div className="work-info">
                <h3>Bank Wallet</h3>
                <span className="work-days">5 days</span>
              </div>
            </div>
          </div>

          <a href="#more" className="see-more-btn">See More</a>
        </div>
      </section>

      <section className="testimonials-section" id="testimonials">
        <h2>What my clients say</h2>

        <div
          className="testimonials-slider"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onMouseDown={onPointerDown}
          onMouseMove={onPointerMove}
          onMouseUp={onPointerUp}
          onTouchStart={onPointerDown}
          onTouchMove={onPointerMove}
          onTouchEnd={onPointerUp}
          ref={sliderRef}
        >
          <button className="nav-btn prev" onClick={() => setIndex((i) => (i - 1 + dots.length) % dots.length)}>&#10094;</button>

          <div className={`testimonial-track${dragging ? ' dragging' : ''}`} style={translate}>
            <div className="testimonial-card">
              <div className="client-info">
                <img src="/images/client1.png" alt="Charles Dim" />
                <div>
                  <h3>Charles Dim</h3>
                  <p>Lead Designer, Netflix</p>
                </div>
                <span className="quote">”</span>
              </div>
              <p className="testimonial-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                tincidunt in malesuada tristique arcu non eu lectus orci. Amet non,
                sed eget ultrices cursus diam orci. Risus sed tristique lectus fusce
                lacus.
              </p>
            </div>

            <div className="testimonial-card">
              <div className="client-info">
                <img src="/images/client2.png" alt="Margeret Wills" />
                <div>
                  <h3>Margeret Wills</h3>
                  <p>CEO, Ebay</p>
                </div>
                <span className="quote">”</span>
              </div>
              <p className="testimonial-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                tincidunt in malesuada tristique arcu non eu lectus orci. Amet non,
                sed eget ultrices cursus diam orci. Risus sed tristique lectus fusce
                lacus.
              </p>
            </div>

            <div className="testimonial-card">
              <div className="client-info">
                <img src="/images/client1.png" alt="John Carter" />
                <div>
                  <h3>John Carter</h3>
                  <p>Marketing Head, Bolt</p>
                </div>
                <span className="quote">”</span>
              </div>
              <p className="testimonial-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                tincidunt in malesuada tristique arcu non eu lectus orci. Amet non,
                sed eget ultrices cursus diam orci. Risus sed tristique lectus fusce
                lacus.
              </p>
            </div>

            <div className="testimonial-card">
              <div className="client-info">
                <img src="/images/client2.png" alt="Lisa Brown" />
                <div>
                  <h3>Lisa Brown</h3>
                  <p>CTO, PayPal</p>
                </div>
                <span className="quote">”</span>
              </div>
              <p className="testimonial-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                tincidunt in malesuada tristique arcu non eu lectus orci. Amet non,
                sed eget ultrices cursus diam orci. Risus sed tristique lectus fusce
                lacus.
              </p>
            </div>
          </div>

          <button className="nav-btn next" onClick={() => setIndex((i) => (i + 1) % dots.length)}>&#10095;</button>
        </div>

        <div className="slider-dots">
          {dots.map((d) => (
            <span
              key={d}
              className={`dot${index === d ? ' active' : ''}`}
              onClick={() => setIndex(d)}
            />
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <h2>Tell me about your project</h2>
        <div className="underline"></div>

        <form className="contact-form" onSubmit={onSubmit} noValidate>
          <div className="form-row">
            <div style={{ flex: 1, minWidth: 250 }}>
              <input type="text" id="name" name="name" placeholder="Name" onBlur={onBlur} />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>
            <div style={{ flex: 1, minWidth: 250 }}>
              <input type="email" id="email" name="email" placeholder="Email Address" onBlur={onBlur} />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
          </div>

          <div>
            <textarea id="message" name="message" placeholder="Message description" rows={5} onBlur={onBlur}></textarea>
            {errors.message && <span className="error-text">{errors.message}</span>}
          </div>

          <button type="submit" className="btn-send">Send</button>
        </form>
      </section>

      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-left">
            <h3>IWMYWF</h3>
          </div>

          <div className="footer-center">
            <p>© Copyright 2021. All rights reserved</p>
          </div>

          <div className="footer-right">
            <span>Connect with me:</span>
            <a href="#" className="social-icon">
              <img src="/images/facebook.png" alt="Facebook" />
            </a>
            <a href="#" className="social-icon">
              <img src="/images/twitter.png" alt="Twitter" />
            </a>
            <a href="#" className="social-icon">
              <img src="/images/github.png" alt="GitHub" />
            </a>
          </div>
        </div>
      </footer>
      <ToastContainer position="top-center" theme="dark" autoClose={2500} />
    </>
  );
}
