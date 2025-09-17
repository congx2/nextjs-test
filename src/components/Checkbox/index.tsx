'use client'

import React from 'react'
import styles from './index.module.scss'

interface ICheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  disabled?: boolean
  className?: string
}

function Checkbox(props: ICheckboxProps) {
  const { checked, onChange, label, disabled = false, className } = props
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange(e.target.checked)
    }
  }

  const handleLabelClick = () => {
    if (!disabled) {
      onChange(!checked)
    }
  }

  return (
    <div className={`${styles.checkboxItem} ${className || ''} ${disabled ? styles.disabled : ''}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className={styles.input}
      />
      <label 
        onClick={handleLabelClick}
        className={styles.label}
      >
        {label}
      </label>
    </div>
  )
}

export default Checkbox