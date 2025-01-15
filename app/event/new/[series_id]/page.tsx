import React from 'react';
import NewSeriesForm from "@/app/series/new/new-series-form";
import NewEventForm from "@/app/event/new/[series_id]/newEventForm";

type newEventProps = {
  params: Promise<{
    series_id: string
  }>
}

const Page = async ({params}: newEventProps) => {
  return (
    <div className={"mx-auto w-screen max-w-xl"}>
      <h1 className={"text-2xl"}>New Event</h1>
      <NewEventForm series_id={(await params).series_id}/>
    </div>
  )
}

export default Page