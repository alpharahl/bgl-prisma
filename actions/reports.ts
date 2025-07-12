import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import isAdmin from "@/lib/isAdmin";
import { ReportStatus } from "@prisma/client";

export async function getUserReports(showAllReports: boolean = false, showActive: boolean = false) {
    const session = await auth();
    
    if (!session?.user?.name) {
        return [];
    }

    const isAdminUser = await isAdmin();
    
    // Only admins can see all reports
    if (showAllReports && !isAdminUser) {
        showAllReports = false;
    }

    // Convert boolean to enum comparison
    const statusFilter = showActive ? {
        status: {
            in: [ReportStatus.IN_REVIEW, ReportStatus.UNDER_APPEAL]
        }
    } : {};

    const reports = await prisma.report.findMany({
        where: {
            ...(showAllReports ? {} : {
                reportingDriver: session.user.discordId
            }),
            ...statusFilter
        },
        select: {
            id: true,
            description: true,
            offendingDriver: true,
            reportingDriver: true,
            link: true,
            seriesId: true,
            status: true,
            series: {
                select: {
                    name: true
                }
            },
            ...(isAdminUser ? {
                processedDescription: true,
                message: true
            } : {})
        },
        orderBy: {
            id: 'desc'
        }
    });

    return reports;
}
