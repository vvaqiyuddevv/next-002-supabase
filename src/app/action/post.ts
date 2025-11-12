'use server'

import { createServerSupabaseClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createPost(title: string, content: string) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('posts')
    .insert({ title, content, author_id: user.id })

  if (error) throw error
  revalidatePath('/dashboard')
}

export async function updatePost(id: string, title: string, content: string) {
  const supabase = await createServerSupabaseClient()
  
  const { error } = await supabase
    .from('posts')
    .update({ title, content, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) throw error
  revalidatePath('/dashboard')
}

export async function deletePost(id: string) {
  const supabase = await createServerSupabaseClient()
  
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id)

  if (error) throw error
  revalidatePath('/dashboard')
}

export async function getPosts() {
  const supabase = await createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles:author_id (email, role)
    `)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}