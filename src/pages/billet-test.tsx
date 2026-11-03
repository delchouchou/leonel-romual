import React from 'react'
import { GetServerSideProps } from 'next'

const LegacyGuestTicket = (): JSX.Element => <p>Redirection vers le billet nominatif…</p>

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const code = typeof query.code === 'string' ? query.code : ''
  return {
    redirect: {
      destination: code ? `/billet/${encodeURIComponent(code)}` : '/mon-billet',
      permanent: false,
    },
  }
}

export default LegacyGuestTicket
