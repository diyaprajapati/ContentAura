export default function Footer() {
    const items = [
        {
            title: "About Us",
            url: "/footer/aboutus"
        },
        {
            title: "Contact Us",
            url: "/footer/contactus"
        },
        {
            title: "Privacy Policy",
            url: "/footer/privacy"
        },
        {
            title: "Terms Of Service",
            url: "/footer/service"
        },
    ];

    return (
        <div className="mt-10 mb-5">
            <hr className="mb-5" />
            <div className="flex gap-5 items-center justify-center">
                {/* <img src="/c.png" width={20} /> */}
                <p className="text-gray-500 text-sm">© 2025 ContentAura</p>
                {items.map((item, index) => (
                    <div key={index}>
                        <a href={item.url} className="text-gray-500 hover:text-blue-500 hover:underline transition duration-300 text-sm">
                            {item.title}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
