function TaskItem({ description }) {
  return (
    <div className="bg-[#f2f1e7] border-2 border-[#8b735b] rounded-xl  p-2 mt-2 ">
      {/* <h3 className="text-lg font-bold text-[#4e5d3c] mb-2">🌲{title}</h3> */}
      <p className="text-sm text-[#5c5a4d]">{description}</p>
    </div>
  );
}

export default TaskItem;
