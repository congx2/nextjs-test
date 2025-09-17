'use client'

import { useState } from 'react'
import { useI18n } from '@/lib/i18n/client'
import { 
  NoteComponent, 
  CheckoutPanel,
  CashCollectionComponent,
  PaperReceiptComponent,
  PhotoUploadComponent,
  LanguageSwitcher
} from '@/components'

export default function HomePage() {
  const t = useI18n()
  const [noteValue, setNoteValue] = useState('')
  const [totalPrice] = useState(16) // 示例价格
  const [cashCollectionData, setCashCollectionData] = useState(null)
  const [paperReceiptData, setPaperReceiptData] = useState(null)
  const [photoUploadData, setPhotoUploadData] = useState(null)

  const handleNoteChange = (value: string) => {
    setNoteValue(value)
    console.log('备注内容:', value)
  }

  const handleCashCollectionChange = (data: any) => {
    setCashCollectionData(data)
    console.log('代收货款数据:', data)
  }

  const handlePaperReceiptChange = (data: any) => {
    setPaperReceiptData(data)
    console.log('纸质回单数据:', data)
  }

  const handlePhotoUploadChange = (data: any) => {
    setPhotoUploadData(data)
    console.log('拍照回传数据:', data)
  }

  const handleCheckout = () => {
    console.log('提交订单，备注内容:', noteValue)
    alert(t('checkoutPanel.submitSuccess'))
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '20px'
    }}>
      <LanguageSwitcher />
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h1 style={{ 
          color: '#333', 
          fontSize: '2.5rem', 
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          {t('app.title')}
        </h1>
        
        <p style={{ 
          fontSize: '1.2rem', 
          color: '#666', 
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          {t('app.subtitle')}
        </p>
        
        {/* 代收货款组件 */}
        <CashCollectionComponent 
          onChange={handleCashCollectionChange}
        />
        
        {/* 纸质回单组件 */}
        <PaperReceiptComponent 
          onChange={handlePaperReceiptChange}
        />
        
        {/* 拍照回传组件 */}
        <PhotoUploadComponent 
          onChange={handlePhotoUploadChange}
        />
        
        {/* 备注组件 */}
        <NoteComponent 
          value={noteValue}
          onChange={handleNoteChange}
        />
        
        {/* 结算台组件 */}
        <CheckoutPanel 
          totalPrice={totalPrice}
          onCheckout={handleCheckout}
        />
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '1rem',
          marginTop: '2rem'
        }}>
          <div style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '1.5rem',
            backgroundColor: '#fff'
          }}>
            <h3 style={{ color: '#333', marginBottom: '0.5rem' }}>{t('app.features.ssr.title')}</h3>
            <p style={{ color: '#666', margin: 0 }}>
              {t('app.features.ssr.description')}
            </p>
          </div>
          
          <div style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '1.5rem',
            backgroundColor: '#fff'
          }}>
            <h3 style={{ color: '#333', marginBottom: '0.5rem' }}>{t('app.features.typescript.title')}</h3>
            <p style={{ color: '#666', margin: 0 }}>
              {t('app.features.typescript.description')}
            </p>
          </div>
          
          <div style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '1.5rem',
            backgroundColor: '#fff'
          }}>
            <h3 style={{ color: '#333', marginBottom: '0.5rem' }}>{t('app.features.tools.title')}</h3>
            <p style={{ color: '#666', margin: 0 }}>
              {t('app.features.tools.description')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}