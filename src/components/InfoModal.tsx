import React from 'react';
import { X, Linkedin } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InfoModal({ isOpen, onClose }: InfoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">About</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Developer</h3>
          <p>Hritik Kumar</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">PM Accelerator</h3>
          <p className="mb-4">
            PM Accelerator is a premier platform dedicated to nurturing and developing the next generation
            of product managers through comprehensive training, mentorship, and real-world experience.
          </p>
          <a
            href="https://www.linkedin.com/company/product-manager-accelerator"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <Linkedin className="w-5 h-5 mr-2" />
            Visit our LinkedIn page
          </a>
        </div>
      </div>
    </div>
  );
}