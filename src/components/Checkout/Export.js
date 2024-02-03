import React from 'react';

const Export = ({ onExport }) => {
  return (
    <button onClick={onExport}>
      Export to CSV
    </button>
  );
};

export default Export;