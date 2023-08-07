import { ProjectInterface } from "@/Common.types";
import Categories from "@/Components/Categories";
import LoadMore from "@/Components/LoadMore";
import ProjectCard from "@/Components/ProjectCard";
import { getAllProjects } from "@/lib/actions"


type ProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  },
}
type SearchParams = {
  category?: string | '';
  endcursor?: string | '';
}

type Props = {
  searchParams: SearchParams
}
const Home = async({ searchParams: { category, endcursor } }: Props) => {

  const data = await getAllProjects(category, endcursor) as ProjectSearch

  const projectsToDisplay =data?.projectSearch?.edges || [] ;
  if (projectsToDisplay.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        <Categories />

        <p className="no-result-text text-center">No projects found, go create some first.</p>
      </section>
    )
  }
  return (
    <section className="flex-start flex-col paddings mb-16">
        <Categories />
        <section className="projects-grid">
        {projectsToDisplay.map(({ node }: { node: ProjectInterface }) => (
          <ProjectCard
          key={`${node?.id}`}
          id={node?.id}
          image={node?.image}
          title={node?.title}
          name={node?.createdBy.name}
          avatarUrl={node?.createdBy.avatarUrl}
          userId={node?.createdBy.id}
          />
        ))}
      </section>
        <LoadMore
         startCursor={data?.projectSearch?.pageInfo?.startCursor} 
         endCursor={data?.projectSearch?.pageInfo?.endCursor} 
         hasPreviousPage={data?.projectSearch?.pageInfo?.hasPreviousPage} 
         hasNextPage={data?.projectSearch?.pageInfo.hasNextPage} />
    </section>
  )
}

export default Home