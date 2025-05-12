import React, { useState } from "react";
import { Link, useI18next, useTranslation } from 'gatsby-plugin-react-i18next'
import { useSidebar } from "../context/SidebarContext";
import { groupDocsBySubfolder, formatFolderName } from "../utils/folderUtils";


const SidebarTree = ({ nodes, basePath = "/docs" }) => {
  const { t } = useTranslation()
  const { language } = useI18next()
  //console.log(`language`, language)

  const { openFolders, toggleFolder } = useSidebar();
 

  //const docsByLanguage = nodes.filter(doc => doc.fields.locale === language);
  //console.log("docsByLanguage \n", JSON.stringify(docsByLanguage, null, 2));
  const tree = groupDocsBySubfolder(nodes);   
  //console.log("tree \n", JSON.stringify(tree, null, 2));
  

  // Separate top-level and foldered docs
  const topLevelDocs = Object.entries(tree).filter(([_, v]) => !v.children);
  const folderGroups = Object.entries(tree)
  .filter(([_, v]) => v.children)
  .sort(([a], [b]) => parseInt(a) - parseInt(b));
  // console.log("\n tree \n", JSON.stringify(tree, null, 2));
  // console.log("\n topLevelDocs \n", JSON.stringify(topLevelDocs, null, 2));
  // console.log("\n folderGroups \n", JSON.stringify(folderGroups, null, 2));


  return (
    <ul className="sidebar__list">
      {/* Top-level docs first */}
      {topLevelDocs.map(([_, doc]) => (
        <li key={doc.slug}>
          <Link to={`${basePath}/${doc.slug}`} className="sidebar__link">
            {doc.title}
          </Link>
        </li>
      ))}

      {/* Then folder groups with toggle */}
      {folderGroups.map(([folder, group]) => {
        const isOpen = openFolders[folder];
        return (
          <li key={folder}>
            <button
              onClick={() => toggleFolder(folder)}
              className="sidebar__folder-toggle"
            >
              {isOpen ? "▼" : "►"} {formatFolderName(folder)}
            </button>
            {isOpen && (
              <ul className="sidebar__list">
                {group.children.map(child => (
                  <li key={child.slug}>
                    <Link to={`${basePath}/${folder}/${child.slug}`} className="sidebar__link">
                      {child.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarTree;
