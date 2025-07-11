'use server'

import { auth } from "@/auth"
import isAdmin from "@/lib/isAdmin"
import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

const ReportStatus = {
    IN_REVIEW: 'IN_REVIEW',
    PENALTY_ASSIGNED: 'PENALTY_ASSIGNED',
    UNDER_APPEAL: 'UNDER_APPEAL',
    NO_FURTHER_ACTION: 'NO_FURTHER_ACTION'
} as const

type ReportStatus = 'IN_REVIEW' | 'PENALTY_ASSIGNED' | 'UNDER_APPEAL' | 'NO_FURTHER_ACTION'
import { revalidatePath } from "next/cache"

export async function updateReportStatus(reportId: number, status: ReportStatus) {
    const session = await auth()
    if (!session?.user?.email) {
        throw new Error("Not authenticated")
    }

    const admin = await isAdmin()
    if (!admin) {
        throw new Error("Not authorized")
    }

    await prisma.report.update({
        where: { id: reportId },
        data: { status: status as any }
    })

    revalidatePath(`/reports/${reportId}`)
}
