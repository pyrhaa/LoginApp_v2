const Filter = ({
  setFilter,
  setFilterIdentity,
  setFilterPassword,
  successLog
}) => {
  return (
    <form>
      <div>
        name:{' '}
        <input
          className='nameInput'
          onChange={(e) => setFilterIdentity(e.target.value)}
        />
      </div>
      <div>
        number:{' '}
        <input
          className='numberInput'
          onChange={(e) => setFilterPassword(e.target.value)}
        />
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
