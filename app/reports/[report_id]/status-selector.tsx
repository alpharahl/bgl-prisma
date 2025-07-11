'use client'

import { updateReportStatus } from "@/actions/updateReportStatus"
import { useState } from "react"

type ReportStatus = 'IN_REVIEW' | 'PENALTY_ASSIGNED' | 'UNDER_APPEAL' | 'NO_FURTHER_ACTION'
const statuses: ReportStatus[] = ['IN_REVIEW', 'PENALTY_ASSIGNED', 'UNDER_APPEAL', 'NO_FURTHER_ACTION']

interface StatusSelectorProps {
    reportId: number
    initialStatus: ReportStatus
    isAdmin: boolean
}

export default function StatusSelector({ reportId, initialStatus, isAdmin }: StatusSelectorProps) {
    const [status, setStatus] = useState(initialStatus)
    const [isUpdating, setIsUpdating] = useState(false)

    const handleStatusChange = async (newStatus: ReportStatus) => {
        try {
            setIsUpdating(true)
            await updateReportStatus(reportId, newStatus)
            setStatus(newStatus)
        } catch (error) {
            console.error('Failed to update status:', error)
        } finally {
            setIsUpdating(false)
        }
    }

    const getStatusColor = (status: ReportStatus) => {
        switch (status) {
            case 'IN_REVIEW':
                return 'bg-yellow-100 text-yellow-800'
            case 'PENALTY_ASSIGNED':
                return 'bg-red-100 text-red-800'
            case 'UNDER_APPEAL':
                return 'bg-purple-100 text-purple-800'
            case 'NO_FURTHER_ACTION':
                return 'bg-green-100 text-green-800'
        }
    }

    const formatStatus = (status: string) => {
        return status.split('_').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join(' ')
    }

    if (!isAdmin) {
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                {formatStatus(status)}
            </span>
        )
    }

    return (
        <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value as typeof statuses[number])}
            disabled={isUpdating}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
            {statuses.map((statusOption) => (
                <option key={statusOption} value={statusOption}>
                    {formatStatus(statusOption)}
                </option>
            ))}
        </select>
    )
}
