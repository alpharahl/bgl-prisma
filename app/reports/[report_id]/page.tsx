import { auth } from "@/auth";
import isAdmin from "@/lib/isAdmin";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import StatusSelector from "./status-selector";

interface PageProps {
    params: Promise<{ report_id: string }>;
}

export default async function ReportPage(props: PageProps) {
    const params = await props.params;
    const session = await auth();
    const admin = await isAdmin();
    
    if (!session?.user) {
        return (
            <main className="min-h-screen p-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-2xl font-bold mb-4">Report Details</h1>
                    <p>Please sign in to view this report.</p>
                </div>
            </main>
        );
    }

    const report = await prisma.report.findUnique({
        where: {
            id: parseInt(params.report_id.toString()),
        },
        select: {
            id: true,
            status: true,
            offendingDriver: true,
            description: true,
            message: true,
            link: true,
            series: {
                select: {
                    name: true
                }
            }
        }
    });

    if (!report) {
        notFound();
    }

    return (
        <main className="min-h-screen p-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Report Details</h1>
                
                <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Incident Information</h2>
                            <dl className="space-y-2">
                                <div>
                                    <dt className="text-gray-600">Reported Driver</dt>
                                    <dd className="font-medium">{report.offendingDriver}</dd>
                                </div>
                                <div>
                                    <dt className="text-gray-600">Series</dt>
                                    <dd className="font-medium">{report.series.name}</dd>
                                </div>
                                <div>
                                    <dt className="text-gray-600">Status</dt>
                                    <dd className="font-medium mt-1">
                                        <StatusSelector
                                            reportId={report.id}
                                            initialStatus={report.status}
                                            isAdmin={admin}
                                        />
                                    </dd>
                                </div>
                            </dl>
                        </div>
                        
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Description</h2>
                            
                            <div className="mt-4">
                                <h3 className="text-md font-semibold mb-2">Description</h3>
                                <p className="text-gray-800 whitespace-pre-wrap">{report.description}</p>
                            </div>
                        </div>
                    </div>

                    {report.link && (
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <h2 className="text-lg font-semibold mb-4">Evidence Link</h2>
                            <a 
                                href={report.link} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-blue-600 hover:text-blue-800 underline"
                            >
                                View Evidence
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
