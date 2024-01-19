import PropTypes from "prop-types";

export const ContactForm = ({ addContact }) => {
  return (
    <form onSubmit={addContact}>
      <label>
        Name: <br />
        <input
          type="text"
          name="name"
          id=""
          placeholder="Contact name"
          pattern="^[a-zA-Z]+(([' \u2013][a-zA-Z])?[a-zA-Z]*)*$"
          title="Name may contain only letters, apostrophe, dash, and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <br />
      <br />
      <label>
        Number: <br />
        <input
          type="tel"
          name="number"
          id=""
          placeholder="Contact number"
          pattern="[0-9]*"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <br />
      <br />
      <button type="submit">Add contact</button>
    </form>
  );
};

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};
