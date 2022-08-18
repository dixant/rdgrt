import React from 'react';

const greenButtonStyle = {
    margin: '5px 0',
    backgroundColor: '#8cb6b9',
    color: '#fff',
    fontWeight: '700',
    padding: '10px',
    borderRadius: '10px',
    border: '1px solid #8cb6b9',
    cursor: 'pointer',
    minWidth: '150px',
    '&:hover': {
        boxShadow: '0 2px 6px #cde'
    }

};

export const GreenButton = ({ label, handleClick }) => (
    <button
        className="btn btn-default"
        style={greenButtonStyle}
        onClick={handleClick}
    >
        {label}
    </button>
);
