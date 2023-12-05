import React from 'react';
import { nanoid } from 'nanoid';
import { StyledForm } from './PhoneBook.styled';

export class App extends React.Component {
  state = {
    contacts: [
      { id: '123', name: 'Daryna Shevchenko', number: '123-4334' },
      { id: '122', name: 'Ruslana Shevchenko', number: '123-432334' },
      { id: '121', name: 'John Doe', number: '123-433134' },
      { id: '127', name: 'Johna Doe', number: '123-4331234' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  handleSubmit = e => {
    e.preventDefault();

    const name = e.currentTarget.elements.name.value;
    const id = nanoid();
    const number = e.currentTarget.elements.number.value;
    const contact = { name, id, number };

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
          <h2>Phonebook</h2>
          <label htmlFor="">
            Name
            <input
              value={name}
              onChange={this.handleChangeInput}
              type="text"
              name="name"
              required
            />
          </label>
          <label htmlFor="">
            Number
            <input
              value={number}
              onChange={this.handleChangeInput}
              type="tel"
              name="number"
              required
            />
          </label>
          <button type="submit">Add contact</button>
        </StyledForm>

        <h2>Contacts</h2>
        <label htmlFor="">
          Find contacts by name
          <input
            value={filter}
            onChange={this.handleChangeInput}
            type="text"
            name="filter"
          />
        </label>
        <ul>
          {filteredContacts.map(({ name, id, number }) => (
            <li key={id}>
              {name}: {number}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
