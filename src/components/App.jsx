import React from 'react';
import { nanoid } from 'nanoid';
import { StyledForm } from './PhoneBook.styled';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { ContactList } from './ContactList';

export class App extends React.Component {
  state = {
    contacts: [
      { id: '123', name: 'Daryna Shevchenko', number: '123-4334' },
      { id: '122', name: 'Ruslana Shevchenko', number: '123-432334' },
      { id: '121', name: 'John Doe', number: '123-433134' },
      { id: '127', name: 'name', number: '123-4331234' },
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
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <StyledForm onSubmit={this.handleSubmit}>
          <h1>Phonebook</h1>
          <ContactForm
            name={name}
            number={number}
            handleChangeInput={this.handleChangeInput}
          />
        </StyledForm>

        <h2>Contacts</h2>
        <Filter filter={filter} handleChangeInput={this.handleChangeInput} />
        <ContactList
          filteredContacts={filteredContacts}
          handleDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}
