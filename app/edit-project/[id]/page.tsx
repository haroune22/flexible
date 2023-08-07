
import { ProjectInterface } from "@/Common.types"
import Modal from "@/Components/Modal"
import ProjectForm from "@/Components/ProjectForm"
import { getProjectDetails } from "@/lib/actions"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"

const EditProject = async({params:{id}}:{params:{id:string}}) => {
  const session =  await getCurrentUser()
  if(!session?.user) redirect('/')
  const result = await getProjectDetails(id) as {project?: ProjectInterface}

return (
  <Modal>
      <h3 className="modal-head-text">Edit Project</h3>
      <ProjectForm type='edit' session={session} project={result?.project}/>
  </Modal>
)
}

export default EditProject