import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function ReportPage({
    params
}: {
    params: { report_id: string }
}) {
    const session = await auth();
    
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
            id: parseInt(params.report_id),
        },
        include: {
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
                            </dl>
                        </div>
                        
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Description</h2>
                            <div>
                                <h3 className="text-md font-semibold mb-2">Message</h3>
                                <p className="text-gray-800 whitespace-pre-wrap">{report.message}</p>
                            </div>
                            
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
