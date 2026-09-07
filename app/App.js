'use client'

import { useEffect, useState } from 'react'
import CustomCursor from '../CustomCursor.jsx'

export default function App({ children, loader }) {
    const [progress, setProgress] = useState(0)
    const [loaderGone, setLoaderGone] = useState(false)
    const [showLoader, setShowLoader] = useState(true)

    const logoText = loader.brandText

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    return 100
                }
                return prev + Math.floor(Math.random() * 15) + 8
            })
        }, 50)

        const hideTimer = setTimeout(() => {
            setProgress(100)
            setLoaderGone(true)
            document.body.classList.add('intro-done')
        }, 800)

        const removeTimer = setTimeout(() => {
            setShowLoader(false)
        }, 1450)

        return () => {
            clearInterval(interval)
            clearTimeout(hideTimer)
            clearTimeout(removeTimer)
        }
    }, [])

    const NBSP = String.fromCharCode(160)

    return (
        <>
            <CustomCursor />
            {showLoader && (
                <div className={`site-loader${loaderGone ? ' gone' : ''}`} id="siteLoader">
                    <div className="site-loader-inner">
                        <div className="site-loader-brand">
                            {logoText.split('').map((char, index) => (
                                <span
                                    key={index}
                                    className="brand-char"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    {char === ' ' ? NBSP : char}
                                </span>
                            ))}
                        </div>
                        <div className="site-loader-progress-wrap">
                            <div className="site-loader-bar">
                                <div
                                    className="site-loader-fill"
                                    style={{ width: `${Math.min(100, progress)}%` }}
                                />
                            </div>
                            <span className="site-loader-counter">{Math.min(100, progress)}{loader.progressCounterSuffix}</span>
                        </div>
                    </div>
                </div>
            )}
            {children}
        </>
    )
}
