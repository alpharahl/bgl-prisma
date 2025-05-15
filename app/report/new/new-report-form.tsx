'use client'
import React from 'react';
import {Prisma} from '@prisma/client';

type newReportFormProps = {
  series: SeriesWithEvents;
}

type SeriesWithEvents = Prisma.SeriesGetPayload<{
  include: { Event: true }
}>
const newReportForm = ({series}: newReportFormProps) => {
  return (
    <div key={series.id}>{JSON.stringify(series)}</div>
  )
}

export default newReportForm