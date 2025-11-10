import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';

export default function ProjectNotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Project Not Found
          </h1>
          <p className="text-muted-foreground">
            The project you&apos;re looking for doesn&apos;t exist or may have
            been moved.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>

          <div className="text-sm text-muted-foreground">
            <p>Or explore these featured projects:</p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              href="/projects/blogsage"
              className="px-3 py-1 text-sm border border-border rounded-full hover:bg-muted transition-colors"
            >
              BLOGSAGE
            </Link>
            <Link
              href="/projects/sportozen"
              className="px-3 py-1 text-sm border border-border rounded-full hover:bg-muted transition-colors"
            >
              Sportozen
            </Link>
            <Link
              href="/projects/smart-glasses"
              className="px-3 py-1 text-sm border border-border rounded-full hover:bg-muted transition-colors"
            >
              Smart Glasses
            </Link>
            <Link
              href="/projects/devops-cicd"
              className="px-3 py-1 text-sm border border-border rounded-full hover:bg-muted transition-colors"
            >
              DevOps Pipeline
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
