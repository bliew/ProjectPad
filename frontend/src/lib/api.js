const API_Base = 'https://projectpad-vnxa.onrender.com';

export async function getProjects(token) {
  const res = await fetch(`${API_Base}/projects`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch projects');
  }
  return await res.json();
}

export async function createProject(data, token) {
  const res = await fetch(`${API_Base}/projects`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error('Failed to create proejct ');
  }
  return await res.json();
}

export async function updateProject(data, token) {
  const res = await fetch;
}
