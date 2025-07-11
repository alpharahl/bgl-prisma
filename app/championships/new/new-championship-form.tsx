'use client';

import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { createChampionship } from './actions';

const validationSchema = Yup.object({
  name: Yup.string().required('Championship name is required'),
  order: Yup.number()
    .required('Display order is required')
    .min(0, 'Order must be 0 or greater'),
  logo: Yup.string().required('Logo URL is required'),
  leagueId: Yup.number().required('League is required'),
});

interface FormValues {
  name: string;
  order: number;
  logo: string;
  leagueId: number;
}

export default function NewChampionshipForm() {
  const router = useRouter();
  
  const initialValues: FormValues = {
    name: '',
    order: 10,
    logo: '',
    leagueId: 1, // Default league ID, you might want to make this dynamic
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      await createChampionship(values);
      router.push('/championships');
    } catch (error) {
      console.error('Error creating championship:', error);
    }
  };

  return (
    <div className="bg-primary/70 border-2 border-primary rounded-lg p-6 text-white">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Championship Name
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 bg-gray-800 rounded border border-gray-700 text-white"
              />
              {errors.name && touched.name && (
                <div className="text-red-500 text-sm mt-1">{errors.name}</div>
              )}
            </div>
            
            <div>
              <label htmlFor="order" className="block text-sm font-medium mb-1">
                Display Order
              </label>
              <Field
                type="number"
                id="order"
                name="order"
                className="w-full px-3 py-2 bg-gray-800 rounded border border-gray-700 text-white"
              />
              {errors.order && touched.order && (
                <div className="text-red-500 text-sm mt-1">{errors.order}</div>
              )}
            </div>

            <div>
              <label htmlFor="logo" className="block text-sm font-medium mb-1">
                Logo URL
              </label>
              <Field
                type="text"
                id="logo"
                name="logo"
                className="w-full px-3 py-2 bg-gray-800 rounded border border-gray-700 text-white"
              />
              {errors.logo && touched.logo && (
                <div className="text-red-500 text-sm mt-1">{errors.logo}</div>
              )}
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition disabled:opacity-50"
              >
                {isSubmitting ? 'Creating...' : 'Create Championship'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
