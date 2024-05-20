import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { deleteContact } from '../store/contactsSlice';

const ContactList: React.FC = () => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Contact List</h2>
      <ul className="space-y-2">
        {contacts.map(contact => (
          <li key={contact.id} className="p-4 bg-white shadow rounded">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">{contact.name}</p>
                <p className="text-sm text-gray-600">{contact.email}</p>
                <p className="text-sm text-gray-600">{contact.phone}</p>
              </div>
              <div>
                <button
                  className="mr-2 text-blue-500 hover:text-blue-700"
                  // Add your edit functionality here
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => dispatch(deleteContact(contact.id))}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;

  
