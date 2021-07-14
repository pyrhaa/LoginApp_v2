const Filter = ({ setUserIdentity, setUserPassword, successLog }) => {
  return (
    <form>
      <div>
        identity: <input onChange={(e) => setUserIdentity(e.target.value)} />
      </div>
      <div>
        password: <input onChange={(e) => setUserPassword(e.target.value)} />
      </div>
      <div>
        <button type='submit' onClick={successLog}>
          Connection
        </button>
      </div>
    </form>
  );
};

export default Filter;
