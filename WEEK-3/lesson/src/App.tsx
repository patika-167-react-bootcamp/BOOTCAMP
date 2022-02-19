import React, { useState } from 'react'
import './App.css'
import Transaction from './Transaction'
import UserList from './UserList'

export interface User {
  id: number
  fullName: string
  balance: number
}
interface HistoryItem {
  timestamp: Date
  type: 'error' | 'success' | 'warning'
  informationMessage: string
}
interface HistoryItemTransaction {
  timestamp: Date
  type: 'transaction'
  informationMessage: string
  senderId: User['id']
  receiverId: User['id']
  amount: number
  alreadyUndid: boolean
}
type FilterType = 'sender' | 'receiver' | 'both'
function App() {
  const [userList, setUserList] = useState<User[]>([])
  const [history, setHistory] = useState<
    Array<HistoryItem | HistoryItemTransaction>
  >([])

  const [filterUserId, setFilterUserId] = useState<number>()
  const [filterType, setFilterType] = useState<FilterType>()

  const handleAddUser = (fullName: string, balance: number) => {
    setUserList([
      {
        fullName,
        balance,
        id: Math.ceil(Math.random() * 1000 + 1),
      },
      ...userList,
    ])
    handleAddHistory({
      timestamp: new Date(),
      informationMessage: `${fullName} adında kullanıcı eklendi ve bakiyesi ${balance}`,
      type: 'success',
    })
  }
  const handleDeleteUser = (id: number) => {
    const newList = userList.slice()
    const user = newList.find((item) => item.id === id)
    if (user) {
      newList.splice(newList.indexOf(user), 1)
      setUserList(newList)
      handleAddHistory({
        timestamp: new Date(),
        informationMessage: `${user?.fullName} adında kullanıcı silindi`,
        type: 'warning',
      })
    }
  }
  const handleAddHistory = (props: HistoryItem | HistoryItemTransaction) => {
    setHistory([...history, props])
  }
  const handleSendMoney = (
    senderId: number,
    receiverId: number,
    amount: number,
    isUndo: boolean
  ) => {
    const newUserList = userList.slice()
    const sender = newUserList.find((item) => item.id === senderId)
    const receiver = newUserList.find((item) => item.id === receiverId)
    if (sender && receiver) {
      sender.balance = sender.balance - amount
      receiver.balance = receiver.balance + amount
      handleAddHistory({
        timestamp: new Date(),
        type: 'transaction',
        informationMessage: `${sender?.fullName} kişisi ${receiver?.fullName} kişisine ${amount}₺ gönderdi`,
        senderId: sender.id,
        receiverId: receiver.id,
        amount: amount,
        alreadyUndid: isUndo,
      })
      setUserList(newUserList)
    }
  }
  const renderHistory = () => {
    const mapper = (item: HistoryItem |HistoryItemTransaction) => (
      <p className={item.type}>
        {item.timestamp.toLocaleString()} - {item.informationMessage}
        {item.type === 'transaction' && !item.alreadyUndid && (
          <button
            onClick={() => {
              handleSendMoney(item.receiverId, item.senderId, 100, true)
            }}
          >
            Geri al
          </button>
        )}
      </p>
    )
    if (filterType) {
      return history.filter((item) => {
        let x: Boolean = false
        if (item.type === 'transaction') {
          if (filterType === 'sender') x = item.senderId === filterUserId
          if (filterType === 'receiver') x = item.receiverId === filterUserId
          if (filterType === 'both')
            x =
              item.receiverId === filterUserId || item.senderId === filterUserId
        }
        return x
      }).map(mapper)
    } else {return history.map(mapper)}
  }
  
  return (
    <div className="App">
      <div id="user-list">
        <UserList
          list={userList}
          onSave={handleAddUser}
          onDelete={handleDeleteUser}
        />
      </div>
      <div id="history">
        <div>
          <Transaction list={userList} onSendMoney={handleSendMoney} />
        </div>
        <div>
          <h1>Filter</h1>
          <div>
            <select
              name="filter"
              id="filter"
              onChange={(event) => {
                setFilterUserId(Number(event.currentTarget.value))
              }}
            >
              {userList.map((item) => (
                <option value={item.id}>{item.fullName}</option>
              ))}
            </select>
            <button onClick={() => setFilterType('sender')}>
              Sender Olanlar
            </button>
            <button onClick={() => setFilterType('receiver')}>
              Receiver Olanlar
            </button>
            <button onClick={() => setFilterType('both')}>
              Her ikisinden birisi Olanlar
            </button>
            <button onClick={() => setFilterType(undefined)}>
              Filtreyi Temizle
            </button>
          </div>
        </div>
        {renderHistory()}
      </div>
    </div>
  )
}

export default App
