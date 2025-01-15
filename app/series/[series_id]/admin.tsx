'use client'
import React from 'react';
import {deleteSeries} from "@/app/series/[series_id]/actions";
import {Series} from "@prisma/client"
import {useRouter} from "next/navigation";

const Admin = ({series}: { series: Series }) => {
  const [deleteConfirm, setDeleteConfirm] = React.useState(false);
  const router = useRouter()
  return (
    <div className="border-l-2 border-orange-500 mt-10 pl-2">
      <h2 className="text-xl mb-2 text-center">Admin</h2>
      {!deleteConfirm && <button
        className="bg-red-100 border-red-600 py-2 px-5 rounded-full hover:bg-red-500 hover:text-white transition-colors duration-200"
        onClick={() => {setDeleteConfirm(true)}}
      >
        Delete
      </button>}
      {deleteConfirm && <button
        className={"border-2 border-red-700 text-red-600 hover:bg-red-100"}
        onClick={async () => {
          await deleteSeries({series_id: series.id})
          router.push(`/league/${series.leagueId}`)
        }}
      >
        Are you sure?
      </button>}
    </div>
  )
}

export default Admin