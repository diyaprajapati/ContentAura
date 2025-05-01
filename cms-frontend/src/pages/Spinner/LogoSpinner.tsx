import PulseLoader from "./PulseLoader";

export default function LogoSpinner() {
    return (
        <div className="flex flex-col items-center justify-center py-10 bg-transparent h-full">
            <PulseLoader size="lg" color="brand" className="mb-4" />
        </div>
    )
}
