const PersonForm = ({ setNewIdentity, setNewPassword, addNewUser }) => {
  return (
    <form>
      <div>
        identity: <input onChange={(e) => setNewIdentity(e.target.value)} />
      </div>
      <div>
        password: <input onChange={(e) => setNewPassword(e.target.value)} />
      </div>
      <div>
        <button type='submit' onClick={addNewUser}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
