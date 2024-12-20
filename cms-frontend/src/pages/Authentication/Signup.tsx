import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Signup() {
  return (
    <div className='mt-3'>
        {/* made card for login and signup */}
    <Card className='p-2'>
        <CardContent className='space-y-5'>
            <div className='space-y-1'>
                {/* email */}
                <Label>Email</Label>
                <Input type='email' placeholder='Email'  className='hover:drop-shadow-sm hover:shadow-violet-800 hover:transition-all ease-in-out focus:drop-shadow-sm focus:shadow-violet-800'/>
            </div>
            {/* password */}
            <div className='space-y-1'>
                <Label>Password</Label>
                <Input type='password' placeholder='password' className='hover:drop-shadow-sm hover:shadow-violet-800 hover:transition-all ease-in-out focus:drop-shadow-sm focus:shadow-violet-800'/>
            </div>
            {/* confirm pass */}
            <div className='space-y-1'>
                <Label>Confirm Password</Label>
                <Input type='password' placeholder='password' className='hover:drop-shadow-sm hover:shadow-violet-800 hover:transition-all ease-in-out focus:drop-shadow-sm focus:shadow-violet-800'/>
            </div>
            {/* button */}
            <div className='w-full'>
                <Button className='w-full'>Signup</Button>
            </div>
        </CardContent>
    </Card>
    </div>
  )
}
