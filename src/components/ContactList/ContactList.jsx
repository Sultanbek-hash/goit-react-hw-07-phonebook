import styles from './contact-list.module.css';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contacts/contacts-slice';
import {getFilteredContacts} from 'redux/contacts/contacts-selectors';


const ContactList = () => {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(getFilteredContacts);

  const onDeleteContact = id => {
    const action = deleteContact(id);
    dispatch(action);
  };

  const elements = filteredContacts.map(contact => (
    <li key={contact.id} id={contact.id} className={styles.item}>
      <span className={styles.span}>{contact.name}:</span>
      <span>{contact.number}</span>
      <button className={styles.btn} onClick={() => onDeleteContact(contact.id)}>
        Delete
      </button>
    </li>
  ));
  return (
    <>
      {filteredContacts.length > 0 ? (
        <ul className={styles.list}>{elements} </ul>
      ) : (
        <h2>
          Add some contacts <br /> Your phonebook is empty
        </h2>
      )}
    </>
  );
};

ContactList.propTypes = {
  contacts: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string.isRequired,
      name: propTypes.string.isRequired,
      number: propTypes.string.isRequired,
    })
  ),
  deleteContact: propTypes.func.isRequired,
};

export default ContactList;
