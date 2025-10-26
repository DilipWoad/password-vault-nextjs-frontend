const UserPin = ({setShowPin}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="w-44 h-52 bg-red-500">
        <div className="bg-lime-500">
          <input />
          <input />
          <input />
          <input />
        </div>
        <div>
          <button onClick={()=>setShowPin(false)} className="px-7 py-2 text-sm">Cancel</button>
          <button>OK</button>
        </div>
      </div>
    </div>
  );
};

export default UserPin;
