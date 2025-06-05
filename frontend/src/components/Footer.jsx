import React from 'react'
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-green-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="https://facebook.com" className="hover:text-gray-400" target="_blank" rel="noopener noreferrer">
              <Facebook className="h-6 w-6" />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="https://twitter.com" className="hover:text-gray-400" target="_blank" rel="noopener noreferrer">
              <Twitter className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="https://instagram.com" className="hover:text-gray-400" target="_blank" rel="noopener noreferrer">
              <Instagram className="h-6 w-6" />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="https://linkedin.com" className="hover:text-gray-400" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="https://github.com" className="hover:text-gray-400" target="_blank" rel="noopener noreferrer">
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </a>
          </div>
          <div className="text-center md:text-right">
            <p>&copy; 2024 Master-Backend. All rights reserved.</p>
            <a href="/" className="text-white hover:text-white">
              Privacy Policy
            </a>
            <span className="mx-2">|</span>
            <a href="/" className="text-white hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}