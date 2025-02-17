import WriterNavItem from "@/components/lead/posts/writer-nav-item";

const WriterNav = () => {
  return (
    <div className={"h-10 border rounded-md flex items-center justify-center text-sm font-medium p-1"}>
      <WriterNavItem text={"Все посты"} to={"/main/writer/m"}/>
      <WriterNavItem text={"Мои посты"} to={"/main/writer/my"}/>
      <WriterNavItem text={"Черновики"} to={"/main/writer/ch"}/>
    </div>
  );
};

export default WriterNav;