import { auth } from "@/auth";
import { getUserReports } from "@/actions/reports";
import Link from "next/link";

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

    const reports = await getUserReports();

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
                            <div 
                                key={report.id} 
                                className="bg-white shadow rounded-lg p-4 border border-gray-200"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h2 className="text-lg font-semibold">
                                            Report against {report.offendingDriver}
                                        </h2>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className={`text-sm px-2 py-1 rounded ${
                                                report.status === 'IN_REVIEW' ? 'bg-yellow-100 text-yellow-800' :
                                                report.status === 'PENALTY_ASSIGNED' ? 'bg-red-100 text-red-800' :
                                                report.status === 'UNDER_APPEAL' ? 'bg-purple-100 text-purple-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                {report.status.replace(/_/g, ' ')}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                Series: {report.series.name}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-700 mb-2">{report.description}</p>
                                <div className="mt-3">
                                    <a 
                                        href={report.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline text-sm"
                                    >
                                        View Clip
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
