import React from 'react'
import './PrimaryFooter.scss'

export const PrimaryFooter: React.FC = () => {
  return (
    <footer className="primary-footer flex items-center justify-between text-small">
      <div>Created By ReactTraining.com</div>
      <div>Copyright &copy; {new Date().getFullYear()} ProjectPlanner</div>
    </footer>
  )
}
