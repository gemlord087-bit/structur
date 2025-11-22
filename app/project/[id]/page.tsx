import { ProjectClient } from '@/components/project/project-client';
import { AppLayout } from '@/components/layout/app-layout';

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  return (
    <AppLayout>
      <ProjectClient projectId={id} />
    </AppLayout>
  );
}