function TaskItem({ description }) {
  return (
    <div className="bg-[#f2f1e7] border-2 border-[#8b735b] rounded-xl shadow-[4px_4px_0px_0px_#8b735b] p-4 hover:shadow-[6px_6px_0px_0px_#8b735b] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
      {/* <h3 className="text-lg font-bold text-[#4e5d3c] mb-2">🌲{title}</h3> */}
      <p className="text-sm text-[#5c5a4d]">{description}</p>
    </div>
  );
}

export default TaskItem;
