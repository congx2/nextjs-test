'use client'

import React, { useState } from 'react'
import { useScopedI18n } from '@/lib/i18n/client'
import styles from './index.module.scss'

interface ICashCollectionComponentProps {
  onChange?: (data: { type: 'customer' | 'non-customer', cardNumber?: string, amount?: number }) => void
}

function CashCollectionComponent(props: ICashCollectionComponentProps) {
  const { onChange } = props
  const t = useScopedI18n('cashCollection')
  const [selectedType, setSelectedType] = useState<'customer' | 'non-customer'>('customer')
  const [cardNumber, setCardNumber] = useState('')
  const [amount, setAmount] = useState('')

  const handleTypeChange = (type: 'customer' | 'non-customer') => {
    setSelectedType(type)
    onChange?.({
      type,
      cardNumber: type === 'customer' ? cardNumber : undefined,
      amount: amount ? parseFloat(amount) : undefined
    })
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCardNumber(value)
    onChange?.({
      type: selectedType,
      cardNumber: value,
      amount: amount ? parseFloat(amount) : undefined
    })
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // 只允许输入数字和小数点
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value)
      onChange?.({
        type: selectedType,
        cardNumber: selectedType === 'customer' ? cardNumber : undefined,
        amount: value ? parseFloat(value) : undefined
      })
    }
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{t('title')}</h3>
      
      <div className={styles.radioGroup}>
        <div 
          className={`${styles.radioItem} ${selectedType === 'customer' ? styles.selected : ''}`}
          onClick={() => handleTypeChange('customer')}
        >
          <input
            type="radio"
            checked={selectedType === 'customer'}
            onChange={() => handleTypeChange('customer')}
          />
          <label>{t('customer')}</label>
        </div>
        
        <div 
          className={`${styles.radioItem} ${selectedType === 'non-customer' ? styles.selected : ''}`}
          onClick={() => handleTypeChange('non-customer')}
        >
          <input
            type="radio"
            checked={selectedType === 'non-customer'}
            onChange={() => handleTypeChange('non-customer')}
          />
          <label>{t('nonCustomer')}</label>
        </div>
      </div>

      <div className={styles.inputSection}>
        <div className={styles.inputGroup}>
          <label>{t('cardNumber')}</label>
          <input
            type="text"
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder={t('cardNumberPlaceholder')}
            disabled={selectedType === 'non-customer'}
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label>{t('amount')}</label>
          <input
            type="text"
            value={amount}
            onChange={handleAmountChange}
            placeholder={t('amountPlaceholder')}
          />
        </div>
      </div>
    </div>
  )
}

export default CashCollectionComponent