export type WeddingTicket = {
  id: string
  guest_name: string
  party_size: number
  token: string
  is_demo: boolean
  checked_in_at: string | null
  checked_in_by: string | null
  created_at: string
}
