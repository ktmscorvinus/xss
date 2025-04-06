import React, { useState, useEffect } from 'react';

function FeedbackPage() {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  // Betöltjük a korábban elmentett üzeneteket a localStorage-ból
  useEffect(() => {
    const storedComments = localStorage.getItem('comments');
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment) return;
    // VESZÉLYES: A felhasználó által bevitt üzenetet tisztítás nélkül tároljuk
    const newComments = [...comments, { id: Date.now(), content: comment }];
    setComments(newComments);
    localStorage.setItem('comments', JSON.stringify(newComments));
    setComment('');
  };

  return (
    <div>
      <h1>Ügyfélüzenetek (Stored XSS)</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Írd be az üzenetedet..."
          rows="4"
          cols="50"
        ></textarea>
        <br />
        <button type="submit">Küldés</button>
      </form>
      <h2>Elküldött üzenetek:</h2>
      <div>
        {comments.map((msg) => (
          <div
            key={msg.id}
            style={{
              border: '1px solid #ccc',
              margin: '10px',
              padding: '5px'
            }}
          >
            {/* VESZÉLYES: a tárolt üzenetet HTML-ként jelenítjük meg */}
            <div dangerouslySetInnerHTML={{ __html: msg.content }} />
          </div>
        ))}
      </div>
      <p>
        Példa kipróbáláshoz: írd be az üzenetedbe a következőt:
        <br />
        <code>&lt;img src&#61;x onerror&#61;"alert('XSS')"&gt;/img&gt;</code>
       
      </p>
    </div>
  );
}

export default FeedbackPage;
