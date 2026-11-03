import React from 'react'
import { GetServerSideProps } from 'next'

const LegacyTicketList = (): JSX.Element => <p>Redirection vers la gestion des billets…</p>

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: { destination: '/gestion-billets', permanent: false },
})

export default LegacyTicketList
