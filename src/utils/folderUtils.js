function groupDocsBySubfolder(nodes) {
  const tree = {};

  nodes.forEach(node => {
    const { slug, title } = node.frontmatter;
    const subfolder = node.fields.subfolder;

    if (!subfolder) {
      tree[slug] = { title, slug };
    } else {
      if (!tree[subfolder]) {
        tree[subfolder] = { children: [] };
      }
      tree[subfolder].children.push({ title, slug });
    }
  });

  return tree;
}


function formatFolderName(name) {
  return name.replace(/-/g, " - ");
}

function getSlugFromPath(filePath, basePath) {
  const parts = filePath.split("/docs/")[1].split("/");
  const slugParts = parts.map(p => p.replace(/^\d+-/, "").replace(/\.mdx$/, ""));
  return `${basePath}/${slugParts.join("/")}`;
}


module.exports = {
  groupDocsBySubfolder,
  formatFolderName,
  getSlugFromPath
};
