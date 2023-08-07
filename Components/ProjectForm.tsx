'use client'
import { FormState, ProjectInterface, SessionInterface } from '@/Common.types'
import Image from 'next/image'
import React, { ChangeEvent, useState } from 'react'
import FormField from './FormField'
import CustomMenu from './CustomMenu'
import { categoryFilters } from '@/constant'
import Button from './Button'
import { createNewProject, fetchToken, updateProject } from '@/lib/actions'
import { useRouter } from 'next/navigation'

type Props ={
    type:string,
    session:SessionInterface,
    project?:ProjectInterface
}

const ProjectForm = ({type,session,project}:Props) => {

    const router = useRouter()
    const [submitting, setSubmitting] = useState<boolean>(false);
      const [form, setForm] = useState<FormState>({
        title: project?.title || "",
        description: project?.description || "",
        image: project?.image || "",
        liveSiteUrl: project?.liveSiteUrl || "",
        githubUrl: project?.githubUrl || "",
        category: project?.category || ""
    })

const handleFormSubmit = async (e:React.FormEvent)=>{
    e.preventDefault();

    setSubmitting(true)
    const {token} = await fetchToken()
    try {
        if(type === 'create'){
            await createNewProject(form,session?.user?.id,token)
            router.push('/')
        }
        if (type === "edit") {
            await updateProject(form, project?.id as string, token)
            router.push("/")
        }
    } catch (error) {
        alert(`Failed to ${type === "create" ? "create" : "edit"} a project. Try again!`);
        console.log(error)
    }finally{
        setSubmitting(false)
    }
}             

const handleChangeImage =(e:ChangeEvent<HTMLInputElement>)=>{
    e.preventDefault();

    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.includes('image')) {
        alert('Please upload an image!');

        return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const result = reader.result as string;

        handleStateChange("image", result)
    };
}

const handleStateChange =(fieldName: keyof FormState,value:string)=>{
    setForm((prevForm) => ({ ...prevForm, [fieldName] : value }));
}


  return (
    <form className='flexStart form' onSubmit={handleFormSubmit}>
        <div className="flexStart form_image-container">
            <label htmlFor="poster" className='flexCenter form_image-label'>
            {!form.image && 'Choose a poster for your project'}
            </label>
            <input id="image"
                    type="file"
                    accept='image/*'
                    required={type === "create" ? true : false}
                    className="form_image-input"
                    onChange={(e) => handleChangeImage(e)}/>
            {form.image && <Image src={form.image} className='sm:p-10 object-contain z-20' alt='Project poster' fill/>}
        </div>
        <FormField 
                title='Title' 
                state={form.title} 
                placeholder='Flexible' 
                setState={(value)=>handleStateChange('title',value)}
        />
        <FormField 
                title='Description' 
                state={form.description} 
                placeholder='Showcase and discover remarkable developer projects' 
                setState={(value)=>handleStateChange('description',value)}
        />
        <FormField 
                title='Website URL' 
                type='url' 
                state={form.liveSiteUrl} 
                placeholder='https://harounewebdev.com' 
                setState={(value)=>handleStateChange('liveSiteUrl',value)}
        />
        <FormField
                type="url"
                title="GitHub URL"
                state={form.githubUrl}
                placeholder="https://github.com/haroune22"
                setState={(value) => handleStateChange('githubUrl', value)}
            />
             <CustomMenu
                title="Category"
                state={form.category}
                filters={categoryFilters}
                setState={(value) => handleStateChange('category', value)}
            />
               <div className="flexStart w-full">
                <Button
                    title={submitting ? `${type === "create" ? "Creating" : "Editing"}` : `${type === "create" ? "Create" : "Edit"}`}
                    type="submit"
                    leftIcon={submitting ? "" : "/plus.svg"}
                    submitting={submitting}
                />
            </div>
    </form>
  )
}

export default ProjectForm