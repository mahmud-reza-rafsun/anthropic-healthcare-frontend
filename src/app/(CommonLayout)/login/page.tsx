import LoginForm from "@/components/modules/authentication/login-form";
export const dynamic = "force-dynamic";

export default function Login() {
    return (
        <div className="py-10 lg:py-16">
            <LoginForm />
        </div>
    )
}
