import prisma from '../libs/prisma.js';

export const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    return res.status(200).json(tasks);
  } catch (error) {
    console.log('Error getting tasks', error);
    return res.status(500).json({
      message: 'Internal server error getting tasks ',
    });
  }
};

export const getTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      return res.status(404).json({ message: `Task with ${id} not found` });
    }
    res.status(200).json(task);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal server error while getting Task' });
  }
};
