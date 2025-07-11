import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import isAdmin from "@/lib/isAdmin";

export async function getUserReports() {
    const session = await auth();
    
    if (!session?.user?.name) {
        return [];
    }

    const isAdminUser = await isAdmin();
    
    const reports = await prisma.report.findMany({
        where: {
            reportingDriver: session.user.discordId
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
