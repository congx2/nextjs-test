'use client'

import React, { useState } from 'react'
import { useScopedI18n } from '@/lib/i18n/client'
import styles from './index.module.scss'

interface ICheckoutPanelProps {
  totalPrice: number
  onCheckout?: () => void
}

function CheckoutPanel(props: ICheckoutPanelProps) {
  const { totalPrice, onCheckout } = props
  const t = useScopedI18n('checkoutPanel')
  const [showDetail, setShowDetail] = useState(false)
  const [isAgreed, setIsAgreed] = useState(false)

  const handleDetailClick = () => {
    setShowDetail(!showDetail)
  }

  const handleCheckout = () => {
    if (isAgreed) {
      onCheckout?.()
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.checkoutBar}>
        <div className={styles.priceSection}>
          <span className={styles.priceLabel}>{t('total')}</span>
          <span className={styles.priceValue}>
            ¥{totalPrice}
          </span>
          <button
            onClick={handleDetailClick}
            className={styles.detailButton}
          >
            明细 {showDetail ? '▲' : '▼'}
          </button>
          <span className={styles.priceNote}>
            实际费用请以快递员揽收时为准
          </span>
        </div>

        <div className={styles.actionSection}>
          <label className={styles.agreementLabel}>
            <input
              type="checkbox"
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
            />
            阅读并同意《电子运单契约条款》
          </label>
          
          <button
            onClick={handleCheckout}
            disabled={!isAgreed}
            className={`${styles.checkoutButton} ${isAgreed ? styles.enabled : styles.disabled}`}
          >
            {t('submit')}
          </button>
        </div>
      </div>

      {/* 明细 Popover */}
      {showDetail && (
        <div className={styles.popover}>
          <div className={styles.popoverContent}>
            <div className={styles.popoverHeader}>
              <h3 className={styles.popoverTitle}>
                运费预估
              </h3>
              <button
                onClick={() => setShowDetail(false)}
                className={styles.closeButton}
              >
                ×
              </button>
            </div>

            <div className={styles.description}>
              <p>
                实际费用按收流费揽收时称重计算，运费四舍五入取整数，详见计费规则
              </p>
            </div>

            <div className={styles.detailSection}>
              <div className={`${styles.detailRow} ${styles.mainRow}`}>
                <span>基础运费</span>
                <span>¥ {totalPrice}</span>
              </div>

              <div className={`${styles.detailRow} ${styles.subRow}`}>
                <span>计费类型</span>
                <span>按重量计费</span>
              </div>

              <div className={`${styles.detailRow} ${styles.subRow}`}>
                <span>重量</span>
                <span>1kg</span>
              </div>

              <div className={`${styles.detailRow} ${styles.mainRow}`}>
                <span>燃油附加费</span>
                <span>¥ 0</span>
              </div>

              <div className={`${styles.detailRow} ${styles.mainRow}`}>
                <span>增值服务</span>
                <span>¥ 0</span>
              </div>

              <div className={styles.hint}>
                提示：将根据实际使用包装材料收取费用，以快递员核实为准
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CheckoutPanel