import prisma from '../libs/prisma.js';

export const createProject = async (req, res) => {
  const { title, description } = req.body;

  try {
    const createdProject = prisma.project.create({
      data: { title, description },
    });

    if (createdProject) {
      return res
        .status(200)
        .json({ message: 'Project Created', createdProject });
    }

    return res.status(200).json({ message: 'Project Created', createdProject });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Internal server error:Error creating project in database',
    });
  }
};
