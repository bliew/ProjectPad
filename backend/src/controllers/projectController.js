import prisma from '../libs/prisma.js';

export const createProject = async (req, res) => {
  const { title, description } = req.body;

  try {
    const createdProject = await prisma.project.create({
      data: { title, description },
    });

    if (!title) {
      return res.status(400).json({
        mesasge: 'Title required',
      });
    }

    return res.status(201).json({
      message: 'Project sucessfully created',
      project: createdProject,
    });
  } catch (error) {
    console.error('Error creating project', error);
    return res.status(500).json({
      message: 'Internal server error while creating project',
    });
  }
};

export const getProject = async (req, res) => {
  const { id } = req.params;

  try {
    const existingProject = await prisma.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      return res.status(404).json({
        message: `Project with ${id} not found`,
      });
    }

    return res.status(200).json({
      existingProject,
    });
  } catch (error) {
    console.log('Error getting project', error);
    return res.status(500).json({
      message: 'Internal server error while getting project',
    });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany();

    return res.status(200).json({
      projects,
    });
  } catch (error) {
    console.log('Error getting projects', error);
    return res
      .status(500)
      .json({ message: 'Internal server error getting projects' });
  }
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

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
      data: { title, description },
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
