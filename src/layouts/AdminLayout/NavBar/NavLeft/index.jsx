import React, { useEffect, useState } from 'react';
import { Dropdown, ListGroup } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

import BaseURL from 'utils/authAxios';
import useWindowSize from '../../../../hooks/useWindowSize';
import NavSearch from './NavSearch';
import { AuthContext } from 'contexts/AuthContext';

const NavLeft = () => {
  const windowSize = useWindowSize();
  const { setProject } = React.useContext(AuthContext);

  let navItemClass = ['nav-item'];
  if (windowSize.width <= 575) {
    navItemClass = [...navItemClass, 'd-none'];
  }
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('Select a Project');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await BaseURL.get('api/projects');
        if (response.data.data) {
          setProjects(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectSelect = (projectName, projectId) => {
    setSelectedProject(projectName); // Set the project name for display
    setProject(projectId); // Store the project ID for backend usage or context
  };

  return (
    <React.Fragment>
      <ListGroup as="ul" bsPrefix=" " className="navbar-nav mr-auto">
        <ListGroup.Item as="li" bsPrefix=" " className={navItemClass.join(' ')}>
          <Dropdown align={'start'}>
            <Dropdown.Toggle variant={'link'} id="dropdown-basic" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
              {selectedProject}
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
              <Dropdown.Item disabled>Select Project</Dropdown.Item>
              {projects.map((project) => (
                <Dropdown.Item
                  key={project.project_id}
                  onClick={() => handleProjectSelect(project.project_name, project.project_id)} // Pass both project name and ID
                >
                  {project.project_name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </ListGroup.Item>
        <ListGroup.Item as="li" bsPrefix=" " className="nav-item">
          <NavSearch windowWidth={windowSize.width} />
        </ListGroup.Item>
      </ListGroup>
    </React.Fragment>
  );
};

export default NavLeft;
