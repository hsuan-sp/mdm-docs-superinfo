"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const GlobalLoader: React.FC = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let timer: any

    const handleStart = (url: string) => {
      if (url.split('?')[0] === router.asPath.split('?')[0]) return
      
      setLoading(true)
      setProgress(10)
      timer = setInterval(() => {
        setProgress((prev) => (prev >= 90 ? 90 : prev + 5))
      }, 200)
    }

    const handleComplete = () => {
      clearInterval(timer)
      setProgress(100)
      setTimeout(() => {
        setLoading(false)
        setProgress(0)
      }, 400)
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
      clearInterval(timer)
    }
  }, [router.asPath, router.events])

  if (!loading) return null

  return (
    <div 
      className="loader-progress-bar"
      style={{ width: `${progress}%`, opacity: progress === 100 ? 0 : 1 }}
    />
  )
}

export default GlobalLoader
