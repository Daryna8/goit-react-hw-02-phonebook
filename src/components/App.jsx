import React from 'react';
import { nanoid } from 'nanoid';
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
    name: '',
    number: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const id = nanoid();
    const { name, number } = this.state;
    if (this.state.contacts.map(contact => contact.name).includes(name)) {
      alert(`${name} is already in contacts.`);
    }
    const contact = { id, name, number };

    this.setState(prevState => ({
      contacts: prevState.contacts.concat(contact),
    }));

    this.setState({
      name: '',
      number: '',
    });
  };

  handleChangeInput = e => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;
    this.setState({ [name]: value });
  };

  getFilteredContacts = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { filter, name, number } = this.state;
    const filteredContacts = this.getFilteredContacts();
    return (
      <div
        // style={{
        //   height: '100vh',
        //   display: 'flex',
        //   justifyContent: 'center',
        //   flexDirection: 'column',
        //   alignItems: 'center',
        //   fontSize: 40,
        //   color: '#010101',
        // }}
        className={s.phonebook}
      >
        <form onSubmit={this.handleSubmit}>
          <h1>Phonebook</h1>
          <ContactForm
            name={name}
            number={number}
            handleChangeInput={this.handleChangeInput}
          />
        </form>

        <div className={s.contacts}>
          <h2>Contacts</h2>
          <Filter filter={filter} handleChangeInput={this.handleChangeInput} />
          <ContactList
            filteredContacts={filteredContacts}
            handleDeleteContact={this.handleDeleteContact}
          />
        </div>
      </div>
    );
  }
}
