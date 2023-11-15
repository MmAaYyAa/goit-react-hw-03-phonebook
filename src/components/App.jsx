import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  createContacts = dataForm => {
    const existingContact = this.state.contacts.find(
      contact => contact.name.toLowerCase() === dataForm.name.toLowerCase()
    );
    if (existingContact) {
      return alert(`${dataForm.name} is already in contacts`);
    }

    const newContact = {
      ...dataForm,
      id: nanoid(),
    };

    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };

  deleteContacts = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(el => el.id !== id),
    }));
  };

  handleFilter = ({ target: { value } }) => {
    this.setState({ filter: value });
  };

  render() {
    const { contacts, filter } = this.state;

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return (
      <>
        <div>
          {/* <h1>Phonebook</h1> */}
          <ContactForm createContacts={this.createContacts}></ContactForm>

          {/* <h2>Contacts</h2> */}
          <Filter handleFilter={this.handleFilter} filter={this.state.filter} />
          <ContactsList
            contacts={this.state.contacts}
            deleteContacts={this.deleteContacts}
            filteredContacts={filteredContacts}
          ></ContactsList>
        </div>
      </>
    );
  }
}

export default App;

//   this.setState(({ contacts }) => ({ contacts: [...contacts, newContact] }));

// handleCheckUniqueContact = name => {
//   const { contacts } = this.state;
//   const isExistContact = !!contacts.find(contact => contact.name === name);
//   isExistContact && alert('Contact is already exist');
//   return !isExistContact;
// };

// handleRemoveContact = id => {
//   this.setState(({ contacts }) => ({
//     contacts: contacts.filter(contact => contact.id !== id),
//   }));
// };
