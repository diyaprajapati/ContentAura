export default function PublicFooter() {
    const items = [
        {
            title: "About Us",
            url: "/public/about"
        },
        {
            title: "Contact Us",
            url: "/public/contact"
        },
        {
            title: "Privacy Policy",
            url: "/public/privacy"
        },
        {
            title: "Terms Of Service",
            url: "/public/terms"
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