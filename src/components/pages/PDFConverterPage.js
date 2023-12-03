// PDFConverterPage.js
import React from 'react';
import PDFConverter from '../PDFConverter';
import './PDFConverterPage.css';

const PDFConverterPage = () => {
  return (
    <div>
    <div className = "pdf-converter-container">
      <h1>PDF Converter</h1>
      <h2>**ACCEPTS .PNG AND .DOCX**</h2>
      <PDFConverter />
      </div>
    <div className = "background-image"></div>
    </div>
  );
};

export default PDFConverterPage;
