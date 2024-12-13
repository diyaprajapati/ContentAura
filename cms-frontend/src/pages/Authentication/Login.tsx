import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

export default function Login() {
  return (
    <div className='mt-3'>
    <Card className='p-2'>
        <CardContent className='space-y-5'>
            <div className='space-y-1'>
                <Label>Email</Label>
                <Input type='email' placeholder='Email'  className='hover:drop-shadow-sm hover:shadow-violet-800 hover:transition-all ease-in-out focus:drop-shadow-sm focus:shadow-violet-800'/>
            </div>
            <div className='space-y-1'>
                <Label>Password</Label>
                <Input type='password' placeholder='password' className='hover:drop-shadow-sm hover:shadow-violet-800 hover:transition-all ease-in-out focus:drop-shadow-sm focus:shadow-violet-800'/>
            </div>
            <div className='w-full'>
                <Button className='w-full'>Login</Button>
            </div>
        </CardContent>
    </Card>
    </div>
  )
}
