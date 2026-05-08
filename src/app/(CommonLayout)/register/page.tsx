import RegisterForm from '@/components/modules/authentication/register-form'
export const dynamic = "force-dynamic";

export default function Register() {
    return (
        <div className='py-12 lg:py-24'>
            <RegisterForm />
        </div>
    )
}
