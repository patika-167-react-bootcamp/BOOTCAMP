import React from 'react'
import { User } from './App'
interface UserBalanceListProps {
  list: User[]
  onDelete: (id: number) => void
}
const UserBalanceList: React.FC<UserBalanceListProps> = function ({
  list,
  onDelete,
}) {
  return (
    <div>
      {list.map((item) => (
        <li>
          {item.fullName} - {item.balance}₺
          <button onClick={() => onDelete(item.id)}>Sil</button>
        </li>
      ))}
    </div>
  )
}

export default UserBalanceList
