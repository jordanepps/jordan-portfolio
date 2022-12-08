import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { AppWrap, MotionWrap } from '../../wrapper';
import { client, urlFor } from '../../client';
import './Skills.scss';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [experiences, setExp] = useState([]);

  useEffect(() => {
    const skillsQuery = '*[_type == "skills"]';
    const expQuery = '*[_type == "experiences"]';

    client.fetch(skillsQuery).then((data) => setSkills(data));
    client.fetch(expQuery).then((data) => setExp(data));
  }, []);

  return (
    <>
      <h2 className="head-text">
        Skills <span>&</span> Experience
      </h2>
      <div className="app__skills-container">
        <motion.div className="app__skills-list">
          {skills?.map((skill) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
              key={skill.name}
            >
              <div
                className="app__flex"
                style={{ backgroundColor: skill.bgColor }}
              >
                <img src={urlFor(skill.icon)} alt={skill.name} />
              </div>
              <p className="p-text">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div className="app__skills-experience">
          {experiences?.map((experience) => (
            <motion.div className="app__skills-exp-item" key={experience.year}>
              <div className="app__skills-exp-year">
                <p className="bold-text">{experience.year}</p>
              </div>
              <motion.div className="app__skills-exp-works">
                {experience.works.map((work, i) => (
                  <React.Fragment key={work.name + i}>
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className="app__skills-exp-work"
                      data-tooltip-content={work.desc}
                      id={(work.name + i).replace(/ /g, '')}
                    >
                      <h4 className="bold.text">{work.name}</h4>
                      <p className="p-text">{work.company}</p>
                    </motion.div>
                    {/*
                     //TODO: Fix issue where tooltip causes page to scroll past end  
                     */}
                    {/* <Tooltip
                      anchorId={(work.name + i).replace(/ /g, '')}
                      className="skills-tooltip"
                    /> */}
                  </React.Fragment>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Skills, 'app__skills'),
  'skills',
  'app__whitebg'
);
