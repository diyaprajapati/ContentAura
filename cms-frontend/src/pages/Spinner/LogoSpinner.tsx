import './LogoSpinner.css';

const LogoSpinner = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-transperant z-50 fixed top-0 left-0 w-full">
            <img src='./logo.png' alt="ContentAura Logo" className="w-24 h-24 animate-spin-slow" />
        </div>
    );
};

export default LogoSpinner;
