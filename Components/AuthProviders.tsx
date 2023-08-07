"use client"

import { useState,useEffect } from "react"
import {getProviders,signIn} from 'next-auth/react'
import Button from "./Button"

type Provider ={
  id:String,
  name:String,
  type:String,
  signinUrl:String,
  callbackUrl:String,
  signinUrlParams?:Record<string, string> | null,
}
type Providers=Record<string, Provider>

const AuthProviders = () => {
  const [providers, setProviders] = useState<Providers | null>(null)

  useEffect(()=>{
    const fetchProviders =async ()=>{
      const res = await getProviders()
      setProviders(res)
    }
    fetchProviders()
  },[])

  if(providers){
    return (
      <div>
         {Object.values(providers).map((provider: Provider, i) => (
                    <Button key={i} title='Sign In' handleClick={() => signIn(provider?.id)} />
                ))}
      </div>
    )
  }
}

export default AuthProviders