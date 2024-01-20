import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { ContactForm } from "./components/ContactForm";
import { Filter } from "./components/Filter";
import { ContactList } from "./components/ContactList";
import css from "./App.module.css";

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");

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

    setContacts((prevContacts) => [...prevContacts, contact]);

    event.target.reset();
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const deleteContact = (id) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
  };

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <Filter handleFilterChange={handleFilterChange} />
      <ContactList
        filteredContacts={filteredContacts}
        deleteContact={deleteContact}
      />
    </div>
  );
};
