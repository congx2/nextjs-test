'use client'
import { useState, forwardRef, useRef, useEffect, TextareaHTMLAttributes } from 'react'
import styles from './index.module.scss'

interface ITextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  onChange?: (value: string) => void
  showCounter?: boolean
  maxLength?: number
}

const Textarea = forwardRef<HTMLTextAreaElement, ITextareaProps>((props, ref) => {
  const { onChange, showCounter = false, maxLength, className, value, ...restProps } = props
  const [isComposing, setIsComposing] = useState(false)
  const [textareaValue, setTextareaValue] = useState(value || '') // textarea 的实际显示值
  const [counterValue, setCounterValue] = useState(value || '') // 专门用于计数器显示的值，避免中文输入时跳动
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // 将原生 textarea ref 传递给父组件
  useEffect(() => {
    if (ref) {
      if (typeof ref === 'function') {
        ref(textareaRef.current)
      } else {
        ref.current = textareaRef.current
      }
    }
  }, [ref])

  // 同步外部传入的 value 变化
  useEffect(() => {
    setTextareaValue(value || '')
    if (!isComposing) {
      setCounterValue(value || '')
    }
  }, [value, isComposing])

  const handleCompositionStart = () => {
    setIsComposing(true)
  }

  const handleCompositionEnd = (e: React.CompositionEvent<HTMLTextAreaElement>) => {
    setIsComposing(false)
    const newValue = (e.target as HTMLTextAreaElement).value
    setCounterValue(newValue) // 只有在中文输入确认后才更新计数器值
    onChange?.(newValue)
  }

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setTextareaValue(newValue) // 始终更新 textarea 的显示值
    
    // 只有在非中文输入状态下才触发 onChange 和更新计数器
    if (!isComposing) {
      setCounterValue(newValue)
      onChange?.(newValue)
    }
  }

  // 计算当前字符数（使用 counterValue 来避免中文输入待选状态下的更新）
  const currentLength = String(counterValue).length

  return (
    <div className={`${styles.textareaWrapper} ${className || ''}`}>
      <textarea
        {...restProps}
        ref={textareaRef}
        value={textareaValue}
        onChange={handleInput}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        maxLength={maxLength}
        className={styles.textarea}
      />
      {showCounter && (
        <div className={styles.counter}>
          {currentLength}{maxLength ? `/${maxLength}` : ''}
        </div>
      )}
    </div>
  )
})

Textarea.displayName = 'Textarea'

export default Textarea