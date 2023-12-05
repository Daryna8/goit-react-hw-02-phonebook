export const ContactListItem = ({ id, name, number, handleDeleteContact }) => {
  return (
    <li>
      {name}: {number}
      <button onClick={() => handleDeleteContact(id)} type="button">
        Delete
      </button>
    </li>
  );
};
