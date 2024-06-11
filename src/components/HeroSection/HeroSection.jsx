import React, { useState } from 'react';
import axios from 'axios';
import "./HeroSection.css";

function HeroSection() {
    const [cards] = useState([
        {
            image: "https://tse1.mm.bing.net/th?id=OIP.Ze9KVVHvQ48CzTTljrl8FAAAAA&pid=Api&P=0&h=180",
            title: "presentation design",
            text: "Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,"
        },
        {
            image: "https://tse1.mm.bing.net/th?id=OIP.Ze9KVVHvQ48CzTTljrl8FAAAAA&pid=Api&P=0&h=180",
            title: "audio-visual production",
            text: "Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,"
        },
        {
            image: "https://tse1.mm.bing.net/th?id=OIP.Ze9KVVHvQ48CzTTljrl8FAAAAA&pid=Api&P=0&h=180",
            title: "translation services",
            text: "Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,"
        },
        {
            image: "https://tse1.mm.bing.net/th?id=OIP.Ze9KVVHvQ48CzTTljrl8FAAAAA&pid=Api&P=0&h=180",
            title: "graphic design",
            text: "Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,"
        },
        {
            image: "https://tse1.mm.bing.net/th?id=OIP.Ze9KVVHvQ48CzTTljrl8FAAAAA&pid=Api&P=0&h=180",
            title: "research & analytics",
            text: "Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,"
        },
        {
            image: "https://tse1.mm.bing.net/th?id=OIP.Ze9KVVHvQ48CzTTljrl8FAAAAA&pid=Api&P=0&h=180",
            title: "data processing",
            text: "Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,"
        }
    ]);

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage(false);

        if (!email) {
            setError('Email is required.');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setError('Invalid email format.');
            return;
        }
        if (email.endsWith('@ez.works')) {
            setError('Emails ending with @ez.works are not allowed.');
            return;
        }

        try {
            const response = await axios.post('http://34.225.132.160:8002/api', { email });
            console.log('Response:', response);  
            if (response.status === 200) {
                console.log('Status 200: Form submitted successfully');
                setSuccessMessage(true);
                setEmail('');
            }
        } catch (err) {
            console.error('Error:', err); 
            if (err.response) {
                console.error('Error Response:', err.response); 
                if (err.response.status === 422) {
                    console.log('Status 422: Email is incorrect');
                    setError(err.response.data.message);
                } else {
                    setError('An error occurred. Please try again.');
                }
            } else {
                console.error('Error Message:', err.message);  
                setError('An error occurred. Please try again.');
            }
        }
    };

    const closeModal = () => {
        setSuccessMessage(false);
        setError('');
    };

    return (
        <div className='heroSection'>
            <div className='heroSection_box'>
                <div className='heroSection_box_left'>
                    <div className='ez-logo'>
                        <img alt='ez' src="https://tse2.mm.bing.net/th?id=OIP.Y--eGB1RF8fOs2wcVZjvwQHaCE&pid=Api&P=0&h=180" />
                    </div>
                    <h2>A Suite of Business Support Services</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error consequuntur alias aspernatur soluta, beatae dolor nihil incidunt ipsum. At quasi repellat nam perspiciatis quam. Officia maiores quasi voluptatum quaerat quos.</p>
                    <div className='form-content'>
                        <form onSubmit={handleSubmit}>
                            <div className='input-group'>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email Address"
                                />
                                <button type="submit">Contact Me</button>
                            </div>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                        </form>
                    </div>
                </div>
                <div className='heroSection_box_right'>
                    <div className='container'>
                        <div className='cards'>
                            {cards.map((card, i) => (
                                <div key={i} className='card'>
                                    <div className='card-content'>
                                        <img alt='logo' src={card.image} />
                                        <h3>{card.title}</h3>
                                    </div>
                                    <p>{card.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
            {successMessage && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={closeModal}>&times;</span>
                        <p>Form Submitted</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HeroSection;
