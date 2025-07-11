'use client';

import React from 'react';
import { Formik, Form, Field, FieldArray, FormikErrors } from 'formik';
import { Prisma } from "@prisma/client";
import { updateChampionship, updateSection, deleteSection, addSection } from './actions';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type SeriesWithCarsAndSections = Prisma.SeriesGetPayload<{
  include: { cars: true, sections: true }
}>;

interface ChampionshipEditFormProps {
  championship: SeriesWithCarsAndSections;
}

interface FormValues {
  name: string;
  order: number;
  sections: {
    id: number;
    title: string;
    content: string[];
  }[];
}

const validationSchema = Yup.object({
  name: Yup.string().required('Championship name is required'),
  order: Yup.number().required('Display order is required'),
  sections: Yup.array().of(
    Yup.object({
      title: Yup.string().required('Section title is required'),
      content: Yup.array().of(
        Yup.string().required('Content item cannot be empty')
      ).min(1, 'At least one content item is required'),
    })
  ),
});

export default function ChampionshipEditForm({ championship }: ChampionshipEditFormProps) {
  const router = useRouter();
  
  const initialValues: FormValues = {
    name: championship.name,
    order: championship.order,
    sections: championship.sections.map(section => ({
      id: section.id,
      title: section.title,
      content: section.content,
    })),
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      // Update championship details
      await updateChampionship({
        id: championship.id,
        name: values.name,
        order: values.order,
      });

      // Update all sections
      for (const section of values.sections) {
        await updateSection({
          id: section.id,
          title: section.title,
          content: section.content,
        });
      }

      router.push('/championships');
    } catch (error) {
      console.error('Error updating championship:', error);
    }
  };

  const handleAddSection = async (arrayHelpers: any) => {
    try {
      const newSection = await addSection({
        seriesId: championship.id,
        title: "New Section",
        content: ["New content item"]
      });
      arrayHelpers.push({
        id: newSection.id,
        title: newSection.title,
        content: newSection.content,
      });
    } catch (error) {
      console.error('Error adding section:', error);
    }
  };

  const handleDeleteSection = async (arrayHelpers: any, index: number, sectionId: number) => {
    try {
      await deleteSection({ id: sectionId });
      arrayHelpers.remove(index);
    } catch (error) {
      console.error('Error deleting section:', error);
    }
  };

  return (
    <div className="bg-primary/70 border-2 border-primary rounded-lg p-6 text-white">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }: { 
          errors: FormikErrors<FormValues>; 
          touched: any; 
          isSubmitting: boolean; 
        }) => (
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

            <FieldArray name="sections">
              {(arrayHelpers) => (
                <div className="mt-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-orange-300">Sections</h3>
                    <button
                      type="button"
                      onClick={() => handleAddSection(arrayHelpers)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                    >
                      Add Section
                    </button>
                  </div>

                  <div className="space-y-6">
                    {initialValues.sections.map((section, index) => (
                      <div key={section.id} className="border border-gray-700 rounded p-4">
                        <Field
                          name={`sections.${index}.title`}
                          type="text"
                          className="w-full px-3 py-2 bg-gray-800 rounded border border-gray-700 text-white mb-3"
                        />
                        {errors.sections?.[index] && typeof errors.sections[index] !== 'string' && 
                         errors.sections[index].title && touched.sections?.[index]?.title && (
                          <div className="text-red-500 text-sm mt-1">
                            {typeof errors.sections[index] !== 'string' && errors.sections[index].title}
                          </div>
                        )}
                        
                        <FieldArray name={`sections.${index}.content`}>
                          {(contentHelpers) => (
                            <div className="space-y-2">
                              {section.content.map((_, contentIndex) => (
                                <div key={contentIndex} className="flex gap-2">
                                  <Field
                                    name={`sections.${index}.content.${contentIndex}`}
                                    type="text"
                                    className="flex-1 px-3 py-2 bg-gray-800 rounded border border-gray-700 text-white"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => contentHelpers.remove(contentIndex)}
                                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                  >
                                    ×
                                  </button>
                                </div>
                              ))}
                              <button
                                type="button"
                                onClick={() => contentHelpers.push("")}
                                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
                              >
                                Add Content Item
                              </button>
                            </div>
                          )}
                        </FieldArray>
                        
                        <button
                          type="button"
                          onClick={() => handleDeleteSection(arrayHelpers, index, section.id)}
                          className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                          Delete Section
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </FieldArray>

            <div className="flex justify-end gap-3">
              <Link
                href="/championships"
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
