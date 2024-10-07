import React from 'react';
import { useSelector } from 'react-redux';

function Feedback() {
  const feedback = useSelector((state) => state.app.feedback);

  if (!feedback) return null;

  return (
    <div className={`feedback ${feedback.status}`}>
      {feedback.msg}
    </div>
  );
}

export default Feedback;
