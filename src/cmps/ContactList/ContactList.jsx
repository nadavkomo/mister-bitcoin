import { ContactPreview } from '../ContactPreview/ContactPreview';
import './ContactList.scss'
export function ContactList({ contacts, onSelectContact }) {
  return (
    <ul className="contact-list clean-list flex wrap auto-center ">
      {
        contacts.map(contact => <ContactPreview onSelectContact={onSelectContact} contact={contact} key={contact._id} />)
      }
    </ul>
  )
}