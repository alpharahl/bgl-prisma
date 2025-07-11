export type ReportListItem = {
    id: number;
    description: string;
    offendingDriver: string;
    reportingDriver: string;
    link: string;
    seriesId: number;
    status: 'IN_REVIEW' | 'PENALTY_ASSIGNED' | 'UNDER_APPEAL' | 'NO_FURTHER_ACTION';
    series: {
        name: string;
    };
    processedDescription: string | null;
    message: string;
}
