const PersonForm = ({ setNewName, setNewNumber, addNewPerson }) => {
  return (
    <form>
      <div>
        name:{' '}
        <input
          className='nameInput'
          onChange={(e) => setNewName(e.target.value)}
        />
      </div>
      <div>
        number:{' '}
        <input
          className='numberInput'
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button type='submit' onClick={addNewPerson}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
