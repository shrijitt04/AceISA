import React, { useState, useEffect } from 'react';

const AboutUs: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const fadeInStyle = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`,
  });

  return (
    <div style={{
      fontFamily: 'Calibri, sans-serif',
      background: 'linear-gradient(135deg, #09203F 0%, #537895 100%)',
      color: 'white',
      minHeight: '100vh',
      padding: '2rem',
      boxSizing: 'border-box',
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ ...fadeInStyle(0), fontSize: '2.5rem', textAlign: 'center', marginBottom: '2rem' }}>
          About AceISA
        </h1>
        
        <p style={{ ...fadeInStyle(0.1), fontSize: '1.2rem', textAlign: 'center', marginBottom: '2rem' }}>
          AceISA makes learning fun and easy through online quizzes. Our platform helps teachers create quizzes and students learn from them.
        </p>
        
        <h2 style={{ ...fadeInStyle(0.2), fontSize: '1.8rem', textAlign: 'center', marginTop: '2rem' }}>
          What We Do
        </h2>
        <p style={{ ...fadeInStyle(0.3) }}>We've built a simple quiz platform that:</p>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          {['Lets teachers make and manage quizzes', 
            'Helps students practice and test their knowledge', 
            'Shows everyone\'s progress on leaderboards'].map((item, index) => (
            <li key={index} style={{ 
              ...fadeInStyle(0.4 + index * 0.1), 
              marginBottom: '0.5rem', 
              display: 'flex', 
              alignItems: 'center' 
            }}>
              <span style={{ 
                width: '8px', 
                height: '8px', 
                backgroundColor: '#4A90E2', 
                borderRadius: '50%', 
                marginRight: '10px', 
                display: 'inline-block' 
              }}></span>
              {item}
            </li>
          ))}
        </ul>
        
        <h2 style={{ ...fadeInStyle(0.7), fontSize: '1.8rem', textAlign: 'center', marginTop: '2rem' }}>
          Why Choose Us
        </h2>
        {['Easy to use', 'Fun and interactive', 'Helps track progress', 'Works great for both teachers and students'].map((feature, index) => (
          <div key={index} style={{
            ...fadeInStyle(0.8 + index * 0.1),
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem'
          }}>
            {feature}
          </div>
        ))}
        
        <h2 style={{ ...fadeInStyle(1.2), fontSize: '1.8rem', textAlign: 'center', marginTop: '2rem' }}>
          How It Works
        </h2>
        <p style={{ ...fadeInStyle(1.3) }}>
          Teachers can quickly create quizzes, while students can take them anytime. Our platform automatically tracks scores and shows who's doing well through leaderboards.
        </p>
        
        <p style={{ 
          ...fadeInStyle(1.4), 
          textAlign: 'center', 
          fontSize: '1.5rem', 
          fontWeight: 'bold', 
          marginTop: '2rem' 
        }}>
          AceISA - Making Learning Fun
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
