'use client'

import React, { useState } from 'react'
import { useScopedI18n } from '@/lib/i18n/client'
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
  const [displayValue, setDisplayValue] = useState(value) // 用于显示计数的值
  const [isComposing, setIsComposing] = useState(false) // 中文输入状态
  const maxLength = 20

  // 常用备注选项
  const quickNotes = [
    t('quickNotes.envelope'),
    t('quickNotes.bag'),
    t('quickNotes.box'),
    t('quickNotes.stairs'),
    t('quickNotes.contact')
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    // 在中文输入过程中，不限制字数，等待输入确认后再限制
    if (isComposing || newValue.length <= maxLength) {
      setNoteValue(newValue)
      // 只有在非中文输入状态下才更新显示值和触发onChange
      if (!isComposing) {
        setDisplayValue(newValue)
        onChange?.(newValue)
      }
    }
  }

  const handleCompositionStart = () => {
    setIsComposing(true)
  }

  const handleCompositionEnd = (e: React.CompositionEvent<HTMLTextAreaElement>) => {
    setIsComposing(false)
    const newValue = e.currentTarget.value
    // 中文输入结束后，检查字数限制并更新显示值
    if (newValue.length <= maxLength) {
      setNoteValue(newValue)
      setDisplayValue(newValue)
      onChange?.(newValue)
    } else {
      // 超过限制时，截取到最大长度
      const truncatedValue = newValue.slice(0, maxLength)
      setNoteValue(truncatedValue)
      setDisplayValue(truncatedValue)
      onChange?.(truncatedValue)
    }
  }

  const handleQuickNoteClick = (note: string) => {
    const separator = displayValue.length > 0 ? ', ' : ''
    const newValue = displayValue + separator + note
    if (newValue.length <= maxLength) {
      setNoteValue(newValue)
      setDisplayValue(newValue)
      onChange?.(newValue)
    }
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        {t('title')}
      </h3>
      
      <div className={styles.inputContainer}>
        <textarea
          value={noteValue}
          onChange={handleInputChange}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          placeholder={placeholder || t('placeholder')}
          className={styles.textarea}
        />
        <div className={styles.counter}>
          {displayValue.length} / {maxLength}
        </div>
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