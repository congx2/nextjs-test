'use client'

import React, { useState } from 'react'
import { useScopedI18n } from '@/lib/i18n/client'
import Textarea from '@/components/Textarea'
import styles from './index.module.scss'

interface INoteComponentProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
}

function NoteComponent(props: INoteComponentProps) {
  const { value = '', onChange, placeholder } = props
  const t = useScopedI18n('note')
  const [noteValue, setNoteValue] = useState(value)
  const maxLength = 20

  // 常用备注选项
  const quickNotes = [
    t('quickNotes.envelope'),
    t('quickNotes.bag'),
    t('quickNotes.box'),
    t('quickNotes.stairs'),
    t('quickNotes.contact')
  ]

  const handleInputChange = (newValue: string) => {
    if (newValue.length <= maxLength) {
      setNoteValue(newValue)
      onChange?.(newValue)
    }
  }

  const handleQuickNoteClick = (note: string) => {
    const separator = noteValue.length > 0 ? ', ' : ''
    const newValue = noteValue + separator + note
    if (newValue.length <= maxLength) {
      setNoteValue(newValue)
      onChange?.(newValue)
    }
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        {t('title')}
      </h3>
      
      <div className={styles.inputContainer}>
        <Textarea
          value={noteValue}
          onChange={handleInputChange}
          placeholder={placeholder || t('placeholder')}
          className={styles.textarea}
          showCounter={true}
          maxLength={maxLength}
        />
      </div>

      <div className={styles.tagsContainer}>
        {quickNotes.map((note, index) => (
          <button
            key={index}
            onClick={() => handleQuickNoteClick(note)}
            className={styles.tag}
          >
            {note}
          </button>
        ))}
      </div>
    </div>
  )
}

export default NoteComponent