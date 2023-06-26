import { useState } from 'react';
import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from 'redux/operations';
import { selectContacts } from 'redux/selectors';
import styles from './form.module.css';

const Form = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const [contactName, setcontactName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if(contacts.find(({name})=> name === contactName)){
      alert(`${contactName} is already in contacts`);
      return;
    }
    dispatch(addContact({ name: contactName , number, id: nanoid() }));
    setcontactName('');
    setNumber('');
  };
  
 const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch(name){
      case 'name':
        setcontactName(value);
        break;
      case 'number':
        setNumber(value);
        break;
        default:
          return;
    }
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label}>
        <span className={styles.span}>Name</span>
        <input
          type="text"
          name="name"
          value={contactName}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
        />
      </label>
      <label className={styles.label}>
        <span className={styles.span}>Tel</span>
        <input
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
        />
      </label>
      <button className={styles.btn} type="submit" >
        Add contact
      </button>
    </form>
  );
};

export default Form;
