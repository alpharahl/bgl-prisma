'use client'

import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { createChampionship, deleteChampionship, updateChampionship } from '@/actions/championships';
import { fetchAnnouncements } from '@/actions/announcements';

const ChampionshipSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    discordOverviewChannel: Yup.string().required('Required'),
    order: Yup.number().required('Required').min(0, 'Must be a positive number'),
});

type Championship = {
    id: number;
    name: string;
    discordOverviewChannel: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

export default function ChampionshipList({ championships: initialChampionships }: { championships: Championship[] }) {
    const [championships, setChampionships] = useState(initialChampionships);
    const [editingId, setEditingId] = useState<number | null>(null);

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this championship?')) {
            await deleteChampionship(id);
            setChampionships(championships.filter(c => c.id !== id));
        }
    };

    const handleUpdate = async (id: number, values: { name: string; discordOverviewChannel: string; order: number }) => {
        const updated = await updateChampionship(id, values);
        setChampionships(championships.map(c => c.id === id ? { ...c, ...updated } : c));
        setEditingId(null);
    };

    const handleCreate = async (values: { name: string; discordOverviewChannel: string; order: number }, { resetForm }: { resetForm: () => void }) => {
        const newChampionship = await createChampionship(values.name, values.discordOverviewChannel, values.order);
        setChampionships([newChampionship, ...championships]);
        resetForm();
    };

    return (
        <div className="space-y-6">
            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                <div className="px-4 py-6 sm:p-8">
                    <Formik
                        initialValues={{ name: '', discordOverviewChannel: '', order: 10 }}
                        validationSchema={ChampionshipSchema}
                        onSubmit={handleCreate}
                    >
                        {({ errors, touched }) => (
                            <Form className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Championship Name
                                    </label>
                                    <Field
                                        name="name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.name && touched.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                                </div>

                                <div>
                                    <label htmlFor="discordOverviewChannel" className="block text-sm font-medium leading-6 text-gray-900">
                                        Discord Overview Channel ID
                                    </label>
                                    <Field
                                        name="discordOverviewChannel"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.discordOverviewChannel && touched.discordOverviewChannel && (
                                        <div className="text-red-500 text-sm">{errors.discordOverviewChannel}</div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="order" className="block text-sm font-medium leading-6 text-gray-900">
                                        Display Order
                                    </label>
                                    <Field
                                        type="number"
                                        name="order"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.order && touched.order && <div className="text-red-500 text-sm">{errors.order}</div>}
                                </div>

                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Add Championship
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>

            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                <ul className="divide-y divide-gray-100">
                    {championships.map((championship) => (
                        <li key={championship.id} className="px-4 py-5 sm:p-6">
                            {editingId === championship.id ? (
                                <Formik
                                    initialValues={{
                                        name: championship.name,
                                        discordOverviewChannel: championship.discordOverviewChannel,
                                        order: championship.order,
                                    }}
                                    validationSchema={ChampionshipSchema}
                                    onSubmit={(values) => handleUpdate(championship.id, values)}
                                >
                                    {({ errors, touched }) => (
                                        <Form className="space-y-4">
                                            <div>
                                                <Field
                                                    name="name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {errors.name && touched.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                                            </div>

                                            <div>
                                                <Field
                                                    name="discordOverviewChannel"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {errors.discordOverviewChannel && touched.discordOverviewChannel && (
                                                    <div className="text-red-500 text-sm">{errors.discordOverviewChannel}</div>
                                                )}
                                            </div>

                                            <div>
                                                <Field
                                                    type="number"
                                                    name="order"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {errors.order && touched.order && <div className="text-red-500 text-sm">{errors.order}</div>}
                                            </div>

                                            <div className="flex gap-2">
                                                <button
                                                    type="submit"
                                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setEditingId(null)}
                                                    className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            ) : (
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-base font-semibold leading-7 text-gray-900">{championship.name}</h3>
                                        <p className="mt-1 text-sm leading-6 text-gray-500">Channel ID: {championship.discordOverviewChannel}</p>
                                        <p className="mt-1 text-sm leading-6 text-gray-500">Display Order: {championship.order}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={async () => {
                                                const res = await fetchAnnouncements(championship.discordOverviewChannel, championship.id);
                                                console.log("results:", res)
                                            }}
                                        >Fetch Announcements
                                        </button>
                                        <button
                                            onClick={() => setEditingId(championship.id)}
                                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(championship.id)}
                                            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
