'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import type { DiscordMessage } from '@/lib/discord/announcements';
import { fetchAnnouncements } from '@/actions/announcements';

const validationSchema = Yup.object({
  channelId: Yup.string()
    .required('Channel ID is required')
    .matches(/^\d+$/, 'Channel ID must contain only numbers')
});

export default function AnnouncementList() {
  const [messages, setMessages] = useState<DiscordMessage[]>([]);
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      channelId: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setError(null);
        const announcements = await fetchAnnouncements(values.channelId);
        setMessages(announcements);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch announcements');
      }
    },
  });

  return (
    <div className="space-y-6">
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="channelId" className="block text-sm font-medium text-gray-700">
            Discord Channel ID
          </label>
          <input
            id="channelId"
            name="channelId"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.channelId}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {formik.touched.channelId && formik.errors.channelId && (
            <div className="mt-1 text-sm text-red-600">{formik.errors.channelId}</div>
          )}
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {formik.isSubmitting ? 'Loading...' : 'Fetch Announcements'}
        </button>
      </form>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">{error}</div>
        </div>
      )}

      {messages.length > 0 && (
        <div className="mt-8 space-y-6">
          <h2 className="text-xl font-semibold">Announcements</h2>
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="rounded-lg border p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{message.author.global_name}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(message.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="mt-2 whitespace-pre-wrap">{message.content}</p>
                {message.attachments.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {message.attachments.map((attachment) => (
                      <a
                        key={attachment.id}
                        href={attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-indigo-600 hover:text-indigo-500"
                      >
                        📎 {attachment.filename}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
