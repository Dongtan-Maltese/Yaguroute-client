'use client'

import React, { JSX } from 'react'
import { ChevronLeft } from 'lucide-react'
import { HeaderProps } from '@/app/types'

export default function Header({ onBack, subtitle }: HeaderProps): JSX.Element {
  return (
    <div className="flex items-center p-4 bg-white border-b border-gray-200">
      <ChevronLeft 
        className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800" 
        onClick={onBack}
      />
      <div className="flex-1 text-center">
        <div className="text-gray-400 text-sm">
          {subtitle || '아구루트 제조 경기 선택'}
        </div>
      </div>
    </div>
  )
}
