function Sidebar() {

  return (

    <aside className="w-64 bg-white shadow-md min-h-screen p-5">

      <h2 className="text-2xl font-bold mb-6">

        Communities

      </h2>

      <ul className="space-y-4">

        <li className="hover:text-blue-600 cursor-pointer">
          Java
        </li>

        <li className="hover:text-blue-600 cursor-pointer">
          Spring Boot
        </li>

        <li className="hover:text-blue-600 cursor-pointer">
          React JS
        </li>

        <li className="hover:text-blue-600 cursor-pointer">
          PostgreSQL
        </li>

      </ul>

    </aside>

  );
}

export default Sidebar;