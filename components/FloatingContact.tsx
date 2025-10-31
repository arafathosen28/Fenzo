'use client'
import { MessageCircle, Facebook, Phone } from 'lucide-react'

export function FloatingContact() {
  const contacts = [
    {
      icon: MessageCircle,
      label: 'WhatsApp 1',
      href: 'https://wa.me/8801983268976',
      color: 'text-green-600 hover:text-green-700'
    },
    {
      icon: Phone,
      label: 'WhatsApp 2',
      href: 'https://wa.me/880718585937',
      color: 'text-green-600 hover:text-green-700'
    },
    {
      icon: Facebook,
      label: 'Facebook',
      href: 'https://facebook.com/fenzo5',
      color: 'text-blue-600 hover:text-blue-700'
    }
  ]

  return (
    <div className="floating-contact">
      {contacts.map((contact, index) => {
        const Icon = contact.icon
        return (
          <a
            key={index}
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
            className="floating-btn group"
            aria-label={contact.label}
            title={contact.label}
          >
            <Icon className={`w-6 h-6 ${contact.color} transition-colors`} />
          </a>
        )
      })}
    </div>
  )
}
