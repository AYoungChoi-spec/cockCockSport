const MobileMenu = () => {
    const menus = ['Racket', 'T-shirt', 'Outer', 'Pants', 'Bag', 'Etc.'];

    return (
        <nav className="px-6 pb-4 md:hidden">
            <ul className="space-y-3 text-sm font-medium text-gray-700">
                {menus.map((item) => {
                    const path = `/product/${item.toLowerCase().replace(/\.+$/, '').replace(/\s+/g, '-')}`;

                    return (
                        <li key={item}>
                            <a href={path} className="block hover:text-black">
                                {item}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default MobileMenu;
