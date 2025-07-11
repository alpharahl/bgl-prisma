import { auth } from "@/auth";
import { getUserReports } from "@/actions/reports";
import Link from "next/link";
import type { ReportListItem } from "./types";

export default async function ReportsPage() {
    const session = await auth();
    
    if (!session?.user) {
        return (
            <main className="min-h-screen p-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-2xl font-bold mb-4">My Reports</h1>
                    <p>Please sign in to view your reports.</p>
                </div>
            </main>
        );
    }

    const reports = await getUserReports() as ReportListItem[];

    const statusColors = {
        IN_REVIEW: 'bg-yellow-100 text-yellow-800',
        PENALTY_ASSIGNED: 'bg-blue-100 text-blue-800',
        UNDER_APPEAL: 'bg-purple-100 text-purple-800',
        NO_FURTHER_ACTION: 'bg-gray-100 text-gray-800'
    } as const;

    return (
        <main className="min-h-screen p-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">My Reports</h1>
                    <Link 
                        href="/report/new" 
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                        Submit New Report
                    </Link>
                </div>

                {reports.length === 0 ? (
                    <p className="text-gray-600">You haven&apos;t submitted any reports yet.</p>
                ) : (
                    <div className="space-y-4">
                        {reports.map((report) => (
                            <Link
                                key={report.id}
                                href={`/reports/${report.id}`}
                                className="block bg-white shadow rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="space-y-2">
                                        <h2 className="text-lg font-semibold">
                                            Report against {report.offendingDriver}
                                        </h2>
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                            {report.status && (
                                                <span className={`inline-block px-2 py-1 rounded text-sm ${statusColors[report.status] || 'bg-gray-100 text-gray-800'}`}>
                                                    {report.status.replace('_', ' ')}
                                                </span>
                                            )}
                                            <span className="text-gray-600 text-sm">
                                                From: {report.reportingDriver}
                                            </span>
                                            <span className="text-gray-600 text-sm hidden sm:inline">•</span>
                                            {report.series && (
                                                <span className="text-gray-600 text-sm">
                                                    Series: {report.series.name}
                                                </span>
                                            )}
                                        </div>
                                        {report.message && (
                                            <p className="text-gray-500 text-sm line-clamp-2">
                                                {report.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
