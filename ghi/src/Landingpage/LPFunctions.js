import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import React, { useState, useEffect, useRef } from "react";

function Card({ project }) {
  return (
    <div className="card bg-white w-[300px] h-[450px] m-2 rounded-lg shadow-lg flex-col">
      <div className="top flex-shrink-0">
        <img
          className="w-[300px] h-[250px] object-fill  p-2"
          src={
            project?.project_picture ||
            "https://live.staticflickr.com/65535/53156011725_dd6c54efab_w.jpg"
          }
          alt={project?.project_name || "Project Name Cannot Be Found"}
        />
      </div>
      <div className="bottom flex flex-col justify-center p-2 space-y-2 overflow-hidden">
        <div className="title font-semibold">
          {project?.project_name || "Default Name"}
        </div>
        <div className="category text-sm font-light m-1 overflow-hidden">
          {project?.goal || "No Project Goal Found"}
        </div>
      </div>
    </div>
  );
}

Card.defaultProps = {
  project: {
    project_picture:
      "https://live.staticflickr.com/65535/53156011725_dd6c54efab_w.jpg",
    project_name: "Project Name Cannot Be Found",
    goal: "No Project Goal Found",
  },
};

function Carousel({ projects }) {
  const contentRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    const currentRef = contentRef.current
    const handleScroll = () => {
      if (currentRef) {
        const maxScrollLeft =
          currentRef.scrollWidth - currentRef.clientWidth;
        setShowLeftArrow(currentRef.scrollLeft > 0);
        setShowRightArrow(currentRef.scrollLeft < maxScrollLeft);
      }
    };

    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
      handleScroll(); // Call once to set the initial states
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scrollLeft = () => {
    if (contentRef.current) {
      contentRef.current.scrollLeft -= 300;
    }
  };

  const scrollRight = () => {
    if (contentRef.current) {
      contentRef.current.scrollLeft += 300;
    }
  };

  return (
    <div className="relative">
      <div className="text-center py-4  text-xl font-bold">
        Here Are Some Projects Currently Being Worked On! Sign Up Now To Join The
        Effort Of Bringing New Applications To Life!
      </div>
      <div
        ref={contentRef}
        id="content"
        className="carousel p-4 flex items-center justify-start overflow-x-auto scroll-smooth  scrollbar-hide"
      >
        {projects.slice(0, 10).map((project) => (
          <div key={project.id}>
            <Card project={project} />
          </div>
        ))}
      </div>
      <div className="static">
        <button
          onClick={scrollLeft}
          className={`mx-3 m-2 bg-white ${showLeftArrow ? "" : "hidden"}`}
        >
          <FiChevronLeft size={40} />
        </button>
        <button
          onClick={scrollRight}
          className={`mx-3 m-2 bg-white ${showRightArrow ? "" : "hidden"}`}
        >
          <FiChevronRight size={40} />
        </button>
      </div>
    </div>
  );
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function Projectcards() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const projectsUrl = `${process.env.REACT_APP_API_HOST}/api/projects`

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(projectsUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await response.json();
        setProjects(shuffleArray(data)); // shuffle the projects array before setting it to state
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError("Project information could not be populated");
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []); // eslint-disable-line

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <Carousel projects={projects} />;
}

export default Projectcards;
export { Card, Carousel };
