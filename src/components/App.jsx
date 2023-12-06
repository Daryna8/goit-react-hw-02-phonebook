import React from 'react';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { ContactList } from './ContactList';
import s from './PhoneBook.module.css';

export class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleChangeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilteredContacts = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  handleAddContact = newContact => {
    if (this.state.contacts.map(c => c.name).includes(newContact.name)) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }
    this.setState(prevState => ({
      contacts: prevState.contacts.concat(newContact),
    }));
  };

  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();
    return (
      <div className={s.phonebook}>
        <h1>Phonebook</h1>
        <ContactForm handleAddContact={this.handleAddContact} />

        <div className={s.contacts}>
          <h2>Contacts</h2>
          <Filter filter={filter} handleChangeInput={this.handleChangeFilter} />
          <ContactList
            filteredContacts={filteredContacts}
            handleDeleteContact={this.handleDeleteContact}
          />
        </div>
      </div>
    );
  }
}
