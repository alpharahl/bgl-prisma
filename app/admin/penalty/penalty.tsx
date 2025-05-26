'use client'
import {Penalty} from "@prisma/client";
import {BiTrash} from "react-icons/bi";
import {useState} from "react";

type penaltyProps = {
  penalty: Penalty,
  removePenalty: Function
}
const PenaltyRow = ({penalty, removePenalty}: penaltyProps) => {
  const [confirm, setConfirm] = useState<boolean>(false)
  return (
    <div
      key={penalty.id}
      className={"grid grid-cols-8 gap-2 w-full text-left mt-1"}
    >
      <div>{penalty.code}</div>
      <div>{penalty.points}</div>
      <div className={"col-span-2"}>{penalty.name}</div>
      <div className="col-span-3 flex-grow">{penalty.description}</div>
      <div>
        {!confirm && <button className={"bg-red-300 px-2 py-1 rounded-md"} onClick={() => setConfirm(true)}><BiTrash/></button>}
        {confirm && <button className={"bg-red-700 text-white px-2 py-1 rounded-md"} onClick={async () => (removePenalty(penalty.id))}>Confirm</button>}
      </div>
    </div>
  )
}

export default PenaltyRow