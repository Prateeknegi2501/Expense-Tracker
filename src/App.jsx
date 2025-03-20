import React, { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

const App = () => {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddbtn, setShowAddbtn] = useState(false);
  const [selectFriend, setSelectFriend] = useState(null);

  const handleSelectFriend = (friend) => {
    setSelectFriend(friend);
  };
  const handleAddFriend = (friend) => {
    setFriends([...friends, friend]);
  };
  const handleSplitBill = (id, amount) => {
    setFriends((prevFriend) =>
      prevFriend.map((friend) =>
        friend.id === id
          ? { ...friend, balance: friend.balance + amount }
          : friend
      )
    );
    setSelectFriend(null);
  };
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friend={friends} onSelectFriend={handleSelectFriend} />
        {showAddbtn && <AddFriendForm onAdd={handleAddFriend} />}
        <Button onClick={() => setShowAddbtn((prev) => !prev)}>
          {showAddbtn ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectFriend && (
        <SplitBillForm friend={selectFriend} onSplitBill={handleSplitBill} />
      )}
    </div>
  );
};

function FriendsList({ friend, onSelectFriend }) {
  return (
    <ul>
      {friend.map((friend) => (
        <Friend key={friend.id} friend={friend} onSelect={onSelectFriend} />
      ))}
    </ul>
  );
}

const Friend = ({ friend, onSelect }) => {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h5>{friend.name}</h5>
      <p
        className={
          friend.balance > 0 ? "green" : friend.balance < 0 ? "red" : "even"
        }
      >
        {friend.balance > 0
          ? `${friend.name} owes you ₹${Math.abs(friend.balance)}`
          : friend.balance < 0
          ? `You owes ${friend.name} ₹${Math.abs(friend.balance)}`
          : `You and ${friend.name} are even`}
      </p>
      <Button onClick={() => onSelect(friend)}>Select</Button>
    </li>
  );
};

const AddFriendForm = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !image) return;

    const newFriend = {
      id: Date.now(),
      name,
      image,
      balance: 0,
    };
    onAdd(newFriend);
    setName("");
    setImage("");
  };
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👀Friend Name</label>
      <input
        type="text"
        name="friendName"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>🌅Image URL</label>
      <input
        type="text"
        name="friendImage"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button type="Submit">Add</Button>
    </form>
  );
};

const SplitBillForm = ({ friend, onSplitBill }) => {
  const [bill, setBill] = useState("");
  const [yourExpenses, setYourExpenses] = useState("");
  const friendExpenses = bill - yourExpenses;
  const [payer, setPayer] = useState("You");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bill || !yourExpenses) return;

    const amount = payer === "You" ? friendExpenses : -yourExpenses;
    onSplitBill(friend.id, amount);
  };
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>{`Split a bill with ${friend.name} `}</h2>

      <label>💰 Bill Value</label>
      <input
        name="billValue"
        type="number"
        value={bill}
        onChange={(e) => setBill(e.target.value)}
      />

      <label>🙎🏻‍♂️Your expenses</label>
      <input
        type="number"
        name="yourExpenses"
        value={yourExpenses}
        onChange={(e) => setYourExpenses(e.target.value)}
      />

      <label>🙍🏼‍♂️ Friend's expense</label>
      <input
        type="number"
        name="friendExpense"
        value={friendExpenses}
        disabled
      />

      <label>💰 Who is paying the bill?</label>
      <select
        name="personSelect"
        value={payer}
        onChange={(e) => setPayer(e.target.value)}
      >
        <option value="You">You</option>
        <option value={friend.name}>{friend.name}</option>
      </select>

      <Button type="submit">split bill</Button>
    </form>
  );
};
function Button({ onClick, children }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default App;
