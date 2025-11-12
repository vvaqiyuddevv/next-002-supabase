import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Edit, User } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Next.js + Supabase CRUD</h1>
          <p className="text-xl text-muted-foreground mb-8">
            With Role-Based Access Control
          </p>
          <Link href="/login">
            <Button size="lg">Get Started</Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <User className="w-8 h-8 mb-2 text-blue-600" />
              <CardTitle>User Role</CardTitle>
              <CardDescription>Basic access level</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Create posts</li>
                <li>• Edit own posts</li>
                <li>• Delete own posts</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Edit className="w-8 h-8 mb-2 text-green-600" />
              <CardTitle>Editor Role</CardTitle>
              <CardDescription>Enhanced permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• All user permissions</li>
                <li>• Edit any post</li>
                <li>• Content moderation</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="w-8 h-8 mb-2 text-red-600" />
              <CardTitle>Admin Role</CardTitle>
              <CardDescription>Full control</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• All editor permissions</li>
                <li>• Delete any post</li>
                <li>• Complete management</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}