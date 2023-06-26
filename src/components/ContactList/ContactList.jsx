import styles from './contact-list.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { deleteContact, fetchContacts } from 'redux/operations';
import { selectFilterContacts, selectIsLoading, selectError } from 'redux/selectors';

const ContactList = () => {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(selectFilterContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);


  const onDeleteContact = id => {
    const action = deleteContact(id);
    dispatch(action);
  };
  
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
    {isLoading && <div className={styles.spinner}></div>}
    {!filteredContacts?.length && !isLoading && !error && (<b className="loader"> Add some contacts <br /> Your phonebook is empty</b>) }
    {error && <b className={styles.text}>{error}</b>}
     <ul className={styles.list}>
    {filteredContacts.map(contact => (
    <li key={contact.id} id={contact.id} className={styles.item}>
      <span className={styles.span}>{contact.name}:</span>
      <span>{contact.number}</span>
      <button className={styles.btn} onClick={() => onDeleteContact(contact.id)}>
        Delete
      </button>
    </li>
  ))}
     </ul>
     </>
  );
};
export default ContactList;
