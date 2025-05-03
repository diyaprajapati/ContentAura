import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "./ProfileForm";

export default function ProfileFormPage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Account</h3>
                <p className="text-sm text-muted-foreground">
                    Update your Profile here. Try to not repeat any detail.
                </p>
            </div>
            <Separator />
            <ProfileForm />
        </div>
    )
}
