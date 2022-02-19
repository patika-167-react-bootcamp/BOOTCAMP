import React, { useState } from 'react'
import { User } from './App'
import UserBalanceList from './UserBalanceList'

interface UserListProps {
  list: User[]
  onSave: (fullName: string, balance: number) => void
  onDelete: (id: number) => void
}

const UserList: React.FunctionComponent<UserListProps> = function ({
  list,
  onSave,
  onDelete,
  ...props
}) {
  const [fullName, setFullName] = useState<string>('')
  const [balance, setBalance] = useState<number>(0)

  const handleChangeFullName = (event: any) => {
    setFullName(event.currentTarget.value)
  }
  const handleChangeBalance = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBalance(Number(event.currentTarget.value))
  }
  const handleAddUser = () => {
    onSave(fullName, balance)
    setFullName('')
    setBalance(0)
  }
  return (
    <div>
      <div id="user-form">
        <input
          value={fullName}
          type="text"
          name="user-fullname"
          onChange={handleChangeFullName}
        />
        <input
          value={balance}
          type="text"
          name="user-balance"
          onChange={handleChangeBalance}
        />
        <button type="button" onClick={handleAddUser}>
          Kullanıcı Ekle
        </button>
      </div>
      <div id="user-balance-list">
        <UserBalanceList onDelete={onDelete} list={list} />
      </div>
    </div>
  )
}

export default UserList
