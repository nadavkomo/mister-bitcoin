import React from 'react'
import './ContactPreview.scss'
export function ContactPreview({ contact, onSelectContact }) {

  function selectContact(ev) {
    ev.stopPropagation()
    onSelectContact(contact._id)
  }
  return (
    <li className="contact-preview flex column auto-center hover-pointer" onClick={ selectContact }>
      <img src={ "https://robohash.org/" + contact._id } alt="" />
      <h3>{ contact.name }</h3>
    </li>
  )
}
