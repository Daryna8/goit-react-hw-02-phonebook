import s from './PhoneBook.module.css';

export const ContactForm = ({ name, number, handleChangeInput }) => {
  return (
    <div>
      <label htmlFor="">
        Name
        <input
          value={name}
          onChange={handleChangeInput}
          type="text"
          name="name"
          required
        />
      </label>
      <label htmlFor="">
        Number
        <input
          value={number}
          onChange={handleChangeInput}
          type="tel"
          name="number"
          required
        />
      </label>
      <button className={s.add_contanct_button} type="submit">
        Add contact
      </button>
    </div>
  );
};
