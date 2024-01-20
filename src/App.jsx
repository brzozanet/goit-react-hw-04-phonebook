import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
// import { Component } from "react";
import { ContactForm } from "./components/ContactForm";
import { Filter } from "./components/Filter";
import { ContactList } from "./components/ContactList";
import css from "./App.module.css";

export const AppFn = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  useEffect(() => {
    const savedContacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(savedContacts);
    setContacts(() => parsedContacts || []);
  }, []);

  const addContact = (event) => {
    event.preventDefault();
    const contact = {
      id: nanoid(),
      name: event.target.elements.name.value,
      number: event.target.elements.number.value,
    };

    const alreadyExistingContact = contacts.find(
      (contact) =>
        contact.name.toLowerCase() ===
        event.target.elements.name.value.toLowerCase()
    );

    if (alreadyExistingContact) {
      alert(`${event.target.elements.name.value} is already in contacts.`);
      event.target.reset();
      return;
    }

    setContacts((state) => ({
      contacts: [...state, contact],
    }));

    event.target.reset();
  };
};

export class App extends Component {
  // state = {
  //   contacts: [],
  //   filter: "",
  //   name: "",
  //   number: "",
  // };

  // constructor() {
  //   super();
  //   const savedContacts = localStorage.getItem("contacts");
  //   const parsedContacts = JSON.parse(savedContacts);
  //   this.state.contacts = parsedContacts || [];
  // }

  // addContact = (event) => {
  //   event.preventDefault();
  //   const contact = {
  //     id: nanoid(),
  //     name: event.target.elements.name.value,
  //     number: event.target.elements.number.value,
  //   };

  //   if (
  //     this.state.contacts.find(
  //       (contact) =>
  //         contact.name.toLowerCase() ===
  //         event.target.elements.name.value.toLowerCase()
  //     )
  //   ) {
  //     alert(`${event.target.elements.name.value} is already in contacts.`);
  //     event.target.reset();
  //     return;
  //   }

  //   this.setState((prevState) => ({
  //     contacts: [...prevState.contacts, contact],
  //   }));

  //   event.target.reset();
  // };

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value });
  };

  deleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };

  componentDidUpdate() {
    localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
  }

  render() {
    const filteredContacts = this.state.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );

    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />

        <h2>Contacts</h2>
        <Filter handleFilterChange={this.handleFilterChange} />
        <ContactList
          filteredContacts={filteredContacts}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
