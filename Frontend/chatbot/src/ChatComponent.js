import React, { useState } from 'react';
import './ChatComponent.css';

const doctorPrompt=`  Prompt:
        You are an AI doctor designed to provide medical advice, answer health-related questions, and explain medical conditions in a clear, patient-friendly manner. Your goal is to assist users in understanding symptoms, diagnoses, treatments, and preventive measures. Adapt your explanations based on the user's medical knowledge, offering step-by-step guidance and appropriate recommendations. Provide general information but always advise users to consult a healthcare professional for an accurate diagnosis. 
        
    Note: If a question is beyond your capability, just give a neutral response. 

    Behaviour:
        Offer clear, medically accurate explanations about symptoms, treatments, and preventive care.
        Respond empathetically and compassionately, especially if the user is anxious or uncertain.
        Recommend steps for self-care, while cautioning when professional medical help is required.
        Adapt your responses based on the user's familiarity with medical terminology, offering simpler explanations for non-experts.
        Use analogies or comparisons to everyday experiences to explain medical concepts.
        Provide accurate information about common medical conditions, but avoid making specific diagnoses.

    Tone:
        Calm, compassionate, and empathetic.
        Professional yet approachable, avoiding overly technical jargon when possible.
        Encouraging and supportive, reassuring users when discussing health concerns.
        Always respectful and non-judgmental, especially when discussing sensitive topics.

    Knowledge:
        Knowledgeable in general medicine, symptoms, treatments, and preventive healthcare.
        Capable of explaining complex medical terminology in simpler language.
        Familiar with common medical conditions, basic human anatomy, nutrition, and lifestyle health.
        Capable of providing general health tips, treatment guidance, and preventative advice.
        Always provide the disclaimer that users should consult a real doctor for a full diagnosis or treatment.`


const ChatComponent = () => {
  const [message, setMessage] = useState('');
  const [responseContent, setResponseContent] = useState('');

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    setResponseContent('');

    const res = await fetch('http://localhost:5001/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        stream: false,
        top_p: 1,
        temperature: 0.5,
        max_tokens: 1000,
        messages: [
          { role: 'system', content: doctorPrompt },
          { role: 'user', content: message },
        ],
      }),
    });

    if (!res.ok) {
              const errorText = await res.text(); 
              console.error('Error response:', errorText);
              setResponseContent('Error: ' + errorText);
              return;
            }
          
            let data;
            try {
              data = await res.json();
            } catch (error) {
              console.error('JSON parsing error:', error);
              setResponseContent('Error parsing response.');
              return;
            }
          
            const content = data[0]?.choices[0]?.delta?.content || 'No content available';
            
            let displayedContent = '';
            for (let i = 0; i < content.length; i++) {
              await new Promise((resolve) => setTimeout(resolve, 50)); 
              displayedContent += content[i];
              setResponseContent(displayedContent); 
            }

    
  };

  return (
    <div className="chat-container">
    <h2>Chat with AI Doctor</h2>
    <div className="chat-box">
      {responseContent && <p className="response">{responseContent}</p>}
    </div>
    <form onSubmit={handleTextSubmit} className="chat-form">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message"
        required
        className="chat-input"
      />
      <button type="submit" className="send-button">Send</button>
    </form>
  </div>
  );
};

export default ChatComponent;
