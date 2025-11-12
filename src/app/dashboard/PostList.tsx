'use client'

import { useState } from 'react'
import { createPost, updatePost, deletePost } from '../action/post'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Pencil, Trash2, Plus, X } from 'lucide-react'

type Post = {
  id: string
  title: string
  content: string
  author_id: string
  created_at: string
  profiles: { email: string; role: string }
}

export default function PostList({ 
  posts, 
  userRole, 
  userId 
}: { 
  posts: Post[]
  userRole: string
  userId: string
}) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      if (editingId) {
        await updatePost(editingId, title, content)
        setEditingId(null)
      } else {
        await createPost(title, content)
      }
      setTitle('')
      setContent('')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function handleEdit(post: Post) {
    setTitle(post.title)
    setContent(post.content || '')
    setEditingId(post.id)
    setError('')
  }

  function handleCancelEdit() {
    setEditingId(null)
    setTitle('')
    setContent('')
    setError('')
  }

  async function handleDelete() {
    if (!postToDelete) return
    
    setLoading(true)
    try {
      await deletePost(postToDelete)
      setDeleteDialogOpen(false)
      setPostToDelete(null)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function canEdit(post: Post) {
    return post.author_id === userId || ['admin', 'editor'].includes(userRole)
  }

  function canDelete(post: Post) {
    return post.author_id === userId || userRole === 'admin'
  }

  const getRoleBadgeVariant = (role: string) => {
    switch(role) {
      case 'admin': return 'default'
      case 'editor': return 'secondary'
      default: return 'outline'
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {editingId ? (
              <>
                <Pencil className="w-5 h-5" />
                Edit Post
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                Create New Post
              </>
            )}
          </CardTitle>
          <CardDescription>
            {editingId 
              ? 'Update the post details below' 
              : 'Share your thoughts with the community'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Write your post content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[120px]"
                disabled={loading}
              />
            </div>
            
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="flex gap-2">
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : editingId ? 'Update Post' : 'Create Post'}
              </Button>
              {editingId && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancelEdit}
                  disabled={loading}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">All Posts</h2>
        {posts.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              No posts yet. Be the first to create one!
            </CardContent>
          </Card>
        ) : (
          posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <span>{post.profiles.email}</span>
                      <Badge variant={getRoleBadgeVariant(post.profiles.role)} className="text-xs">
                        {post.profiles.role}
                      </Badge>
                      <span>•</span>
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              {post.content && (
                <CardContent>
                  <p className="text-muted-foreground whitespace-pre-wrap">{post.content}</p>
                </CardContent>
              )}
              
              {(canEdit(post) || canDelete(post)) && (
                <CardFooter className="flex gap-2 justify-end border-t pt-4">
                  {canEdit(post) && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(post)}
                      disabled={loading}
                    >
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  )}
                  {canDelete(post) && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        setPostToDelete(post.id)
                        setDeleteDialogOpen(true)
                      }}
                      disabled={loading}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  )}
                </CardFooter>
              )}
            </Card>
          ))
        )}
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the post.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}