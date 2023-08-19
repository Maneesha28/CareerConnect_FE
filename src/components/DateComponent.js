import React from 'react';

function DateComponent({ isoDate }) {
  const date = new Date(isoDate);
  const formattedDate = date.toLocaleDateString(); // Format the date as per user's locale

  return <>{formattedDate}</>;
}

export default DateComponent;
