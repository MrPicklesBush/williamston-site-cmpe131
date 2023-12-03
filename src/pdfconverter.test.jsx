import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import PDFConverter from './components/PDFConverter';

describe('PDFConverter component', () => {
    test('renders file input and convert button', () => {
        render(<PDFConverter />);

        // Assert that file input and convert button are present
        expect(screen.getByLabelText('Choose File')).toBeInTheDocument();
        expect(screen.getByText('Convert to PDF')).toBeInTheDocument();
    });

    test('converts image to PDF', async () => {
        render(<PDFConverter />);

        // Mock the image file
        const imageFile = new File([''], 'image.png', { type: 'image/png' });

        // Trigger file change event
        const fileInput = screen.getByLabelText('Choose File');
        fireEvent.change(fileInput, { target: { files: [imageFile] } });

        // Check that isImage is set to true
        expect(screen.getByText('Convert to PDF').disabled).toBe(false);

        // Trigger conversion event
        const convertButton = screen.getByText('Convert to PDF');
        fireEvent.click(convertButton);

        // No need to wait for the 'Download PDF' link to appear for this test
        // Assertions specific to this test
    });

    // Similar test for converting Word document to PDF
    test('converts Word document to PDF', async () => {
        render(<PDFConverter />);

        // Mock the Word document file
        const wordFile = new File([''], 'document.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });

        // Trigger file change event
        const fileInput = screen.getByLabelText('Choose File');
        fireEvent.change(fileInput, { target: { files: [wordFile] } });

        // Check that isImage is set to false
        expect(screen.getByText('Convert to PDF').disabled).toBe(false);

        // Trigger conversion event
        const convertButton = screen.getByText('Convert to PDF');
        fireEvent.click(convertButton);

        // No need to wait for the 'Download PDF' link to appear for this test
        // Assertions specific to this test
    });
});