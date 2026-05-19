import { Card, CardContent, CardHeader } from '@/components/ui/card';

function SkeletonCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
      </CardHeader>
      <CardContent>
        <div className="h-8 w-20 bg-slate-200 rounded animate-pulse" />
      </CardContent>
    </Card>
  );
}

function SkeletonChart() {
  return (
    <Card>
      <CardHeader>
        <div className="h-5 w-32 bg-slate-200 rounded animate-pulse" />
      </CardHeader>
      <CardContent>
        <div className="h-[300px] bg-slate-100 rounded animate-pulse" />
      </CardContent>
    </Card>
  );
}

export function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid md:grid-cols-2 gap-6">
        <SkeletonChart />
        <SkeletonChart />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <SkeletonChart />
        <SkeletonChart />
      </div>

      {/* Table Skeleton */}
      <Card>
        <CardHeader>
          <div className="h-5 w-32 bg-slate-200 rounded animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-slate-100 rounded animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
