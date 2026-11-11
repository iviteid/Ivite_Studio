import Invitation from '@/components/Invitation';

const weddingSchema = {
  '@context': 'https://schema.org',
  '@type': 'WeddingEvent',
  name: 'Hana & Ren Wedding Celebration',
  startDate: '2027-04-18T15:00:00+09:00',
  endDate: '2027-04-18T23:00:00+09:00',
  eventStatus: 'https://schema.org/EventScheduled',
  location: {
    '@type': 'Place',
    name: 'Kyoto, Japan',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kyoto',
      addressCountry: 'JP'
    }
  },
  organizer: {
    '@type': 'Person',
    name: 'Hana Nakamura'
  },
  description: 'A wedding celebration for Hana and Ren in Kyoto, Japan.'
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(weddingSchema) }}
      />
      <Invitation connected={Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.INVITATION_TOKEN)} />
    </>
  );
}
