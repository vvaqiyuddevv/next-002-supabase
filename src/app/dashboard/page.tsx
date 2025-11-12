import { createServerSupabaseClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getPosts } from '../action/post'
import PostList from './PostList'
import { signOut } from '../action/auth'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LogOut } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const posts = await getPosts()

  const getRoleBadgeVariant = (role: string) => {
    switch(role) {
      case 'admin': return 'default'
      case 'editor': return 'secondary'
      default: return 'outline'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold">Dashboard</h1>
              <Badge variant={getRoleBadgeVariant(profile?.role || 'user')}>
                {profile?.role}
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:block">
                {profile?.email}
              </span>
              <form action={signOut}>
                <Button variant="outline" size="sm">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </form>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <PostList posts={posts} userRole={profile?.role || 'user'} userId={user.id} />
      </div>
    </div>
  )
}