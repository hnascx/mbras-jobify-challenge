"use client"

import { Card } from "@/components/ui/card"

export function JobSkeleton() {
  return (
    <Card className="p-6 animate-pulse">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="space-y-2 flex-1">
          <div className="h-8 bg-muted rounded-md w-3/4"></div>
          <div className="h-5 bg-muted rounded-md w-1/2"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-10 w-10 bg-muted rounded-md"></div>
          <div className="h-10 w-10 bg-muted rounded-md"></div>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-6">
        <div className="h-6 w-24 bg-muted rounded-full"></div>
        <div className="h-6 w-32 bg-muted rounded-full"></div>
        <div className="h-6 w-20 bg-muted rounded-full"></div>
      </div>

      {/* Company Logo */}
      <div className="flex justify-center py-8 mb-6">
        <div className="h-16 w-32 bg-muted rounded-md"></div>
      </div>

      {/* Description */}
      <div className="space-y-3 mb-6">
        <div className="h-4 bg-muted rounded w-full"></div>
        <div className="h-4 bg-muted rounded w-full"></div>
        <div className="h-4 bg-muted rounded w-5/6"></div>
        <div className="h-4 bg-muted rounded w-full"></div>
        <div className="h-4 bg-muted rounded w-4/5"></div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-4">
        <div className="h-10 w-24 bg-muted rounded-md"></div>
        <div className="h-10 w-28 bg-muted rounded-md"></div>
      </div>
    </Card>
  )
}
