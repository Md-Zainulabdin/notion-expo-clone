export interface User {
  id: string // Changed from number to string for Clerk user IDs
  name: string
  email: string
  created_at: string
  updated_at: string
}

export interface NotionFile {
  id: number
  cover_photo: string
  icon: string
  title: string
  description: string
  content: string
  type: string
  author_id: string // Changed from number to string for Clerk user IDs
  parent_file_id: number | null
  order_index: number
  created_at: string
  updated_at: string
}

export type FileType = 'document' | 'note' | 'list' | 'template'

export interface FileTypeOption {
  label: string
  value: FileType
  icon: string
}