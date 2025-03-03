import { Separator } from "@/components/ui/separator";
import { PasswordForm } from "./PasswordForm";
import Footer from "@/pages/Footer/Footer";

export default function SettingsPasswordPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your password here. Don't use used password again.
        </p>
      </div>
      <Separator />
      <PasswordForm />
      <Footer />
    </div>
  )
}