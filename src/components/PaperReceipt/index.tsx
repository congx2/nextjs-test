'use client'

import React, { useState } from 'react'
import { useScopedI18n } from '@/lib/i18n/client'
import styles from './index.module.scss'
import Checkbox from '../Checkbox'

interface IPaperReceiptComponentProps {
  onChange?: (data: { 
    selectedOptions: string[], 
    note: string, 
    quantity: number 
  }) => void
}

interface IOptionItem {
  label: string
  value: string
}

function PaperReceiptComponent(props: IPaperReceiptComponentProps) {
  const { onChange } = props
  const t = useScopedI18n('paperReceipt')
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [note, setNote] = useState('')
  const [displayNote, setDisplayNote] = useState('') // 用于显示计数的值
  const [isComposing, setIsComposing] = useState(false) // 中文输入状态
  const [quantity, setQuantity] = useState(1)
  
  const maxNoteLength = 200
  const minQuantity = 1
  const maxQuantity = 99

  const options: IOptionItem[] = [
    { label: t('options.signature'), value: 'signature' },
    { label: t('options.stamp'), value: 'stamp' },
    { label: t('options.idCard'), value: 'id_card' },
    { label: t('options.receiveDate'), value: 'receive_date' },
    { label: t('options.receiverPhone'), value: 'receiver_phone' }
  ]

  const handleOptionChange = (option: string, checked: boolean) => {
    const newSelectedOptions = checked 
      ? [...selectedOptions, option]
      : selectedOptions.filter(item => item !== option)
    
    setSelectedOptions(newSelectedOptions)
    onChange?.({
      selectedOptions: newSelectedOptions,
      note: displayNote,
      quantity
    })
  }

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    if (isComposing || newValue.length <= maxNoteLength) {
      setNote(newValue)
      if (!isComposing) {
        setDisplayNote(newValue)
        onChange?.({
          selectedOptions,
          note: newValue,
          quantity
        })
      }
    }
  }

  const handleCompositionStart = () => {
    setIsComposing(true)
  }

  const handleCompositionEnd = (e: React.CompositionEvent<HTMLTextAreaElement>) => {
    setIsComposing(false)
    const newValue = e.currentTarget.value
    if (newValue.length <= maxNoteLength) {
      setNote(newValue)
      setDisplayNote(newValue)
      onChange?.({
        selectedOptions,
        note: newValue,
        quantity
      })
    } else {
      const truncatedValue = newValue.slice(0, maxNoteLength)
      setNote(truncatedValue)
      setDisplayNote(truncatedValue)
      onChange?.({
        selectedOptions,
        note: truncatedValue,
        quantity
      })
    }
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || minQuantity
    const newQuantity = Math.max(minQuantity, Math.min(maxQuantity, value))
    setQuantity(newQuantity)
    onChange?.({
      selectedOptions,
      note: displayNote,
      quantity: newQuantity
    })
  }

  const handleQuantityDecrease = () => {
    if (quantity > minQuantity) {
      const newQuantity = quantity - 1
      setQuantity(newQuantity)
      onChange?.({
        selectedOptions,
        note: displayNote,
        quantity: newQuantity
      })
    }
  }

  const handleQuantityIncrease = () => {
    if (quantity < maxQuantity) {
      const newQuantity = quantity + 1
      setQuantity(newQuantity)
      onChange?.({
        selectedOptions,
        note: displayNote,
        quantity: newQuantity
      })
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>{t('title')}</h3>
        <span className={styles.price}>¥ 8</span>
      </div>
      
      <div className={styles.checkboxGroup}>
        {options.map((option) => (
          <Checkbox
            key={option.value}
            checked={selectedOptions.includes(option.value)}
            onChange={(checked) => handleOptionChange(option.value, checked)}
            label={option.label}
          />
        ))}
      </div>

      <div className={styles.noteSection}>
        <div className={styles.noteInput}>
          <textarea
            value={note}
            onChange={handleNoteChange}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            placeholder={t('notePlaceholder')}
          />
          <div className={styles.counter}>
            {displayNote.length} / {maxNoteLength}
          </div>
        </div>
      </div>

      <div className={styles.quantitySection}>
        <div className={styles.quantityLabel}>{t('quantity')}</div>
        <div className={styles.quantityHint}>{t('quantityHint')}</div>
        
        <div className={styles.quantityControl}>
          <button
            className={styles.decreaseBtn}
            onClick={handleQuantityDecrease}
            disabled={quantity <= minQuantity}
          >
            −
          </button>
          <input
            type="number"
            className={styles.quantityInput}
            value={quantity}
            onChange={handleQuantityChange}
            min={minQuantity}
            max={maxQuantity}
          />
          <button
            className={styles.increaseBtn}
            onClick={handleQuantityIncrease}
            disabled={quantity >= maxQuantity}
          >
            +
          </button>
          <span className={styles.unit}>{t('unit')}</span>
        </div>
      </div>

      <div className={styles.footer}>
        {t('footer')}
      </div>
    </div>
  )
}

export default PaperReceiptComponent