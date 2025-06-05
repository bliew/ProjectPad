import prisma from '../libs/prisma.js';

export const createProject = async (req, res) => {
  const userId = req.user.id;
  const { title, description, tasks } = req.body;

  try {
    const createdProject = await prisma.project.create({
      data: {
        title,
        description,
        userId,
        tasks: {
          create: tasks,
        },
      },
      include: { tasks: true },
    });

    if (!title) {
      return res.status(400).json({
        mesasge: 'Title required',
      });
    }

    return res.status(201).json(createdProject);
  } catch (error) {
    console.error('Error creating project', error);
    return res.status(500).json({
      message: 'Internal server error while creating project',
    });
  }
};

export const getProject = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    const existingProject = await prisma.project.findUnique({
      where: { id, userId },
      include: {
        tasks: true,
      },
    });

    if (!existingProject) {
      return res.status(404).json({
        message: `Project with ${id} not found`,
      });
    }

    return res.status(200).json(existingProject);
  } catch (error) {
    console.log('Error getting project', error);
    return res.status(500).json({
      message: 'Internal server error while getting project',
    });
  }
};

export const getProjects = async (req, res) => {
  const userId = req.user.id;
  try {
    const projects = await prisma.project.findMany({
      where: { userId },
      include: {
        tasks: true,
      },
    });

    return res.status(200).json(projects);
  } catch (error) {
    console.log('Error getting projects', error);
    return res
      .status(500)
      .json({ message: 'Internal server error getting projects' });
  }
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, description, tasks } = req.body;

  if (!id) {
    return res.status(400).json({
      message: 'Project ID required',
    });
  }
  try {
    const existingProject = await prisma.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      return res.status(404).json({
        message: `Project with ID ${id} not found`,
      });
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        title,
        description,
        tasks: {
          deleteMany: {},
          create: tasks.map((task) => ({
            description: task.description,
          })),
        },
      },
      include: {
        tasks: true,
      },
    });

    return res.status(200).json({
      message: 'Project successfully updated',
      project: updatedProject,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal server error while updating project',
    });
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: 'Project ID required',
    });
  }
  try {
    const existingProject = await prisma.project.findUnique({
      where: {
        id,
      },
    });

    if (!existingProject) {
      return res.status(404).json({
        message: `Project with ID ${id} not found`,
      });
    }

    await prisma.project.delete({
      where: {
        id,
      },
    });

    return res
      .status(200)
      .json({ message: `Project ${id} deleted successfully` });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Internal server error while deleting project' });
  }
};
